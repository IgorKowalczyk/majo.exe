const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "minecraft",
 description: "🌳 Display minecraft server info",
 category: "Utility",
 usage: "/minecraft <server ip> [bedrock]",
 container: true,
 options: [
  {
   name: "server_ip",
   description: "The IP of the server to get info about",
   required: true,
   type: 3,
  },
  {
   name: "bedrock",
   description: "Display bedrock info",
   required: false,
   type: 5,
  },
 ],
 run: async (client, interaction, args) => {
  try {
   if (!args[0]) {
    return client.createSlashError(interaction, `${client.bot_emojis.error} | Please enter a minecraft server IP!`);
   }
   if (!/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}(:?[0-9]*)$/gim.test(args[0])) {
    return client.createSlashError(interaction, `${client.bot_emojis.error} | Please enter a vaild minecraft server IP!`);
   }
   if (args[1]) {
    fetch(`https://api.mcsrvstat.us/bedrock/2/${args[0]}`)
     .then((res) => res.json())
     .then((body) => {
      if (body.ip == "127.0.0.1" || !body.ip) {
       return client.createSlashError(interaction, `${client.bot_emojis.error} | Minecraft bedrock server not found!`);
      }
      const embed = new MessageEmbed() // Prettier
       .setAuthor({ name: `${args[0]} (Bedrock)`, iconURL: `https://api.mcsrvstat.us/icon/${args[0]}` })
       .setThumbnail(`https://api.mcsrvstat.us/icon/${args[0]}`)
       .setFooter({
        text: `Requested by ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL({
         dynamic: true,
         format: "png",
         size: 2048,
        }),
       })
       .setColor("#5865F2");
      if (body.online.toString().length > 1) embed.addField(`${body.online ? client.bot_emojis.status_online : client.bot_emojis.status_dnd} ${body.online ? "Online" : "Offline"}`, `> \`${body.online ? "Online" : "Offline"}\``, true);
      if (body.motd && body.motd.raw[0]) embed.setDescription(">>> " + body.motd.raw[0].replace(/§[0-9A-FK-OR]/gi, "").replaceAll("`", ""));
      if (body.players && body.players.max && body.players.online) embed.addField(`${client.bot_emojis.member} Players`, `> \`${body.players.online}/${body.players.max}\``, true);
      if (body.version) embed.addField(`${client.bot_emojis.stage_channel} Version(s)`, `> \`${body.version}\``, true);
      interaction.followUp({ embeds: [embed] });
     });
   } else {
    fetch(`https://api.minetools.eu/ping/${args[0].replace(":", "/")}`)
     .then((res) => res.json())
     .then((body) => {
      if (body.error) {
       return client.createSlashError(interaction, `${client.bot_emojis.error} | Minecraft server not found!\n\n**Tip:** If you want to check Bedrock server please use \`/minecraft <server ip> [bedrock=true]\``);
      }
      const embed = new MessageEmbed() // Prettier
       .setAuthor({ name: args[0], iconURL: `https://api.mcsrvstat.us/icon/${args[0].replace(":", "/")}` })
       .setThumbnail(`https://api.mcsrvstat.us/icon/${args[0].replace(":", "/")}`)
       .setColor("#5865F2")
       .setFooter({
        text: `Requested by ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL({
         dynamic: true,
         format: "png",
         size: 2048,
        }),
       });
      if (body.description) embed.setDescription(`>>> ${body.description && body.description.length > 1 ? body.description.replace(/§[0-9A-FK-OR]/gi, "").replaceAll("`", "") : "No description"}`);
      if (body.players && body.players.max && body.players.online) embed.addField(`${client.bot_emojis.member} Players`, `> \`${body.players.online}/${body.players.max}\``, true);
      if (body.latency) embed.addField(`${client.bot_emojis.status_online} Latency`, `> \`${body.latency}\``, true);
      if (body.version && body.version.name) embed.addField(`${client.bot_emojis.stage_channel} Version(s)`, `> \`${body.version.name}\``, true);
      embed.setTimestamp();
      interaction.followUp({ embeds: [embed] });
     });
   }
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
