import { BotStatus } from './bot-status';
import { BotConfig } from "./config";
import { Client } from "discord.js";
import { CommandMap } from "./command-map";
import { ConsoleReader } from "./console-reader";
import { MediaPlayer } from "./media";

export interface IBot {
    config: BotConfig;
    client: Client;
    status: BotStatus;
    commands: CommandMap;
    console: ConsoleReader;
    player: MediaPlayer;
    online: boolean;
    helptext: string;
    plugins: IBotPlugin[];
}

export interface IBotPlugin {
    preInitialize(bot: IBot): void;
    postInitialize(bot: IBot): void;
}
