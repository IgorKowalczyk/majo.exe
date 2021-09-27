const { MessageEmbed } = require("discord.js");

module.exports = {
 name: "iq",
 aliases: [],
 description: "Display a user IQ",
 category: "Fun",
 usage: "iq",
 run: async (client, message, args) => {
  try {
   const user = (await message.mentions.members.first()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.guild.members.cache.find((r) => r.displayName.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.member;
   const iq = Math.floor(Math.random() * 226);
   const embed = new MessageEmbed() // Prettier
    .setTitle(`${client.bot_emojis.brain} IQ Test:`)
    .setDescription(`${client.bot_emojis.light_bulb} ${user.user.username} IQ: \`${iq}\``)
    .setColor("RANDOM")
    .setTimestamp()
    .setFooter(
     `Requested by ${message.author.username}`,
     message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    );
   message.reply({ embeds: [embed] });
  } catch (err) {
   console.log(err);
   message.reply({ embeds: [client.command_error_embed] });
  }
 },
};
