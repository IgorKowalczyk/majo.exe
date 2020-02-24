import { MediaItem, IBot, IBotPlugin, readDir, readJson, writeJson, deleteFile, fileExists } from '../resources';
import { ParsedMessage } from 'discord-command-parser';
import { Message } from 'discord.js';

const playlistDir = './playlists';

interface IPlaylist {
    list?: Array<MediaItem>;
}

export default class PlaylistPlugin implements IBotPlugin {

    preInitialize(bot: IBot): void {

        bot.commands.on('playlist', (cmd: ParsedMessage, msg: Message) => {
            switch(cmd.arguments[0]) {
                case 'load': this.load(cmd, msg, bot); break;
                case 'save': this.save(cmd, msg, bot); break;
                case 'delete': this.delete(cmd, msg, bot); break;
                default: this.list(cmd, msg, bot); break;   
            }
        });

    }

    postInitialize(bot: IBot): void {
        
    }

    list(cmd: ParsedMessage, msg: Message, bot: IBot) {
        let files = readDir(playlistDir)
            .filter(file => file.includes('.json'))
            .map((file, i) => `${i + 1}. ${file.replace('.json', '')}`);

        msg.channel.send(`Playlists: \n\n${files.length == 0 ? 'No Playlists' : files.join('\n')}`);
    }

    load(cmd: ParsedMessage, msg: Message, bot: IBot) {
        let name = cmd.arguments[1];
        if(name) {
            let queue: IPlaylist = readJson(playlistDir, `${name}.json`) || { list: [] };
            if(queue.list) {
                if(cmd.arguments[2] == 'append') {
                    bot.player.queue.push(...queue.list);
                } else {
                    bot.player.clear();
                    bot.player.queue.push(...queue.list);
                }
                bot.player.determineStatus();
                msg.channel.send(`Loaded Playlist "${name}"`);
            }
        }
    }

    save(cmd: ParsedMessage, msg: Message, bot: IBot) {
        let name = cmd.arguments[1];
        if(name) {
            let queue: IPlaylist = { list: bot.player.queue.map(x => x) };
            if(queue.list.length > 0) {
                writeJson(queue, playlistDir, `${name}.json`);
            }
            msg.channel.send(`Saved Playlist "${name}"`);
        }
    }

    delete(cmd: ParsedMessage, msg: Message, bot: IBot) {
        let name = cmd.arguments[1];
        if(name && fileExists(playlistDir, `${name}.json`)) {
            deleteFile(playlistDir, `${name}.json`);
            msg.channel.send(`Deleted Playlist "${name}"`);
        }
    }

}
