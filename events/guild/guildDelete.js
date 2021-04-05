const Discord = require('discord.js');
const config = require("../../config");

module.exports = async (client, guild) => {
 try {
  console.log(`I have been removed from: ${guild.name} (ID: ${guild.id})`);
 } catch(err) {
  console.log(err);
 }
}
