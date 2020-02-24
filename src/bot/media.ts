
import { VoiceConnection, StreamDispatcher, TextChannel, DMChannel, GroupDMChannel } from 'discord.js';
import { Readable } from 'stream';
import { BotConfig } from './config';
import { BotStatus } from './bot-status';
import { logger } from './logger';

export interface MediaItem {
    type: string;
    url: string;
    requestor?: string;
    name?: string;
    duration?: string;
}

export interface IMediaType {
    getDetails(item: MediaItem): Promise<MediaItem>;
    getStream(item: MediaItem): Promise<Readable>;
}

export class MediaQueue extends Array<MediaItem> {

    get first(): MediaItem {
        return this[0];
    }

    get last(): MediaItem {
        return this[this.length - 1];
    }

    enqueue(item: MediaItem): void {
        this.push(item);
    }

    dequeue(item?: MediaItem): MediaItem {
        if(item) {
            let idx = this.indexOf(item);
            if(idx > -1)
                this.splice(idx, 1);
            return item;
        } else
            return this.shift();
    }

    clear() {
        this.length = 0;
    }

    shuffle() {
        let currentIndex = this.length, 
            temporaryValue, 
            randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = this[currentIndex];
            this[currentIndex] = this[randomIndex];
            this[randomIndex] = temporaryValue;
        }
    }

    move(key1, key2) {
        if(key1 != key2) {
            this.splice(key2, 0, this.splice(key1, 1)[0]);
        }
    }

}

export class MediaPlayer {
    typeRegistry: Map<string, IMediaType> = new Map<string, IMediaType>();
    queue: MediaQueue = new MediaQueue();
    playing: boolean = false;
    paused: boolean = false;
    stopping: boolean = false;
    config: BotConfig;
    status: BotStatus;
    channel: TextChannel | DMChannel | GroupDMChannel;
    connection?: VoiceConnection;
    dispatcher?: StreamDispatcher;

    constructor(config: BotConfig, status: BotStatus) {
        this.config = config;
        this.status = status;
    }

    addMedia(item: MediaItem): Promise<void> {
        return new Promise((done, error) => {
            let type = this.typeRegistry.get(item.type);
            if(type) {
                this.queue.enqueue(item);
                type.getDetails(item)
                    .then((media) => {
                        item.name = media.name;
                        item.duration = media.duration;
                        this.determineStatus();
                        done(item);
                    })
                    .catch(err => error(err));
            } else
                error('Unknown Media Type!');
        })
        .then((item: MediaItem) => {
            if(this.channel && item)
                this.channel.send(`:heavy_plus_sign: ${item.type} track added: "${item.name}" @ #${this.queue.indexOf(item) + 1}`);
        })
        .catch(err => {
            if(this.channel)
                this.channel.send(`Error adding track: ${err}`);
        });
    }

    at(idx: number) {
        return this.queue[idx];
    }

    remove(item: MediaItem) {
        if(item == this.queue.first && (this.playing || this.paused))
            this.stop();
        this.queue.dequeue(item);
        this.determineStatus();
        if(this.channel)
            this.channel.send(`:heavy_minus_sign: ${item.type} track removed: "${item.name}"`);
    }

    clear() {
        if(this.playing || this.paused)
            this.stop();
        this.queue.clear();
        this.determineStatus();
        if(this.channel)
            this.channel.send(`:cd: Playlist Cleared`);
    }

    dispatchStream(stream: Readable, item: MediaItem) {
        if(this.dispatcher) {
            this.dispatcher.end();
            this.dispatcher = null;
        }
        this.dispatcher = this.connection.playStream(stream, {
            seek: this.config.stream.seek,
            volume: this.config.stream.volume,
            passes: this.config.stream.passes,
            bitrate: this.config.stream.bitrate
        });
        this.dispatcher.on('start', () => {
            this.playing = true;
            this.determineStatus();
            if(this.channel)
                this.channel.send(`:musical_note: Now playing: "${item.name}", Requested by: ${item.requestor}`);
        });
        this.dispatcher.on('debug', (info: string) => {
            console.log(info);
            logger.debug(info);
        });
        this.dispatcher.on('error', err => {
            this.skip();
            console.log(err);
            logger.error(err);
            if(this.channel)
                this.channel.send(`Error Playing Song: ${err}`);
        });
        this.dispatcher.on('end', (reason: string) => {
            console.log(`Stream Ended: ${reason}`);
            logger.debug(`Stream Ended: ${reason}`);
            if(this.playing) {
                this.playing = false;
                this.dispatcher = null;
                this.determineStatus();
                if(!this.stopping) {
                    let track = this.queue.dequeue();
                    if(this.config.queue.repeat)
                        this.queue.enqueue(track);
                        this.play();
                }
            }
            this.stopping = false;
        });
    }

