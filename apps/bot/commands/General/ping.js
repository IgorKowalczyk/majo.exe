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
   const thisServerShard = client.ws.shards.get(interaction.guild.shardId);

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
    ])
    .setFooter({
     text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({
      size: 256,
     }),
    });
   await message.edit({ ephemeral: false, embeds: [pingMessage] });
  } catch (err) {
   client.errorMessages.internalError(interaction, err);
  }
 },
};
