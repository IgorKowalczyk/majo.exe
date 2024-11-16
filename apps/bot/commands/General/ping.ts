import type { SlashCommand } from "@/util/types/Command";
import prismaClient from "@majoexe/database";
import { ApplicationCommandType, EmbedBuilder, codeBlock, Status, ApplicationIntegrationType, InteractionContextType } from "discord.js";

export default {
 name: "ping",
 description: "🏓 Check the Majo.exe ping",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 usage: "/ping",
 contexts: [InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel],
 integrationTypes: [ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall],
 run: async (client, interaction, guildSettings) => {
  try {
   const dbTime = performance.now();
   await prismaClient.user.findUnique({ where: { id: "1" } });
   const dbTiming = performance.now() - dbTime;

   const waitEmbed = new EmbedBuilder() // prettier
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setDescription("🏓 Pong!...");
   const message = await interaction.followUp({ embeds: [waitEmbed] });

   const pingMessage = new EmbedBuilder()
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setTimestamp()
    .setTitle("🏓 Pong!")
    .addFields([
     {
      name: "Host Latency",
      value: codeBlock("yaml", client.ws.ping > 0 ? `${Math.floor(client.ws.ping)}ms` : "Calculating..."),
      inline: true,
     },
     {
      name: "Client Latency",
      value: codeBlock("yaml", `${Math.floor(message.createdTimestamp - interaction.createdTimestamp)}ms`),
      inline: true,
     },
     {
      name: "Database Latency",
      value: codeBlock("yaml", `${Math.floor(dbTiming)}ms`),
      inline: true,
     },
    ])
    .setFooter({
     text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({
      size: 256,
     }),
    });

   if (interaction.guild) {
    const thisServerShard = client.ws.shards.get(interaction.guild.shardId);
    if (!thisServerShard) return interaction.editReply({ embeds: [pingMessage] });

    pingMessage.addFields([
     {
      name: "Websocket",
      value: codeBlock("yaml", `${Status[thisServerShard.status]}`),
      inline: true,
     },
     {
      name: "Shard",
      value: codeBlock("yaml", `${thisServerShard.id}/${client.ws.shards.size} (${thisServerShard.ping > 0 ? `${Math.floor(thisServerShard.ping)}ms` : "Calculating..."})`),
      inline: true,
     },
    ]);
   }

   await interaction.editReply({ embeds: [pingMessage] });
  } catch (err) {
   client.errorMessages.internalError(interaction, err);
  }
 },
} satisfies SlashCommand;
