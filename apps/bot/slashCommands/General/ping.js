import clientPromise from "@majoexe/util/src/database/database.js";
import { createErrorEmbed } from "@majoexe/util/src/functions/createErrorEmbed.js";
import { ApplicationCommandType, EmbedBuilder, codeBlock } from "discord.js";

export default {
 name: "ping",
 description: "🏓 Check the Majo.exe ping",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 usage: "/ping",
 run: async (client, interaction) => {
  try {
   const dbTime = performance.now();
   const database = await clientPromise;
   const db = await database.db();
   await db.command({ ping: 1 });
   const dbTiming = performance.now() - dbTime;
   const websocketPing = Math.floor(client.ws?.ping);
   const wait = new EmbedBuilder().setColor("#5865f2").setDescription("🏓 Pong!...");
   const date = performance.now();
   interaction.reply({ embeds: [wait] }).then(async (msg) => {
    const clientPing = performance.now() - date;
    const pingMessage = new EmbedBuilder()
     .addFields([
      {
       name: "Client Latency",
       value: codeBlock(`${Math.floor(clientPing)}ms`),
       inline: true,
      },
      {
       name: "Host Latency",
       value: codeBlock(`${websocketPing}ms`),
       inline: true,
      },
      {
       name: "Database Latency",
       value: codeBlock(`${Math.floor(dbTiming)}ms`),
       inline: true,
      },
     ])
     .setFooter({
      text: `Requested by ${interaction.member?.user?.username}`,
      iconURL: interaction.member?.user?.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     })
     .setColor("#5865F2")
     .setTimestamp()
     .setTitle("🏓 Pong!");
    msg.edit({ ephemeral: false, embeds: [pingMessage] });
   });
  } catch (err) {
   console.log(err);
   const errorEmbed = createErrorEmbed(err);
   return interaction?.reply({ embeds: [errorEmbed] });
  }
 },
};
