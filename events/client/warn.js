const Discord = require("discord.js");
const client = new Discord.Client({disableEveryone: true,});
const timestamp = `[${moment().format("DD-MM-YY H:m:s")}]:`;

module.exports = (client, info) => {
 console.log(`${timestamp} Warning: ${info}`)
}