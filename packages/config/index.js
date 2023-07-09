import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

export const config = {
 global: {
  permissions: "1539679190263", // string. Discord permissions. You can use https://discordapi.com/permissions.html to generate it
  scopes: ["applications.commands", "bot"].join("%20"), // string. Discord OAUTH2 scopes.
  defaultColor: "#5865F2", // string. Default color for embeds, social images etc
 },

 /*
  Dashboard location: /apps/dashboard
 */
 dashboard: {
  enabled: true, // boolean. Is bot using dashboard
  link: process.env.NEXT_PUBLIC_URL, // string. Dashboard main url
 },

 /*
  Bot location: /apps/bot
 */
 bot: {
  maxInputLength: 250, // number. Max input length for commands
  presence: {
   status: "online", // string. Bot status. Can be: online, dnd, idle, invisible, offline
   activities: [
    {
     name: "/help",
     type: 3, // string. Activity type. Can be: PLAYING = 0, STREAMING = 1, LISTENING = 2, WATCHING = 3,
    },
   ],
  },
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
