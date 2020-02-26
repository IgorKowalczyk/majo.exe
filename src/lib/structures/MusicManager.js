const { util: { codeBlock } } = require('klasa');
const ytdl = require('ytdl-core');
const ytdlDiscord = require('ytdl-core-discord');
const getInfoAsync = require('util').promisify(ytdl.getInfo);

class MusicManager {

	constructor(guild) {
		Object.defineProperty(this, 'client', { value: guild.client });

		Object.defineProperty(this, 'guild', { value: guild });
		this.recentlyPlayed = [];
		this.queue = [];

		this.channel = null;


		this.autoplay = false;

		this._next = null;
	}

	get remaining() {
		const { playing, dispatcher } = this;
		if (!playing) return null;
		const [song] = this.queue;
		return (song.seconds * 1000) - dispatcher.streamTime;
	}

	get next() {
		return this._next ? `https://youtu.be/${this._next}` : null;
	}

	get voiceChannel() {
		return this.guild.me.voice.channel;
	}

	get connection() {
		const { voiceChannel } = this;
		return (voiceChannel && voiceChannel.connection) || null;
	}

	get dispatcher() {
		const { connection } = this;
		return (connection && connection.dispatcher) || null;
	}

	get playing() {
		return !this.paused && !this.idling;
	}

	get paused() {
		const { dispatcher } = this;
		return dispatcher ? dispatcher.paused : null;
	}


	get idling() {
		return !this.queue.length || !this.dispatcher;
	}


	async add(user, url) {
		const song = await getInfoAsync(url).catch((err) => {
			this.client.emit('log', err, 'error');
			throw `Something happened with YouTube URL: ${url}\n${codeBlock('', err)}`;
		});

		const metadata = {
			url: song.video_id,
			title: song.title.replace(/@(here|everyone)/, '@\u200B$1'),
			requester: user,
			loudness: song.loudness,
			seconds: parseInt(song.length_seconds),
			opus: song.formats.some(format => format.type === 'audio/webm; codecs="opus"')
		};

		this.queue.push(metadata);
		this._next = this.getLink(song.related_videos);

		return metadata;
	}


	getLink(playlist) {
		for (const song of playlist) {
			if (!song.id || this.recentlyPlayed.includes(song.id)) continue;
			return song.id;
		}
		return null;
	}


	join(voiceChannel) {
		return voiceChannel.join().catch((err) => {
			if (String(err).includes('ECONNRESET')) throw 'There was an issue connecting to the voice channel, please try again.';
			this.client.emit('error', err);
			throw err;
		});
	}

	async leave() {
		if (!this.voiceChannel) throw 'I already left the voice channel! You might want me to be in one in order to leave it...';
		await this.voiceChannel.leave();
		if (this.voiceChannel) this.forceDisconnect();

		// Reset the status
		return this.clear();
	}

	async play() {
		if (!this.voiceChannel) throw 'Where am I supposed to play the music? I am not in a voice channel!';
		if (!this.connection) {
			await this.channel.send(`This dj table isn't connected! Let me unplug and plug it again`)
				.catch(error => this.client.emit('error', error));

			const { voiceChannel } = this;
			this.forceDisconnect();
			await this.join(voiceChannel);
			if (!this.connection) throw 'This dj table is broken! Try again later...';
		}
		if (!this.queue.length) throw 'No songs left in the queue!';

		const [song] = this.queue;

		const stream = await ytdlDiscord(`https://youtu.be/${song.url}`);

		this.connection.play(stream, {
			bitrate: this.voiceChannel.bitrate / 1000,
			passes: 5,
			type: song.opus ? 'opus' : 'unknown',
			volume: false
		});

		this.pushPlayed(song.url);

		return this.dispatcher;
	}

	pushPlayed(url) {
		this.recentlyPlayed.push(url);
		if (this.recentlyPlayed.length > 10) this.recentlyPlayed.shift();
	}

	pause() {
		const { dispatcher } = this;
		if (dispatcher) dispatcher.pause();
		return this;
	}

	resume() {
		const { dispatcher } = this;
		if (dispatcher) dispatcher.resume();
		return this;
	}

	skip(force = false) {
		const { dispatcher } = this;
		if (force && dispatcher) dispatcher.end();
		else this.queue.shift();
		return this;
	}

	prune() {
		this.queue.length = 0;
		return this;
	}

	clear() {
		this.recentlyPlayed.length = 0;
		this.queue.length = 0;
		this.channel = null;
		this.autoplay = false;
		this._next = null;

		return this;
	}

	forceDisconnect() {
		const { connection } = this;
		if (connection) {
			connection.disconnect();
		} else {
			/* eslint-disable camelcase */
			this.guild.shard.send({
				op: 4,
				shard: this.client.shard ? this.client.shard.id : 0,
				d: {
					guild_id: this.guild.id,
					channel_id: null,
					self_mute: false,
					self_deaf: false
				}
			});
		}
	}

}

module.exports = MusicManager;
