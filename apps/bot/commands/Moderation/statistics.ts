import prismaClient, { type GuildJoin, type GuildLeave, type GuildMessage } from "@majoexe/database";
import { fillMissingDates } from "@majoexe/util/functions/util";
import * as Plot from "@observablehq/plot";
import { ApplicationCommandType, ApplicationCommandOptionType, PermissionFlagsBits, AttachmentBuilder, EmbedBuilder, ChatInputCommandInteraction } from "discord.js";
import jsdom from "jsdom";
import sharp from "sharp";
import type { Majobot } from "../..";
import type { GuildSettings } from "../../util/types/Command";
const { JSDOM } = jsdom;

async function generateChart(data: GuildJoin[] | GuildLeave[] | GuildMessage[], name: string, color: string) {
 const chartData = fillMissingDates(data, name);
 const { document } = new JSDOM("").window;

 const chart = Plot.plot({
  document,
  marginBottom: 60,
  marginTop: 40,
  width: 934,

  marks: [
   // prettier
   Plot.gridY({
    stroke: "white",
    strokeOpacity: 0.2, // opaque
   }),
   Plot.axisY({
    color,
    fontWeight: "bold",
    fontFamily: "Quicksand",
    fontSize: 18,
    label: name.charAt(0).toUpperCase() + name.slice(1),
    tickFormat: (number) => (number % 1 === 0 ? number : ""),
   }),
   Plot.axisX({
    color,
    fontWeight: "bold",
    fontSize: 18,
    fontFamily: "Quicksand",
   }),
   Plot.lineX(chartData, {
    x: "date",
    y: name,
    strokeWidth: 2,
    curve: "monotone-x",
    stroke: color,
    //color,
   }),
  ],
 });

 document.body.appendChild(chart);

 const buffer = await sharp(Buffer.from(document.body.innerHTML)).png().toBuffer();
 const attachment = new AttachmentBuilder(buffer, {
  name: "chart.png",
 });

 return attachment;
}

export default {
 name: "statistics",
 description: "📊 Show statistics about your server",
 type: ApplicationCommandType.ChatInput,
 cooldown: 6000,
 dm_permission: false,
 usage: "/statistics <subcommand>",
 options: [
  {
   name: "invite",
   description: "Check the amount of members that joined the server in the last 30 days",
   type: ApplicationCommandOptionType.Subcommand,
  },
  {
   name: "leave",
   description: "Check the amount of members that left the server in the last 30 days",
   type: ApplicationCommandOptionType.Subcommand,
  },
  {
   name: "messages",
   description: "Check the amount of messages sent in the server in the last 30 days",
   type: ApplicationCommandOptionType.Subcommand,
  },
 ],
 defaultMemberPermissions: [PermissionFlagsBits.Administrator, PermissionFlagsBits.ManageGuild],
 run: async (client: Majobot, interaction: ChatInputCommandInteraction, guildSettings: GuildSettings) => {
  try {
   if (!interaction.guild) return client.errorMessages.createSlashError(interaction, "❌ This command can only be used in a server.");
   if (!interaction.member) return client.errorMessages.createSlashError(interaction, "❌ You must be in a server to use this command.");

   const command = interaction.options.getSubcommand();

   if (command === "invite") {
    const rawData = await prismaClient.guildJoin.findMany({
     where: {
      guildId: interaction.guild.id,
      date: {
       gte: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
      },
     },
     select: {
      id: true,
      guildId: true,
      date: true,
      joins: true,
     },
    });

    const attachment = await generateChart(rawData, "joins", guildSettings?.embedColor || client.config.defaultColor);

    const embed = new EmbedBuilder()
     .setTitle("📊 Join statistics")
     .setDescription("Amount of members that joined the server in the last 30 days")
     .setColor(guildSettings?.embedColor || client.config.defaultColor)
     .setTimestamp()
     .setFooter({
      text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
      iconURL: interaction.user.displayAvatarURL({
       size: 256,
      }),
     })
     .setImage("attachment://chart.png");

    return interaction.followUp({ ephemeral: false, embeds: [embed], files: [attachment] });
   } else if (command === "leave") {
    const rawData = await prismaClient.guildLeave.findMany({
     where: {
      guildId: interaction.guild.id,
      date: {
       gte: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
      },
     },
     select: {
      id: true,
      guildId: true,
      date: true,
      leaves: true,
     },
    });

    const attachment = await generateChart(rawData, "leaves", guildSettings?.embedColor || client.config.defaultColor);

    const embed = new EmbedBuilder()
     .setTitle("📊 Leave statistics")
     .setDescription("Amount of members that left the server in the last 30 days")
     .setColor(guildSettings?.embedColor || client.config.defaultColor)
     .setTimestamp()
     .setFooter({
      text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
      iconURL: interaction.user.displayAvatarURL({
       size: 256,
      }),
     })
     .setImage("attachment://chart.png");

    return interaction.followUp({ ephemeral: false, embeds: [embed], files: [attachment] });
   } else if (command === "messages") {
    const rawData = await prismaClient.guildMessage.findMany({
     where: {
      guildId: interaction.guild.id,
      date: {
       gte: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
      },
     },
     select: {
      id: true,
      guildId: true,
      date: true,
      messages: true,
     },
    });

    const attachment = await generateChart(rawData, "messages", guildSettings?.embedColor || client.config.defaultColor);

    const embed = new EmbedBuilder()
     .setTitle("📊 Messages statistics")
     .setDescription("Amount of messages sent in the server in the last 30 days")
     .setColor(guildSettings?.embedColor || client.config.defaultColor)
     .setTimestamp()
     .setFooter({
      text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
      iconURL: interaction.user.displayAvatarURL({
       size: 256,
      }),
     })
     .setImage("attachment://chart.png");

    return interaction.followUp({ ephemeral: false, embeds: [embed], files: [attachment] });
   }
  } catch (err) {
   client.errorMessages.internalError(interaction, err);
  }
 },
};
