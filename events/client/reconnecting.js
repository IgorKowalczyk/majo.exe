const Discord = require("discord.js");
const client = new Discord.Client({disableEveryone: true,});
const timestamp = `[${moment().format("DD-MM-YY H:m:s")}]:`;

module.exports = (client) => {
 console.log(`${timestamp} Client is reconnecting...`)
}