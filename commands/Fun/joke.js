const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "joke",
 aliases: ["dad-joke", "dadjoke"],
 description: "Display a random dad joke",
 category: "Fun",
 usage: "joke",
 run: async (client, message, args) => {
  (async () => {
   try {
    const response = await fetch("http://icanhazdadjoke.com/", {
     method: "get",
     headers: {
      Accept: "application/json",
     },
    });
    const body = await response.json();
    const embed = new MessageEmbed() // Prettier
     .setTitle("Random Dad joke", message.guild.iconURL())
     .setDescription("Dad said: " + body.joke)
     .setColor("RANDOM")
     .setFooter(
      `Requested by ${message.author.username}`,
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     )
     .setTimestamp();
    message.reply({ embeds: [embed]});
   } catch (err) {
    console.log(err);
    message.reply({ embeds: [client.command_error_embed] });
   }
  })();
 },
};
