import prismaClient from "@majoexe/database";
import { ApplicationCommandType, EmbedBuilder, codeBlock, Status } from "discord.js";

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

   const waitEmbed = new EmbedBuilder().setColor(guildSettings?.embedColor || client.config.defaultColor).setDescription("🏓 Pong!...");
   const message = await interaction.followUp({ embeds: [waitEmbed] });

   const pingMessage = new EmbedBuilder()
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
     {
      name: "Websocket Status",
      value: codeBlock("yaml", `${Status[client.ws.status]}`),
      inline: true,
     },
     {
      name: "Shards",
      value: codeBlock("yaml", `${client.ws.shards.size}`),
      inline: true,
     },
     {
      name: "💡 Did you know about this?",
      value: ">>> **The stats above are due to our wonderful hosting - [TrestHost](https://dash.tresthost.me/register?ref=majonez.exe)**. Register now and try their __VPS, Node.js, Go, Java and Python hosting!__",
     },
    ])
    // .setImage("https://repository-images.githubusercontent.com/678773099/96116fa6-00e7-456d-a05d-d72feeb217a3")
    .setFooter({
     text: `Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
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
