const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "minecraft",
 aliases: ["minecraft-info", "mcserv"],
 description: "Display minecraft server info",
 category: "Utility",
 usage: "minecraft <server ip>",
 run: async (client, message, args) => {
  try {
   if (!args[0]) {
    return client.createError(message, `${client.bot_emojis.error} | Please enter a minecraft server IP!`);
   }
   fetch(`https://api.minetools.eu/ping/${args[0].replace(":", '/')}`)
    .then((res) => res.json())
    .then((body) => {
     if (body.error) {
      return client.createError(message, `${client.bot_emojis.error} | Minecraft server not found!`);
     }
     const embed = new MessageEmbed() // Prettier
      .setAuthor(args[0].replace(":", '/'), `https://api.minetools.eu/favicon/${args[0].replace(":", '/')}`)
      .setThumbnail(`https://api.minetools.eu/favicon/${args[0].replace(":", '/')}`)
      .setColor("#4f545c")
      .setFooter(
      `Requested by ${message.author.username}`,
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     );
     if(body.description) embed.setDescription(body.description.replace(/§[0-9A-FK-OR]/ig,'').replaceAll("`", ""))
     if(body.players.max && body.players.online) embed.addField(`${client.bot_emojis.member} Players`, `> \`${body.players.online}/${body.players.max}\``, true)
     if(body.latency) embed.addField(`${client.bot_emojis.status_online} Latency`, `> \`${body.latency}\``, true)
     if(body.version.name) embed.addField(`${client.bot_emojis.stage_channel} Version(s)`, `> \`${body.version.name}\``, true)

     embed.setTimestamp();
     message.reply({ embeds: [embed]});
    });
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
