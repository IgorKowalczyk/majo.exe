import { Client, PresenceStatus } from "discord.js";

export class BotStatus {
    client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    setBanner(status: string) {
        this.client.user.setPresence({
            game: {
                name: status
            }
        });
    }

    setActivity(activity: PresenceStatus) {
        this.client.user.setStatus(activity)
    }
    
}
