const Discord = require('discord.js');

module.exports = async (client, guild) => {
try {
 console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
} catch(err) {
 console.log(err);
}
}
