const Discord = require("discord.js");

module.exports = async (client, oldState, newState) => {
 if (!newState.guild.me.hasPermission("DEAFEN_MEMBERS")) return;
 if (!newState.channel) return;
 if (newState.id == client.user.id) {
  newState.setDeaf(true);
 }
};
