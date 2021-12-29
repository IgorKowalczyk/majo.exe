const { MessageEmbed } = require("discord.js");

module.exports = {
 name: "noping",
 aliases: ["no-ping", "no_ping"],
 description: "Please don't ping other users",
 category: "Utility",
 usage: "noping",
 run: async (client, message, args) => {
  try {
   const embed = new MessageEmbed()
    .setImage("https://media.discordapp.net/attachments/710425657003212810/884840312734904370/noping.gif")
    .setTitle(`${client.bot_emojis.anger} Please don't ping other users!`)
    .setFooter({
     text: `Requested by ${message.author.username}`,
     iconURL: message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    })
    .setColor("RANDOM")
    .setTimestamp();
   message.reply({ embeds: [embed] });
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
