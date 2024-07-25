
import { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } from "discord.js";
import fetch from "node-fetch";

export default {
 name: "minecraft",
 description: "🌳 Display minecraft server info",
 type: ApplicationCommandType.ChatInput,
 cooldown: 5000,
 dm_permission: false,
 usage: "/minecraft <server ip> [bedrock]",
 options: [
  {
   name: "server_ip",
   description: "The IP of the server to get info about",
   required: true,
   type: ApplicationCommandOptionType.String,
  },
  {
   name: "bedrock",
   description: "Display bedrock info",
   required: false,
   type: ApplicationCommandOptionType.Boolean,
  },
 ],
 run: async (client, interaction, guildSettings) => {
  try {
   const serverIp = interaction.options.getString("server_ip");
   const bedrock = interaction.options.getBoolean("bedrock") || false;

   if (!/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}(:?[0-9]*)$/gim.test(serverIp)) {
    return client.errorMessages.createSlashError(interaction, "❌ The server IP you provided is invalid");
   }

   if (bedrock) {
    const request = await fetch(`https://api.mcsrvstat.us/bedrock/2/${serverIp}`);
    if (!request.ok) {
     return client.errorMessages.createSlashError(interaction, "❌ We couldn't get the server info, please try again later");
    }

    const json = await request.json();

    if (json.ip == "127.0.0.1" || !json.ip) {
     return client.errorMessages.createSlashError(interaction, "❌ We couldn't get the server info, please try again later");
    }

    const embed = new EmbedBuilder()
     .setColor(guildSettings?.embedColor || client.config.defaultColor)
     .setTimestamp()
     .setAuthor({ name: `${serverIp} (Bedrock)`, iconURL: `https://api.mcsrvstat.us/icon/${serverIp}` })
     .setThumbnail(`https://api.mcsrvstat.us/icon/${serverIp}`)
     .setFooter({
      text: `Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
      iconURL: interaction.member.user.displayAvatarURL({
       size: 256,
      }),
     });
    const fields = [];
    if (json.online.toString().length > 1) {
     fields.push({
      name: `${json.online ? client.config.emojis.status_online : client.config.emojis.status_dnd} ${json.online ? "Online" : "Offline"}`,
      value: `> \`${json.online ? "Online" : "Offline"}\``,
      inline: true,
     });
    }
    if (json.players && json.players.max && json.players.online) {
     fields.push({
      name: `${client.config.emojis.member} Players`,
      value: `> \`${json.players.online}/${json.players.max}\``,
      inline: true,
     });
    }
    if (json.version) {
     fields.push({
      name: `${client.config.emojis.stage_channel} Version(s)`,
      value: `> \`${json.version}\``,
      inline: true,
     });
    }
    if (json.motd && json.motd.raw[0]) {
     embed.setDescription(">>> " + json.motd.raw[0].replace(/§[0-9A-FK-OR]/gi, "").replaceAll("`", ""));
    }

    if (fields.length < 1) {
     fields.push({
      name: "No info",
      value: "> No info",
      inline: true,
     });
    } else {
     embed.addFields(fields);
    }

    return interaction.followUp({ embeds: [embed] });
   } else {
    const request = await fetch(`https://api.mcsrvstat.us/2/${serverIp}`);
    if (!request.ok) {
     return client.errorMessages.createSlashError(interaction, "❌ We couldn't get the server info, please try again later");
    }

    const json = await request.json();

    if (json.error) {
     return client.errorMessages.createSlashError(interaction, "❌ We couldn't get the server info, please try again later");
    }

    const embed = new EmbedBuilder()
     .setColor(guildSettings?.embedColor || client.config.defaultColor)
     .setTimestamp()
     .setAuthor({ name: `${serverIp} (Java)`, iconURL: `https://api.mcsrvstat.us/icon/${serverIp.replace(":", "/")}` })
     .setThumbnail(`https://api.mcsrvstat.us/icon/${serverIp.replace(":", "/")}`)
     .setFooter({
      text: `Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
      iconURL: interaction.member.user.displayAvatarURL({
       size: 256,
      }),
     });

    const fields = [];
    if (json.description) {
     embed.setDescription(`>>> ${json.description && json.description.length > 1 ? json.description.replace(/§[0-9A-FK-OR]/gi, "").replaceAll("`", "") : "No description"}`);
    }

    if (json.players && json.players.max && json.players.online) {
     fields.push({
      name: `${client.config.emojis.member} Players`,
      value: `> \`${json.players.online}/${json.players.max}\``,
      inline: true,
     });
    }

    if (json.latency) {
     fields.push({
      name: `${client.config.emojis.status_online} Latency`,
      value: `> \`${json.latency}\``,
      inline: true,
     });
    }

    if (json.version && json.version.name) {
     fields.push({
      name: `${client.config.emojis.stage_channel} Version(s)`,
      value: `> \`${json.version.name}\``,
      inline: true,
     });
    }

    if (fields.length < 1) {
     fields.push({
      name: "No info",
      value: "> No info",
      inline: true,
     });
    } else {
     embed.addFields(fields);
    }

    return interaction.followUp({ embeds: [embed] });
   }
  } catch (err) {
   client.errorMessages.internalError(interaction, err);
  }
 },
};
