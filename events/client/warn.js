const Discord = require("discord.js");
const moment = require("moment");
const timestamp = `[${moment().format("DD-MM-YY H:m:s")}]:`;

module.exports = (client, info) => {
 console.log(`${timestamp} Warning: ${info}`)
}