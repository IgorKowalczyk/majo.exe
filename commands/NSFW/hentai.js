const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "hentai",
 aliases: ["hentai-gif"],
 description: "Display a random hentai gif",
 category: "NSFW",
 usage: "hentai",
 run: async (client, message, args) => {
  if (!message.channel.nsfw) {
   return message.channel.send({
    embed: {
     color: 16734039,
     description: "💢 | You can use this command only in an NSFW Channel!",
    },
   });
  }
  (async () => {
   try {
    const response = await fetch("https://nekos.life/api/v2/img/Random_hentai_gif");
    const body = await response.json();
    const embed = new Discord.MessageEmbed()
     .setTitle(":smirk: Hentai!", message.guild.iconURL({ dynamic: true, format: "png" }))
     .setImage(body.url)
     .setColor("RANDOM")
     .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }))
     .setTimestamp()
     .setURL(body.url);
    message.channel.send(embed);
   } catch (err) {
    message.channel.send({
     embed: {
      color: 16734039,
      description: "Something went wrong... :cry:",
     },
    });
   }
  })();
 },
};
