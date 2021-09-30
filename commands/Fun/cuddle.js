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
     const embed = new MessageEmbed() // Prettier
      .setColor("RED")
      .setDescription(`${client.bot_emojis.error} | You must mention user to cuddle!\n\n**Usage:** \`${client.prefix} cuddle <user>\``);
     return message.reply({ embeds: [embed] });
    }
    if (user == message.author) {
     const embed = new MessageEmbed() // Prettier
      .setColor("RED")
      .setDescription(`${client.bot_emojis.grin} | You can't cuddle yourself ;-;`);
     return message.reply({ embeds: [embed] });
    }
    if (user == client.user) {
     const embed = new MessageEmbed() // Prettier
      .setColor("RED")
      .setDescription(`${client.bot_emojis.grin} | Oh, you tried to hug me but u can't... Im not real...`);
     return message.reply({ embeds: [embed] });
    }
    const response = await fetch("https://nekos.life/api/v2/img/cuddle");
    const body = await response.json();
    const embed = new MessageEmbed() // Prettier
     .setTitle(user.username + " Just got a cuddle from " + message.author.username)
     .setImage(body.url)
     .setColor("RANDOM")
     .setFooter(
      `Requested by ${message.author.username}`,
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
    message.reply({ embeds: [client.command_error_embed] });
   }
  })();
 },
};
