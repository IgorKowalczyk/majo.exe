const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "hug",
 aliases: [],
 description: "Give a hug to mentioned user",
 category: "Fun",
 usage: "hug <user>",
 run: async (client, message, args) => {
  (async () => {
   try {
    const user = message.mentions.users.first();
    if (!user) {
     return client.createError(message, `${client.bot_emojis.error} | You must mention someone to hug!\n\n**Usage:** \`${client.prefix} hug <user>\``);
    }
    if (user == message.author) {
     return client.createError(message, `${client.bot_emojis.grin} | You can't hug yourself but... Ok, get the hug from me ＼( ^o^ )／ !`);
    }
    if (user == client.user) {
     return client.createError(message, `${client.bot_emojis.grin} | Oh, you tried to hug me but u can't... Im not real... But I can hug you ＼( ^o^ )／`);
    }
    const response = await fetch("https://nekos.life/api/v2/img/cuddle");
    const body = await response.json();
    const embed = new MessageEmbed() // Prettier
     .setTitle(
      user.username + " Just got a hug from " + message.author.username,
      message.guild.iconURL({
       dynamic: true,
       format: "png",
      })
     )
     .setImage(body.url)
     .setURL(body.url)
     .setColor("RANDOM")
     .setDescription(user.toString() + " got a hug from " + message.author.toString())
     .setFooter(
      "Requested by " + `${message.author.username}` + " • (this is so cute ＼( ^o^ )／)",
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     )
     .setTimestamp()
     .setURL(body.url);
    message.reply({ embeds: [embed] });
   } catch (err) {
    console.log(err);
    return client.createCommandError(message, err);
   }
  })();
 },
};
