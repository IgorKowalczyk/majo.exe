import type { APIApplicationCommandOption } from "discord-api-types/v10";

export type ExtendedApplicationCommandOptionData = APIApplicationCommandOption & { usage?: string };

export interface Command {
 name: string;
 description: string;
 options: ExtendedApplicationCommandOptionData[];
 categoryName: string;
}
