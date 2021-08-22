const Discord = require("discord.js");

module.exports = {
 name: "id",
 aliases: ["get-id"],
 description: "Display a mentioned user ID (Yes, you can copy this directly from Discord too)",
 category: "Moderation",
 usage: "id <mention>",
 run: async (client, message, args) => {
  try {
   const mention = (await message.mentions.members.first()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.guild.members.cache.find((r) => r.displayName.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.member;
   if (!mention) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | You must mention a user!`,
     },
    });
   }
   const userid = new Discord.MessageEmbed() // Prettier
    .setThumbnail(mention.user.avatarURL())
    .setColor("RANDOM")
    .setTitle(`${mention.user.username} ID`)
    .setDescription(`\`\`\`${mention.id}\`\`\``)
    .setFooter(
     `Requested by ${message.author.username}`,
     message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    );
   message.lineReply(userid);
  } catch (err) {
   message.lineReply({
    embed: {
     color: 16734039,
     description: `Something went wrong... ${client.bot_emojis.sadness}`,
    },
   });
  }
 },
};
