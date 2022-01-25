const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "cuddle",
 aliases: [],
 description: "Give a cuddle to mentioned user",
 category: "Fun",
 usage: "cuddle <user>",
 run: async (client, message, args) => {
  (async () => {
   try {
    const user = message.mentions.users.first();
    if (!user) {
     return client.createError(message, `${client.bot_emojis.error} | You must mention user to cuddle!\n\n**Usage:** \`${client.prefix} cuddle <user>\``);
    }
    if (user == message.author) {
     return client.createError(message, `${client.bot_emojis.grin} | You can't cuddle yourself ;-;`);
    }
    if (user == client.user) {
     return client.createError(message, `${client.bot_emojis.grin} | Oh, you tried to hug me but u can't... Im not real...`);
    }
    const response = await fetch("https://nekos.life/api/v2/img/cuddle");
    const body = await response.json();
    const embed = new MessageEmbed() // Prettier
     .setTitle(`${user.username} has just been cuddled by ${message.author.username}`)
     .setDescription(`> ${user} got a hug from ${message.author}${Math.floor(Math.random() * 100 + 1) == 1 ? "\n||I want someone I can hug...||" : ""}`)
     .setImage(body.url)
     .setColor("RANDOM")
     .setFooter({
      text: `Requested by ${message.author.username}`,
      iconURL: message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     })
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
