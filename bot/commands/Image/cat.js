const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "cat",
 aliases: [],
 description: "Sends a random cat photo",
 category: "Image",
 usage: "cat",
 run: async (client, message, args) => {
  (async () => {
   try {
    const response = await fetch("https://nekos.life/api/v2/img/meow");
    const body = await response.json();
    const embed = new MessageEmbed() // Prettier
     .setTitle(
      `${client.bot_emojis.cat} Random Cat`,
      message.guild.iconURL({
       dynamic: true,
       format: "png",
      })
     )
     .setImage(body.url)
     .setColor("RANDOM")
     .setFooter({
      text: "Requested by " + `${message.author.username}` + " • (Aww cute =＾´• ⋏ •`＾=)",
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