    play() {
        if(this.queue.length == 0 && this.channel)
            this.channel.send(`Queue is empty! Add some songs!`);
        if(this.playing && !this.paused)
            this.channel.send(`Already playing a song!`);
        let item = this.queue.first;
        if(item && this.connection) {
            let type = this.typeRegistry.get(item.type);
            if(type) {
                if(!this.playing) {
                    type.getStream(item)
                        .then(stream => {
                            this.dispatchStream(stream, item);
                        });
                } else if(this.paused && this.dispatcher) {
                    this.dispatcher.resume();
                    this.paused = false;
                    this.determineStatus();
                    if(this.channel)
                        this.channel.send(`:play_pause: "${this.queue.first.name}" resumed`);
                }
            }
        }
    }

    stop() {
        if(this.playing && this.dispatcher) {
            let item = this.queue.first;
            this.stopping = true;
            this.paused = false;
            this.dispatcher.end();
            this.determineStatus();
            if(this.channel)
                this.channel.send(`:stop_button: "${item.name}" stopped`);
        }
    }

    skip() {
        if(this.playing && this.dispatcher) {
            let item = this.queue.first;
            this.paused = false;
            this.dispatcher.end();
            if(this.channel)
                this.channel.send(`:fast_forward: "${item.name}" skipped`);
        } else if(this.queue.length > 0) {
            let item = this.queue.first;
            this.queue.dequeue();
            if(this.channel)
                this.channel.send(`:fast_forward: "${item.name}" skipped`);
        }
        this.determineStatus();
    }

    pause() {
        if(this.playing && !this.paused && this.dispatcher) {
            this.dispatcher.pause();
            this.paused = true;
            this.determineStatus();
            if(this.channel)
                this.channel.send(`:pause_button: "${this.queue.first.name}" paused`);
        }
    }

    shuffle() {
        if(this.playing || this.paused)
            this.stop();
        this.queue.shuffle();
        this.determineStatus();
        if(this.channel)
            this.channel.send(`:arrows_counterclockwise: Queue Shuffled`);
    }

    move(currentIdx: number, targetIdx: number) {
        let max = this.queue.length - 1;
        let min = 0;
        currentIdx = Math.min(Math.max(currentIdx, min), max);
        targetIdx = Math.min(Math.max(targetIdx, min), max);

        if(currentIdx != targetIdx) {
            this.queue.move(currentIdx, targetIdx);
            this.determineStatus();
        }
    }

    setVolume(volume: number) {
        volume = Math.min(Math.max((volume / 100) + 0.5, 0.5), 2);
        this.config.stream.volume = volume;
        if(this.dispatcher) {
            this.dispatcher.setVolume(volume);
        }
    }

    getVolume() {
        return ((this.config.stream.volume - 0.5) * 100) + '%';
    }

    determineStatus() {
        let item = this.queue.first;
        if(item) {
            if(this.playing) {
                if(this.paused) {
                    this.status.setBanner(`Paused: "${item.name}" Requested by: ${item.requestor}`);
                } else {
                    this.status.setBanner(`Now Playing: "${item.name}" Requested by: ${item.requestor}${this.queue.length > 1 ? `, Up Next "${this.queue[1].name}"`:''}`);
                }
            } else
                this.status.setBanner(`Up Next: "${item.name}" Requested by: ${item.requestor}`);
        } else
            this.status.setBanner(`No Songs In Queue`);
    }

}
