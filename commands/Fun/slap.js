const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "slap",
 aliases: [],
 description: "Slap a user",
 category: "Fun",
 usage: "slap <user>",
 run: async (client, message, args) => {
  try {
   const member = (await await message.mentions.members.first()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.guild.members.cache.find((r) => r.displayName.toLowerCase().includes() === args.join(" ").toLocaleLowerCase());
   if (!member) {
    return client.createError(message, `${client.bot_emojis.error} | Mention someone to slap!\n\n**Usage:** \`${process.env.PREFIX} slap <user>\``);
   }
   if (message.author === member || message.member == member) {
    return client.createError(message, `${client.bot_emojis.drooling_face} | You cant slap yourself!`);
   }
   (async () => {
    const response = await fetch("https://nekos.life/api/v2/img/slap");
    const body = await response.json();
    const embed = await new MessageEmbed() // Prettier
     .setColor("RANDOM")
     .setTitle(`${member.user.username} just got slapped by ${message.author.username}`)
     .setFooter(
      `Requested by ${message.author.username} • That must hurt ._.`,
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     )
     .setImage(body.url);
    message.reply({ embeds: [embed] });
   })();
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
