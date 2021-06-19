const Discord = require("discord.js");
const fetch = require("node-fetch");
const { nsfw } = require("../../utilities/nsfw")

module.exports = {
 name: "hentai",
 aliases: ["hentai-gif"],
 description: "Display a random hentai gif",
 category: "NSFW",
 usage: "hentai",
 run: async (client, message, args) => {
  (async () => {
   try {
    if (nsfw(message)) return;
    const response = await fetch("https://nekos.life/api/v2/img/Random_hentai_gif");
    const body = await response.json();
    const embed = new Discord.MessageEmbed() // Prettier()
     .setTitle(
      ":smirk: Hentai!",
      message.guild.iconURL({
       dynamic: true,
       format: "png",
      })
     )
     .setImage(body.url)
     .setColor("RANDOM")
     .setFooter(
      "Requested by " + `${message.author.username}`,
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     )
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
