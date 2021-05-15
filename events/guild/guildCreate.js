const Discord = require('discord.js');
const config = require("../../config");

module.exports = async (client, guild) => {
 try {
  console.log(`New guild joined: ${guild.name} (ID: ${guild.id}). This guild has ${guild.memberCount} members!`);
 } catch(err) {
  console.log(err);
 }
}
