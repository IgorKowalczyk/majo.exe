import { OAuth2Scopes } from "discord-api-types/v10";

export const globalConfig = {
 // Todo: Calculate permissions using discord-api-types
 permissions: "1539679190263", // string. Discord permissions. You can use https://discordapi.com/permissions.html to generate it
 scopes: [OAuth2Scopes.ApplicationsCommands, OAuth2Scopes.Bot].join("%20"), // string. Discord OAUTH2 scopes.
 defaultColor: "#5865F2", // string. Default color for embeds, social images etc
 apiVersion: 10, // number. Discord API version
};
