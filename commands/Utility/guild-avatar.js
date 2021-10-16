const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
 name: "guild-avatar",
 aliases: ["g-avatar", "guild-icon", "icon-guild", "guild-image", "guild-img", "guild-pfp"],
 description: "Get current guild avatar",
 category: "Utility",
 usage: "guild-avatar",
 run: async (client, message, args) => {
  try {
   const gavatar = message.guild.iconURL({
    dynamic: true,
    format: "png",
    size: 4096,
   });
   const row = new MessageActionRow() // Prettier
    .addComponents(
     // Prettier
     new MessageButton() // Prettier
      .setLabel("Icon Link")
      .setStyle("LINK")
      .setURL(gavatar)
    );
   const embed = new MessageEmbed() // Prettier
    .setColor("RANDOM")
    .setAuthor(`${message.guild.name} Icon`, gavatar)
    .setImage(gavatar)
    .setDescription(`> ${client.bot_emojis.link} [Icon link](${gavatar})`)
    .setTimestamp()
    .setFooter(
     `Requested by ${message.author.username}`,
     message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    );
   message.reply({ embeds: [embed], components: [row] });
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
