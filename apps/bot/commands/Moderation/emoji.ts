/* eslint-disable complexity */

import { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, PermissionsBitField, codeBlock, PermissionFlagsBits, type GuildEmoji, InteractionContextType, ApplicationIntegrationType } from "discord.js";
import isURL from "validator/lib/isURL";
import type { SlashCommand } from "@/util/types/Command";

export default {
 name: "emoji",
 description: "🎨 Manage emojis on this server",
 type: ApplicationCommandType.ChatInput,
 cooldown: 5000,
 contexts: [InteractionContextType.Guild],
 integrationTypes: [ApplicationIntegrationType.GuildInstall],
 defaultMemberPermissions: [PermissionFlagsBits.ManageGuild],
 usage: "/emoji create <emoji name> <emoji url> | /emoji delete <emoji> | /emoji info <emoji> | /emoji steal <new emoji name> <emoji> | /emoji list",
 options: [
  {
   name: "create",
   description: "🎨 Create an emoji on this server",
   type: ApplicationCommandOptionType.Subcommand,
   usage: "/emoji create <emoji name> <emoji url>",
   //defaultMemberPermissions: [PermissionFlagsBits.ManageGuildExpressions],
   options: [
    {
     name: "emoji_name",
     description: "The name of the emoji",
     required: true,
     type: ApplicationCommandOptionType.String,
    },
    {
     name: "emoji",
     description: "The URL, ID or custom emoji to create",
     required: true,
     type: ApplicationCommandOptionType.String,
    },
   ],
  },
  {
   name: "delete",
   description: "🎨 Delete an emoji from this server",
   type: ApplicationCommandOptionType.Subcommand,
   usage: "/emoji delete <emoji>",
   //defaultMemberPermissions: [PermissionFlagsBits.ManageGuildExpressions],
   options: [
    {
     name: "emoji",
     description: "The name or id of the emoji",
     required: true,
     type: ApplicationCommandOptionType.String,
    },
   ],
  },
  {
   name: "info",
   description: "🎨 Get info about an emoji",
   type: ApplicationCommandOptionType.Subcommand,
   usage: "/emoji info <emoji>",
   options: [
    {
     name: "emoji",
     description: "The name or id of the emoji",
     required: true,
     type: ApplicationCommandOptionType.String,
    },
   ],
  },
  {
   name: "list",
   description: "🎨 List all emojis on this server",
   type: ApplicationCommandOptionType.Subcommand,
   usage: "/emoji list",
  },
 ],
 run: async (client, interaction, guildSettings) => {
  if (!interaction.guild) return client.errorMessages.createSlashError(interaction, "❌ This command can only be used in a server.");
  if (!interaction.member) return client.errorMessages.createSlashError(interaction, "❌ You must be in a server to use this command.");
  if (!interaction.guildId) return client.errorMessages.createSlashError(interaction, "❌ Unable to get server data. Please try again.");
  if (!interaction.guild.members.me) return client.errorMessages.createSlashError(interaction, "❌ Unable to get server data. Please try again.");

  const subcommand = interaction.options.getSubcommand();
  const memberPermissions = interaction.member.permissions as PermissionsBitField;

  // #region Create
  if (subcommand === "create") {
   try {
    if (!memberPermissions.has(PermissionsBitField.Flags.ManageGuildExpressions)) return client.errorMessages.createSlashError(interaction, "❌ You need the `MANAGE_EMOJIS_AND_STICKERS` permission to create emojis!");
    if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageGuildExpressions)) return client.errorMessages.createSlashError(interaction, "❌ I need `MANAGE_EMOJIS_AND_STICKERS` permission to manage emojis!");

    const emojiName = interaction.options.getString("emoji_name");
    const emojiURL = interaction.options.getString("emoji");

    if (!emojiName || !emojiURL) return client.errorMessages.createSlashError(interaction, "❌ Please provide an emoji name and an emoji URL!");

    if (interaction.guild.emojis.cache.find((semoji) => semoji && semoji.name && semoji.name.toLowerCase() === emojiName.toLowerCase() && semoji.name !== null)) return client.errorMessages.createSlashError(interaction, "❌ An emoji with that name already exists!");

    if (emojiName.length > 32) return client.errorMessages.createSlashError(interaction, "❌ Emoji name must be less than 32 characters!");

    if (emojiName.length < 2) return client.errorMessages.createSlashError(interaction, "❌ Emoji name must be more than 2 characters!");

    let emojiToCreate;

    if (isURL(emojiURL)) {
     emojiToCreate = emojiURL;
    } else if ((emojiURL.startsWith("<:") || emojiURL.startsWith("<a:")) && emojiURL.endsWith(">")) {
     const animated = emojiURL.startsWith("<a:");
     const emojiId = emojiURL.split(":")[2].replaceAll(">", "");
     emojiToCreate = `https://cdn.discordapp.com/emojis/${emojiId}.${animated ? "gif" : "png"}`;
    } else if (!isNaN(Number(emojiURL))) {
     emojiToCreate = `https://cdn.discordapp.com/emojis/${emojiURL}.png`;
    } else {
     return client.errorMessages.createSlashError(interaction, "❌ Invalid emoji URL/ID!");
    }

    try {
     const emoji = await interaction.guild.emojis.create({
      attachment: emojiToCreate,
      name: emojiName,
     });

     const embed = new EmbedBuilder()
      .setColor(guildSettings?.embedColor || client.config.defaultColor)
      .setTimestamp()
      .setTitle(`${client.config.emojis.success} Emoji successfully created!`)
      .setFields([
       {
        name: `${client.config.emojis.edit} Emoji name`,
        value: codeBlock(emoji.name || "None"),
        inline: true,
       },
       {
        name: `${client.config.emojis.screw_that} Emoji ID`,
        value: codeBlock(emoji.id),
        inline: true,
       },
       {
        name: `${client.config.emojis.link} Emoji URL`,
        value: `> <${emoji.imageURL({ size: 256 })}>`,
       },
      ])
      .setThumbnail(emoji.imageURL({ size: 256 }))
      .setFooter({
       text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
       iconURL: interaction.user.displayAvatarURL({
        size: 256,
       }),
      });

     return interaction.followUp({ ephemeral: false, embeds: [embed] });
    } catch (_err) {
     return client.errorMessages.createSlashError(interaction, "❌ Cannot create emoji! It may be because of the following reasons:\n\n>>> - You have reached the maximum number of emojis on this server\n- The emoji URL is invalid\n- The emoji name is invalid\n- The emoji is too large");
    }
   } catch (err) {
    client.errorMessages.internalError(interaction, err);
   }
   // #endregion
   // #region Delete
  } else if (subcommand === "delete") {
   try {
    if (!memberPermissions.has(PermissionsBitField.Flags.ManageGuildExpressions)) return client.errorMessages.createSlashError(interaction, "❌ You need the `MANAGE_EMOJIS_AND_STICKERS` permission to create emojis!");
    if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageGuildExpressions)) return client.errorMessages.createSlashError(interaction, "❌ I need `MANAGE_EMOJIS_AND_STICKERS` permission to manage emojis!");

    const emoji = interaction.options.getString("emoji");

    if (!emoji) return client.errorMessages.createSlashError(interaction, "❌ Please provide an emoji name or ID!");

    let emojiToDelete;

    if (!isNaN(Number(emoji))) {
     emojiToDelete = await interaction.guild.emojis.fetch(emoji);
    } else {
     emojiToDelete = interaction.guild.emojis.cache.find((semoji) => semoji && semoji.name && (semoji.name === emoji || semoji.name.toLowerCase() === emoji.toLowerCase() || semoji.name.split(":")[0] === emoji || semoji.name.split(":")[1] === emoji));
    }

    if (!emojiToDelete) return client.errorMessages.createSlashError(interaction, "❌ It seems like that emoji doesn't exist!");

    if (emojiToDelete.managed) return client.errorMessages.createSlashError(interaction, "❌ You cannot delete an emoji that is managed by an external service!");

    try {
     await emojiToDelete.delete();
    } catch (_err) {
     return client.errorMessages.createSlashError(interaction, "❌ Cannot delete emoji! It may be because of the following reasons:\n\n>>> - The emoji is not from this server\n- The emoji is not found\n - This is just a bug");
    }

    const embed = new EmbedBuilder()
     .setColor(guildSettings?.embedColor || client.config.defaultColor)
     .setTimestamp()
     .setTitle(`${client.config.emojis.success} Emoji successfully deleted!`)
     .setFields([
      {
       name: `${client.config.emojis.edit} Emoji name`,
       value: codeBlock(emojiToDelete.name || "None"),
       inline: true,
      },
      {
       name: `${client.config.emojis.screw_that} Emoji ID`,
       value: codeBlock(emojiToDelete.id),
       inline: true,
      },
      {
       name: `${client.config.emojis.link} Emoji URL`,
       value: `> <${emojiToDelete.imageURL({ size: 256 })}>`,
      },
     ])
     .setThumbnail(emojiToDelete.imageURL({ size: 256 }))
     .setFooter({
      text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
      iconURL: interaction.user.displayAvatarURL({
       size: 256,
      }),
     });

    return interaction.followUp({ ephemeral: false, embeds: [embed] });
   } catch (err) {
    client.errorMessages.internalError(interaction, err);
   }
   // #endregion
   // #region Info
  } else if (subcommand === "info") {
   try {
    const emoji = interaction.options.getString("emoji");
    if (!emoji) return client.errorMessages.createSlashError(interaction, "❌ Please provide an emoji name or ID!");
    let emojiToGet: GuildEmoji | undefined;

    if (!isNaN(Number(emoji))) {
     emojiToGet = await interaction.guild.emojis.fetch(emoji);
    } else {
     emojiToGet = interaction.guild.emojis.cache.find((semoji) => semoji && semoji.name && (semoji.name === emoji || semoji.name.toLowerCase() === emoji.toLowerCase() || semoji.name.split(":")[0] === emoji || semoji.name.split(":")[1] === emoji));
    }

    if (!emojiToGet) return client.errorMessages.createSlashError(interaction, "❌ It seems like that emoji doesn't exist!");

    const embed = new EmbedBuilder()
     .setColor(guildSettings?.embedColor || client.config.defaultColor)
     .setTimestamp()
     .setTitle(`${emoji} Emoji info`)
     .setFields([
      {
       name: `${client.config.emojis.edit} Emoji name`,
       value: codeBlock(emojiToGet.name || "None"),
       inline: true,
      },
      {
       name: `${client.config.emojis.screw_that} Emoji ID`,
       value: codeBlock(emojiToGet.id || "None"),
       inline: true,
      },
      {
       name: `${client.config.emojis.question} Animated`,
       value: codeBlock(emojiToGet.animated ? "Yes" : "No"),
       inline: true,
      },
      {
       name: `${client.config.emojis.member} Added by`,
       value: `> ${emojiToGet.fetchAuthor()}`,
       inline: true,
      },
      {
       name: `${client.config.emojis.stopwatch} Added at`,
       value: `> <t:${Math.floor(emojiToGet.createdTimestamp / 1000)}:R>`,
       inline: true,
      },
      {
       name: `${client.config.emojis.link} Emoji URL`,
       value: `> ${emojiToGet.imageURL({ size: 256 })}`,
      },
     ])
     .setThumbnail(emojiToGet.imageURL({ size: 256 }))
     .setFooter({
      text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
      iconURL: interaction.user.displayAvatarURL({
       size: 256,
      }),
     });

    return interaction.followUp({ ephemeral: false, embeds: [embed] });
   } catch (err) {
    client.errorMessages.internalError(interaction, err);
   }
   // #endregion
   // #region List
  } else if (subcommand === "list") {
   try {
    const embed = new EmbedBuilder()
     .setColor(guildSettings?.embedColor || client.config.defaultColor)
     .setTitle(`${client.config.emojis.success} Emojis on this server`)
     .setFields([
      {
       name: "Total Emojis",
       value: codeBlock(interaction.guild.emojis.cache.size.toString() || "0"),
       inline: true,
      },
      {
       name: "Animated Emojis",
       value: codeBlock(interaction.guild.emojis.cache.filter((emoji) => emoji.animated).size.toString() || "0"),
       inline: true,
      },
      {
       name: "Static Emojis",
       value: codeBlock(interaction.guild.emojis.cache.filter((emoji) => !emoji.animated).size.toString() || "0"),
       inline: true,
      },
     ])
     .setDescription(
      `> ${
       interaction.guild.emojis.cache.map((emoji) => emoji).join(" ").length > 2048
        ? interaction.guild.emojis.cache
           .map((emoji) => emoji)
           .join(" ")
           .slice(0, 2048) + "..."
        : interaction.guild.emojis.cache.map((emoji) => emoji).join(" ")
      }`
     )
     .setFooter({
      text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
      iconURL: interaction.user.displayAvatarURL({
       size: 256,
      }),
     });

    return interaction.followUp({ ephemeral: false, embeds: [embed] });
   } catch (err) {
    client.errorMessages.internalError(interaction, err);
   }
  }
  // #endregion
 },
} satisfies SlashCommand;
