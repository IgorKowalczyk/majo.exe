
import { ParsedMessage } from 'discord-command-parser';
import { Message } from 'discord.js';
import * as ytdl from 'ytdl-core';
import { secondsToTimestamp } from '../bot';
import { IBot, IBotPlugin, MediaItem } from '../resources';

const youtubeType: string = 'youtube';

export default class YoutubePlugin implements IBotPlugin {

    preInitialize(bot: IBot): void {
        bot.helptext += '\n`youtube [url/idfragment]` - Add youtube audio to the queue\n'
        const player = bot.player;

        bot.commands.on(youtubeType, (cmd: ParsedMessage, msg: Message) => {
            if(cmd.arguments.length > 0) {
                cmd.arguments.forEach(arg => {
                    player.addMedia({ type: youtubeType, url: arg, requestor: msg.author.username });
                });
            }
        });

        player.typeRegistry.set(
            youtubeType,
            {
                getDetails: (item: MediaItem) => new Promise((done, error) => {
                    item.url = item.url.includes('://') ? item.url : `https://www.youtube.com/watch?v=${item.url}`;
                    let result = ytdl.getInfo(item.url, (err, info) => {
                        if(info) {
                            item.name = info.title ? info.title : 'Unknown';
                            item.duration = secondsToTimestamp(parseInt(info.length_seconds) || 0);
                            done(item);
                        } else
                            error(err);
                    });
                }),
                getStream: (item: MediaItem) => new Promise((done, error) => {
                    let stream = ytdl(item.url, { filter: 'audioonly' });
                    if(stream)
                        done(stream);
                    else
                        error('Unable to get media stream');
                })
            }
        );
    }

    postInitialize(bot: IBot): void {
        
    }

}
