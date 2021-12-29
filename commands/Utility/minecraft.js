const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "minecraft",
 aliases: ["minecraft-info", "mcserv"],
 description: "Display minecraft server info",
 category: "Utility",
 usage: "minecraft <server ip> [--bedrock]",
 run: async (client, message, args) => {
  try {
   if (!args[0]) {
    return client.createError(message, `${client.bot_emojis.error} | Please enter a minecraft server IP!\n\n**Usage:** \`${client.prefix} minecraft <server ip> [--bedrock]\``);
   }
   if (!/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}(:?[0-9]*)$/gim.test(args[0])) {
    return client.createError(message, `${client.bot_emojis.error} | Please enter a vaild minecraft server IP!\n\n**Usage:** \`${client.prefix} minecraft <server ip> [--bedrock]\``);
   }
   if (args[1] == "--bedrock" || args[1] == "bedrock") {
    fetch(`https://api.mcsrvstat.us/bedrock/2/${args[0]}`)
     .then((res) => res.json())
     .then((body) => {
      if (body.ip == "127.0.0.1" || !body.ip) {
       return client.createError(message, `${client.bot_emojis.error} | Minecraft bedrock server not found!\n\n**Usage:** \`${client.prefix} minecraft <server ip> [--bedrock]\``);
      }
      const embed = new MessageEmbed() // Prettier
       .setAuthor({ name: `${args[0]} (Bedrock)`, iconURL: `https://api.mcsrvstat.us/icon/${args[0]}` })
       .setThumbnail(`https://api.mcsrvstat.us/icon/${args[0]}`)
       .setFooter({
        text: `Requested by ${message.author.username}`,
        iconURL: message.author.displayAvatarURL({
         dynamic: true,
         format: "png",
         size: 2048,
        }),
       })
       .setColor("#4f545c");
      if (body.online.toString().length > 1) embed.addField(`${body.online ? client.bot_emojis.status_online : client.bot_emojis.status_dnd} ${body.online ? "Online" : "Offline"}`, `> \`${body.online ? "Online" : "Offline"}\``, true);
      if (body.motd && body.motd.raw[0]) embed.setDescription(">>> " + body.motd.raw[0].replace(/§[0-9A-FK-OR]/gi, "").replaceAll("`", ""));
      if (body.players && body.players.max && body.players.online) embed.addField(`${client.bot_emojis.member} Players`, `> \`${body.players.online}/${body.players.max}\``, true);
      if (body.version) embed.addField(`${client.bot_emojis.stage_channel} Version(s)`, `> \`${body.version}\``, true);
      message.reply({ embeds: [embed] });
     });
   } else {
    fetch(`https://api.minetools.eu/ping/${args[0].replace(":", "/")}`)
     .then((res) => res.json())
     .then((body) => {
      if (body.error) {
       return client.createError(message, `${client.bot_emojis.error} | Minecraft server not found!\n\n**Tip:** If you want to check Bedrock server please use \`${client.prefix} minecraft <server ip> bedrock\``);
      }
      const embed = new MessageEmbed() // Prettier
       .setAuthor({ name: args[0], iconURL: `https://api.mcsrvstat.us/icon/${args[0].replace(":", "/")}` })
       .setThumbnail(`https://api.mcsrvstat.us/icon/${args[0].replace(":", "/")}`)
       .setColor("#4f545c")
       .setFooter({
        text: `Requested by ${message.author.username}`,
        iconURL: message.author.displayAvatarURL({
         dynamic: true,
         format: "png",
         size: 2048,
        }),
       });
      if (body.description) embed.setDescription(">>> " + body.description.replace(/§[0-9A-FK-OR]/gi, "").replaceAll("`", ""));
      if (body.players && body.players.max && body.players.online) embed.addField(`${client.bot_emojis.member} Players`, `> \`${body.players.online}/${body.players.max}\``, true);
      if (body.latency) embed.addField(`${client.bot_emojis.status_online} Latency`, `> \`${body.latency}\``, true);
      if (body.version && body.version.name) embed.addField(`${client.bot_emojis.stage_channel} Version(s)`, `> \`${body.version.name}\``, true);
      embed.setTimestamp();
      message.reply({ embeds: [embed] });
     });
   }
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
