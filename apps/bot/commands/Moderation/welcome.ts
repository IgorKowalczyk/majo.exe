import prismaClient from "@majoexe/database";
import { shortenText } from "@majoexe/util/functions/util";
import {
 ApplicationCommandType,
 ApplicationCommandOptionType,
 ChannelType,
 PermissionsBitField,
 EmbedBuilder,
 PermissionFlagsBits,
 codeBlock,
 TextChannel,
 InteractionContextType,
 ApplicationIntegrationType,
} from "discord.js";
import type { SlashCommand } from "@/util/types/Command";

export default {
 name: "welcome",
 description: "👋 Welcome new members",
 type: ApplicationCommandType.ChatInput,
 cooldown: 2000,
 contexts: [InteractionContextType.Guild],
 integrationTypes: [ApplicationIntegrationType.GuildInstall],
 defaultMemberPermissions: [PermissionFlagsBits.ManageGuild],
 usage: "/welcome <subcommand>",
 options: [
  {
   name: "enable",
   description: "👋 Enable welcome messages",
   type: ApplicationCommandOptionType.Subcommand,
   options: [
    {
     name: "channel",
     description: "The channel to set as the welcome channel",
     type: ApplicationCommandOptionType.Channel,
     channel_types: [ChannelType.GuildText],
     required: true,
    },
    {
     name: "title",
     description: "Title of the welcome message. Use {user} to mention the user and {guild} to mention the guild",
     type: ApplicationCommandOptionType.String,
     required: false,
     max_length: 250,
    },
    {
     name: "description",
     description: "Description of the welcome message. Use {user} to mention the user and {guild} to mention the guild",
     type: ApplicationCommandOptionType.String,
     required: false,
     max_length: 2040,
    },
   ],
  },
  {
   name: "disable",
   description: "👋 Disable welcome messages",
   type: ApplicationCommandOptionType.Subcommand,
  },
  {
   name: "check",
   description: "👋 Check if welcome messages are enabled",
   type: ApplicationCommandOptionType.Subcommand,
  },
 ],
 run: async (client, interaction, guildSettings) => {
  try {
   if (!interaction.guild) return client.errorMessages.createSlashError(interaction, "❌ This command can only be used in a server.");
   if (!interaction.member) return client.errorMessages.createSlashError(interaction, "❌ You must be in a server to use this command.");
   if (!interaction.guild.members.me) return client.errorMessages.createSlashError(interaction, "❌ Unable to get server data. Please try again.");

   const memberPermissions = interaction.memberPermissions || new PermissionsBitField();

   if (!memberPermissions.has(PermissionsBitField.Flags.ManageGuild)) {
    return client.errorMessages.createSlashError(interaction, "❌ You don't have permission to use this command. You need `Manage Server` permission");
   }
   if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageGuild)) {
    return client.errorMessages.createSlashError(interaction, "❌ I don't have permission to change Automoderation settings. Please give me `Manage Server` permission");
   }

   const command = interaction.options.getSubcommand();

   if (command === "enable") {
    const channel = interaction.options.getChannel("channel") as TextChannel;

    if (!channel) return client.errorMessages.createSlashError(interaction, "❌ You need to provide a channel to set as the welcome channel!");
    if (channel.type !== ChannelType.GuildText) return client.errorMessages.createSlashError(interaction, "❌ This command can only be used in a text channel");
    if (!channel.isTextBased()) return client.errorMessages.createSlashError(interaction, "❌ You need to provide a text channel to set as the welcome channel!");
    if (!channel.permissionsFor(interaction.guild.members.me).has(PermissionsBitField.Flags.SendMessages))
     return client.errorMessages.createSlashError(interaction, "❌ I don't have permission to send messages in that channel!");
    if (!channel.permissionsFor(interaction.guild.members.me).has(PermissionsBitField.Flags.EmbedLinks))
     return client.errorMessages.createSlashError(interaction, "❌ I don't have permission to embed links in that channel!");
    if (!channel.permissionsFor(interaction.guild.members.me).has(PermissionsBitField.Flags.AttachFiles))
     return client.errorMessages.createSlashError(interaction, "❌ I don't have permission to attach files in that channel!");
    if (!channel.permissionsFor(interaction.guild.members.me).has(PermissionsBitField.Flags.ViewChannel))
     return client.errorMessages.createSlashError(interaction, "❌ I don't have permission to view that channel!");

    const title = interaction.options.getString("title") || "🎉 Welcome to the server {user}!";
    const description = interaction.options.getString("description") || "> Welcome to **{guild}** We hope you enjoy your stay here!";

    await prismaClient.guildWelcomeMessage.upsert({
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
     .setDescription(`> **Welcome messages have been enabled in ${channel.toString()}**`)
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
    await prismaClient.guildWelcomeMessage.update({
     where: {
      guildId: interaction.guild.id,
     },
     data: {
      enabled: false,
     },
    });

    const embed = new EmbedBuilder() // prettier
     .setTitle("✅ Success!")
     .setDescription("> **Welcome messages have been disabled**. You can enable them again by using `/welcome enable`")
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
      guildWelcomeMessage: true,
     },
    });

    if (!guild?.guildWelcomeMessage || !guild.guildWelcomeMessage.enabled) {
     const embed = new EmbedBuilder() // prettier
      .setTitle("👋 Welcome messages are disabled")
      .setDescription("> Welcome messages are disabled, you can enable them by using `/welcome enable`")
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
     const channel = interaction.guild.channels.cache.get(guild.guildWelcomeMessage.channelId);

     if (!channel) {
      await prismaClient.guildWelcomeMessage.delete({
       where: {
        guildId: interaction.guild.id,
       },
      });

      const embed = new EmbedBuilder() // prettier
       .setTitle("👋 Welcome messages are disabled")
       .setDescription(
        ">>> **Welcome messages have been disabled automatically** because the channel was deleted or I don't have permission to view it!\nYou can enable them again by using `/welcome enable`"
       )
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
       .setTitle("👋 Welcome messages are enabled")
       .setDescription(`>>> **Welcome messages are enabled in ${channel.toString()}!**\n When a new member joins I will send a welcome message in that channel!`)
       .setFields([
        {
         name: "Embed title",
         value: codeBlock(guild.guildWelcomeMessage.title),
         inline: false,
        },
        {
         name: "Embed description",
         value: codeBlock(guild.guildWelcomeMessage.description),
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
} satisfies SlashCommand;
