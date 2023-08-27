import prismaClient from "@majoexe/database";
import { ApplicationCommandType, EmbedBuilder, codeBlock } from "discord.js";

export default {
 name: "ping",
 description: "🏓 Check the Majo.exe ping",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 usage: "/ping",
 dm_permission: true,
 run: async (client, interaction, guildSettings) => {
  try {
   const dbTime = performance.now();
   await prismaClient.user.findUnique({ where: { id: "1" } });
   const dbTiming = performance.now() - dbTime;

   const websocketPing = client.ws.ping;

   const waitEmbed = new EmbedBuilder().setColor(guildSettings?.embedColor || client.config.defaultColor).setDescription("🏓 Pong!...");
   const date = performance.now();
   const message = await interaction.followUp({ embeds: [waitEmbed] });
   const clientPing = performance.now() - date;

   const pingMessage = new EmbedBuilder()
    .addFields([
     {
      name: "Host Latency",
      value: codeBlock(`${Math.floor(websocketPing)}ms`),
      inline: true,
     },
     {
      name: "Client Latency",
      value: codeBlock(`${Math.floor(clientPing)}ms`),
      inline: true,
     },
     {
      name: "Database Latency",
      value: codeBlock(`${Math.floor(dbTiming)}ms`),
      inline: true,
     },
    ])
    .setFooter({
     text: `Requested by ${interaction.member.user.username}`,
     iconURL: interaction.member.user.displayAvatarURL({
      size: 256,
     }),
    })
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setTimestamp()
    .setTitle("🏓 Pong!");
   await message.edit({ ephemeral: false, embeds: [pingMessage] });
  } catch (err) {
   client.errorMessages.internalError(interaction, err);
  }
 },
};
