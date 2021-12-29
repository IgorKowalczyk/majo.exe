const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "tickle",
 aliases: [],
 description: "Tickle a user",
 category: "Fun",
 usage: "tickle <user>",
 run: async (client, message, args) => {
  try {
   const member = (await await message.mentions.members.first()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.guild.members.cache.find((r) => r.displayName.toLowerCase().includes() === args.join(" ").toLocaleLowerCase());
   if (!member) {
    return client.createError(message, `${client.bot_emojis.error} | Mention someone to tickle!\n\n**Usage:** \`${client.prefix} tickle <user>\``);
   }
   if (message.author === member || message.member == member) {
    return client.createError(message, `${client.bot_emojis.error} | You cant tickle yourself!`);
   }
   (async () => {
    const response = await fetch("https://nekos.life/api/v2/img/tickle");
    const body = await response.json();
    const embed = new MessageEmbed() // Prettier
     .setColor("RANDOM")
     .setTitle(`${member.user.username} just got tickled by ${message.author.username}`)
     .setFooter({
      text: `Requested by ${message.author.username} • ._.`,
      iconURL: message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     })
     .setImage(body.url);
    message.reply({ embeds: [embed] });
   })();
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
