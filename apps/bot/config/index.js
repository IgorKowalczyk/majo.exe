import { ActivityType, PresenceUpdateStatus, OAuth2Scopes } from "discord.js";
import dotenv from "dotenv";
import { emojis } from "./emojis.js";
dotenv.config({ path: "../../.env" });

export const config = {
 /*
  Dashboard location: /apps/dashboard
  */
 dashboard: {
  enabled: true, // boolean. Is bot using dashboard
  link: process.env.NEXT_PUBLIC_URL, // string. Dashboard main url
 },

 bot: {
  permissions: "1539679190263", // string. Bot permissions. You can use https://discordapi.com/permissions.html to generate it
  scopes: [OAuth2Scopes.ApplicationsCommands, OAuth2Scopes.Bot].join("%20"), // string. Bot scopes.
  maxInputLength: 250, // number. Max input length for commands
  defaultEmbedColor: "#5865F2", // string. Default embed color
  presence: {
   status: PresenceUpdateStatus.Online, // string. Bot status. Can be: Online, Idle, DND, Invisible
   activities: [
    {
     name: "/help",
     type: ActivityType.Watching, // string. Activity type. Can be: PLAYING, STREAMING, LISTENING, WATCHING,
    },
   ],
  },
 },

 /*
  Donation links
 */
 donate: {
  enabled: true, // boolean. Display donations command
  links: [
   {
    name: "Patreon",
    url: "https://www.patreon.com/igorkowalczyk",
    icon: emojis.patreon_logo,
   },
   {
    name: "Ko-Fi",
    url: "https://ko-fi.com/igorkowalczyk",
    icon: emojis.kofi_logo,
   },
   {
    name: "Buy Me a Coffee",
    url: "https://buymeacoffee.com/majonezexe",
    icon: emojis.buymeacoffee_logo,
   },
   {
    name: "Open Collective",
    url: "https://opencollective.com/igorkowalczyk",
    icon: emojis.open_collective_logo,
   },
  ],
 },

 /*
  Debugger configuration. Set everything to true if you want console hell
 */
 debugger: {
  displayEventList: false, // boolean. Display event list on startup
  displayCommandList: false, // boolean. Display command list on startup
  displayCommandUsage: false, // boolean. Display command usage on command run
  displayModalList: false, // boolean. Display modal list on startup
  displayModalUsage: false, // boolean. Display modal usage on modal run
 },
};
