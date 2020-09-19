const Discord = require("discord.js");
const client = new Discord.Client({disableEveryone: true,});
const fs = require("fs");
const http = require("http");
const db = require("quick.db");
const discord_token = process.env.TOKEN;
const prefix = process.env.PREFIX;
const newUsers = new Discord.Collection();
var botMembers = 0;

/* Login */
if (discord_token) {
 client.commands = new Discord.Collection();
 client.aliases = new Discord.Collection();
 const cooldowns = new Discord.Collection();
 ['command', 'event'].forEach(handler => {
   require(`./handlers/${handler}`)(client);
 });
 client.login(discord_token);
} else {
 console.error("Majo.exe Error: Bot token is not provided!! To give your bot life, you need to enter token value in the `.env` file - `TOKEN=Your_Token`. [Token is super-secret - do not share it with anyone!]");
}
/* /Login */

// ---------
//    END (of index.js)
// ---------
