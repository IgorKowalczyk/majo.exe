const { MessageEmbed } = require("discord.js");

module.exports = {
 name: "id",
 aliases: ["get-id"],
 description: "Display a mentioned user ID (Yes, you can copy this directly from Discord too)",
 category: "Moderation",
 usage: "id [mention]",
 run: async (client, message, args) => {
  try {
   const mention = (await message.mentions.members.first()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.guild.members.cache.find((r) => r.displayName.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.member;
   const embed = new MessageEmbed() // Prettier
    .setThumbnail(mention.user.avatarURL())
    .setColor("RANDOM")
    .setTitle(`${mention.user.username} ID`)
    .setDescription(`>>> \`\`\`${mention.id}\`\`\``)
    .setFooter({
     text: `Requested by ${message.author.username}`,
     iconURL: message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    });
   message.reply({ embeds: [embed] });
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
