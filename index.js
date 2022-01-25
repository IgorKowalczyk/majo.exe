if (Number(process.version.slice(1).split(".")[0]) < 16) throw new Error("Majo.exe requires Node.js v16 or higher. Re-run the bot with Node.js v16 or higher!");
const Discord = require("discord.js");
const client = new Discord.Client({
 allowedMentions: {
  parse: ["users", "roles"],
  repliedUser: false,
 },
 //ws: {
 //  properties: { $browser: "Discord iOS" }, // To change the bot online icon to phone
 // },
 presence: {
  status: "online",
  afk: false,
 },
 // Uncomment line below (and delete line after ofc) if you enabled all indents!
 //intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_VOICE_STATES, Discord.Intents.FLAGS.GUILD_PRESENCES, Discord.Intents.FLAGS.GUILD_MEMBERS],
 intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_VOICE_STATES],
});
require("./utilities/checks")
require("./utilities/database-scripts");
require("./utilities/client-utilities")(client);
require("./utilities/giveaways")(client);
require("events").EventEmitter.prototype._maxListeners = 100;
require("events").defaultMaxListeners = 100;
require("dotenv").config();

if (process.env.TOKEN) {
 ["command", "event"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
 });
 client.login(process.env.TOKEN);
} else {
 throw new Error("Bot token is not provided! To give your bot life, you need to enter token value in the .env file - TOKEN=Your_Bot_Token");
}
