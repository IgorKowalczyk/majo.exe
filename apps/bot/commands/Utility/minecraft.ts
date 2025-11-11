import { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, ApplicationIntegrationType, InteractionContextType } from "discord.js";
import fetch from "node-fetch";
import type { SlashCommand } from "@/util/types/Command";

interface MinecraftServer {
  ip: string;
  port: number;
  debug: boolean;
  error: boolean;
  description: string;
  latency: number;
  version: {
    name: string;
    protocol: number;
  };
  motd: {
    raw: string[];
    clean: string[];
  };
  players: {
    online: number;
    max: number;
    list: string[];
  };
  online: boolean;
}

export default {
  name: "minecraft",
  description: "🌳 Display minecraft server info",
  type: ApplicationCommandType.ChatInput,
  cooldown: 5000,
  contexts: [InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel],
  integrationTypes: [ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall],
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
      if (!serverIp) return client.errorMessages.createSlashError(interaction, "❌ Please provide a valid server IP.");

      const bedrock = interaction.options.getBoolean("bedrock") || false;

      // Sanitize and format server IP
      const sanitizedIp = serverIp.includes(":") ? serverIp : `${serverIp}:25565`;

      const apiUrl = bedrock ? `https://api.mcsrvstat.us/bedrock/2/${serverIp}` : `https://api.mcsrvstat.us/2/${sanitizedIp}`;

      const request = await fetch(apiUrl);

      if (!request.ok) {
        console.error(`API Request Failed: ${apiUrl}`);
        return client.errorMessages.createSlashError(interaction, "❌ We couldn't get the server info, please try again later");
      }

      const json = (await request.json()) as MinecraftServer;

      if (json.error || (!json.ip && !json.online)) {
        console.error(`API Response Error for ${serverIp}:`, json);
        return client.errorMessages.createSlashError(interaction, "❌ We couldn't get the server info, please ensure the IP/domain is correct");
      }

      const embed = new EmbedBuilder()
        .setColor(guildSettings?.embedColor || client.config.defaultColor)
        .setTimestamp()
        .setAuthor({
          name: `${serverIp} (${bedrock ? "Bedrock" : "Java"})`,
          iconURL: `https://api.mcsrvstat.us/icon/${serverIp.replace(":", "/")}`,
        })
        .setThumbnail(`https://api.mcsrvstat.us/icon/${serverIp.replace(":", "/")}`)
        .setFooter({
          text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
          iconURL: interaction.user.displayAvatarURL({
            size: 256,
          }),
        });

      const fields = [];

      if (json.online) {
        fields.push({
          name: `${client.config.emojis.status_online} Status`,
          value: "> \`Online\`",
          inline: true,
        });
      } else {
        fields.push({
          name: `${client.config.emojis.status_dnd} Status`,
          value: "> \`Offline\`",
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

      if (json.latency) {
        fields.push({
          name: `${client.config.emojis.status_online} Latency`,
          value: `> \`${json.latency}ms\``,
          inline: true,
        });
      }

      if (json.version && json.version.name) {
        fields.push({
          name: `${client.config.emojis.stage_channel} Version`,
          value: `> \`${json.version.name}\``,
          inline: true,
        });
      }

      if (json.motd && json.motd.raw[0]) {
        embed.setDescription(">>> " + json.motd.raw[0].replace(/§[0-9A-FK-OR]/gi, "").replaceAll("`", ""));
      }

      if (fields.length < 1) {
        fields.push({
          name: "No Info",
          value: "> Unable to fetch details",
          inline: true,
        });
      } else {
        embed.addFields(fields);
      }

      return interaction.followUp({ embeds: [embed] });
    } catch (err) {
      console.error("Error fetching server info:", err);
      client.errorMessages.internalError(interaction, err);
    }
  },
} satisfies SlashCommand;
