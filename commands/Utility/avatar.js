const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
 name: "avatar",
 aliases: ["user-avatar"],
 description: "Get user avatar",
 category: "Utility",
 usage: "avatar [user mention, user id, user name]",
 run: async (client, message, args) => {
  try {
   const User = (await message.mentions.members.first()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.guild.members.cache.find((r) => r.displayName.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.member;
   const uavatar = User.user.displayAvatarURL({
    dynamic: true,
    format: "png",
    size: 4096,
   });
   const row = new MessageActionRow() // Prettier
    .addComponents(
     // Prettier
     new MessageButton() // Prettier
      .setLabel("Avatar Link")
      .setStyle("LINK")
      .setURL(uavatar)
    );
   const embed = new MessageEmbed() // Prettier
    .setColor("RANDOM")
    .setAuthor({ name: `${User.user.username} Avatar`, iconURL: uavatar })
    .setImage(uavatar)
    .setDescription(`> ${client.bot_emojis.link} [Avatar link](${uavatar})`)
    .setTimestamp()
    .setFooter({
     text: `Requested by ${message.author.username}`,
     iconURL: message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    });
   message.reply({ embeds: [embed], components: [row] });
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
