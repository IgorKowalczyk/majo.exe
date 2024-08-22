import prismaClient from "@majoexe/database";
import { shortenText } from "@majoexe/util/functions/util";
import { ApplicationCommandType, ApplicationCommandOptionType, ChannelType, PermissionsBitField, EmbedBuilder, PermissionFlagsBits, codeBlock, ChatInputCommandInteraction, TextChannel } from "discord.js";
import type { Majobot } from "../..";
import type { GuildSettings } from "../../util/types/Command";

export default {
 name: "leave",
 description: "👋 Leave new members",
 type: ApplicationCommandType.ChatInput,
 cooldown: 2000,
 dm_permission: false,
 usage: "/leave <subcommand>",
 options: [
  {
   name: "enable",
   description: "👋 Enable leave messages",
   type: ApplicationCommandOptionType.Subcommand,
   options: [
    {
     name: "channel",
     description: "The channel to set as the leave channel",
     type: ApplicationCommandOptionType.Channel,
     channel_types: [ChannelType.GuildText],
     required: true,
    },
    {
     name: "title",
     description: "Title of the leave message. Use {user} to mention the user and {guild} to mention the guild",
     type: ApplicationCommandOptionType.String,
     required: false,
     max_length: 250,
    },
    {
     name: "description",
     description: "Description of the leave message. Use {user} to mention the user and {guild} to mention the guild",
     type: ApplicationCommandOptionType.String,
     required: false,
     max_length: 2040,
    },
   ],
  },
  {
   name: "disable",
   description: "👋 Disable leave messages",
   type: ApplicationCommandOptionType.Subcommand,
  },
  {
   name: "check",
   description: "👋 Check if leave messages are enabled",
   type: ApplicationCommandOptionType.Subcommand,
  },
 ],
 permissions: [PermissionFlagsBits.ManageGuild],
 run: async (client: Majobot, interaction: ChatInputCommandInteraction, guildSettings: GuildSettings) => {
  try {
   if (!interaction.guild) return client.errorMessages.createSlashError(interaction, "❌ This command can only be used in a server.");
   if (!interaction.member) return client.errorMessages.createSlashError(interaction, "❌ You must be in a server to use this command.");
   if (!interaction.guildId) return client.errorMessages.createSlashError(interaction, "❌ Unable to get server data. Please try again.");
   if (!interaction.guild.members.me) return client.errorMessages.createSlashError(interaction, "❌ Unable to get server data. Please try again.");

   const memberPermissions = interaction.member.permissions as PermissionsBitField;

   if (!memberPermissions.has(PermissionsBitField.Flags.ManageGuild)) return client.errorMessages.createSlashError(interaction, "❌ You don't have permission to use this command. You need `Manage Server` permission");
   if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageGuild)) return client.errorMessages.createSlashError(interaction, "❌ I don't have permission to change settings. Please give me `Manage Server` permission");

   const command = interaction.options.getSubcommand();

   if (command === "enable") {
    const channel = interaction.options.getChannel("channel") as TextChannel;

    if (!channel) return client.errorMessages.createSlashError(interaction, "❌ You need to provide a channel to set as the leave channel!");
    if (!channel.isTextBased()) return client.errorMessages.createSlashError(interaction, "❌ You need to provide a text channel to set as the leave channel!");
    if (!channel.permissionsFor(interaction.guild.members.me).has(PermissionsBitField.Flags.SendMessages)) return client.errorMessages.createSlashError(interaction, "❌ I don't have permission to send messages in that channel!");
    if (!channel.permissionsFor(interaction.guild.members.me).has(PermissionsBitField.Flags.EmbedLinks)) return client.errorMessages.createSlashError(interaction, "❌ I don't have permission to embed links in that channel!");
    if (!channel.permissionsFor(interaction.guild.members.me).has(PermissionsBitField.Flags.AttachFiles)) return client.errorMessages.createSlashError(interaction, "❌ I don't have permission to attach files in that channel!");
    if (!channel.permissionsFor(interaction.guild.members.me).has(PermissionsBitField.Flags.ViewChannel)) return client.errorMessages.createSlashError(interaction, "❌ I don't have permission to view that channel!");

    const title = interaction.options.getString("title") || "👋 Goodbye {user}!";
    const description = interaction.options.getString("description") || "> We're sorry to see you go!";

    await prismaClient.guildLeaveMessage.upsert({
     where: {
      guildId: interaction.guild.id,
     },
     update: {
      channelId: channel.id,
      title: shortenText(title, 250),
      description: shortenText(description, 2040),
      enabled: true,
     },
     create: {
      guildId: interaction.guild.id,
      channelId: channel.id,
      title: shortenText(title, 250),
      description: shortenText(description, 2040),
      enabled: true,
     },
    });

    const embed = new EmbedBuilder() // prettier
     .setTitle("✅ Success!")
     .setDescription(`> **Leave messages have been enabled in ${channel.toString()}**`)
     .setFields([
      {
       name: "Embed title",
       value: codeBlock(title),
       inline: false,
      },
      {
       name: "Embed description",
       value: codeBlock(description),
       inline: false,
      },
     ])
     .setColor(guildSettings?.embedColor || client.config.defaultColor)
     .setTimestamp()
     .setThumbnail(interaction.guild.iconURL({ size: 256 }))
     .setFooter({
      text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
      iconURL: interaction.user.displayAvatarURL({
       size: 256,
      }),
     });

    await interaction.followUp({ embeds: [embed] });
   } else if (command === "disable") {
    await prismaClient.guildLeaveMessage.update({
     where: {
      guildId: interaction.guild.id,
     },
     data: {
      enabled: false,
     },
    });

    const embed = new EmbedBuilder() // prettier
     .setTitle("✅ Success!")
     .setDescription("> **Leave messages have been disabled!** You can enable them again by using `/leave enable`")
     .setColor(guildSettings?.embedColor || client.config.defaultColor)
     .setTimestamp()
     .setThumbnail(interaction.guild.iconURL({ size: 256 }))
     .setFooter({
      text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
      iconURL: interaction.user.displayAvatarURL({
       size: 256,
      }),
     });

    await interaction.followUp({ embeds: [embed] });
   } else if (command === "check") {
    const guild = await prismaClient.guild.findUnique({
     where: {
      guildId: interaction.guild.id,
     },
     include: {
      guildLeaveMessage: true,
     },
    });

    if (!guild?.guildLeaveMessage || !guild.guildLeaveMessage.enabled) {
     const embed = new EmbedBuilder() // prettier
      .setTitle("👋 Leave messages are disabled")
      .setDescription("> Leave messages are disabled! You can enable them by using `/leave enable`")
      .setColor(guildSettings?.embedColor || client.config.defaultColor)
      .setTimestamp()
      .setThumbnail(interaction.guild.iconURL({ size: 256 }))
      .setFooter({
       text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
       iconURL: interaction.user.displayAvatarURL({
        size: 256,
       }),
      });

     await interaction.followUp({ embeds: [embed] });
    } else {
     const channel = interaction.guild.channels.cache.get(guild.guildLeaveMessage.channelId);

     if (!channel) {
      await prismaClient.guildLeaveMessage.delete({
       where: {
        guildId: interaction.guild.id,
       },
      });

      const embed = new EmbedBuilder() // prettier
       .setTitle("👋 Leave messages are disabled")
       .setDescription("> **Leave messages have been disabled automatically** because the channel was deleted or I don't have permission to view it!\n> You can enable them again by using `/leave enable`")
       .setColor(guildSettings?.embedColor || client.config.defaultColor)
       .setTimestamp()
       .setThumbnail(interaction.guild.iconURL({ size: 256 }))
       .setFooter({
        text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL({
         size: 256,
        }),
       });

      await interaction.followUp({ embeds: [embed] });
     } else {
      const embed = new EmbedBuilder() // prettier
       .setTitle("👋 Leave messages are enabled")
       .setDescription(`>>> **Leave messages are enabled in ${channel.toString()}!**\nWhen a member leaves, I will send a message in that channel.`)
       .setFields([
        {
         name: "Embed title",
         value: codeBlock(guild.guildLeaveMessage.title),
         inline: false,
        },
        {
         name: "Embed description",
         value: codeBlock(guild.guildLeaveMessage.description),
         inline: false,
        },
       ])
       .setColor(guildSettings?.embedColor || client.config.defaultColor)
       .setTimestamp()
       .setThumbnail(interaction.guild.iconURL({ size: 256 }))
       .setFooter({
        text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL({
         size: 256,
        }),
       });

      await interaction.followUp({ embeds: [embed] });
     }
    }
   }
  } catch (err) {
   client.errorMessages.internalError(interaction, err);
  }
 },
};
