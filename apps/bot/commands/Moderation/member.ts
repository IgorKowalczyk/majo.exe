import { ApplicationCommandType, ApplicationCommandOptionType, PermissionFlagsBits, InteractionContextType, ApplicationIntegrationType } from "discord.js";
import { banMember } from "@/util/moderation/ban";
import { changememberNickname } from "@/util/moderation/changeMemberNickname";
import { getUserAvatar, getUserBanner } from "@/util/moderation/getMemberImages";
import { getMemberInfo } from "@/util/moderation/getMemberInfo";
import { kickMember } from "@/util/moderation/kick";
import { unBanMember } from "@/util/moderation/unban";
import type { SlashCommand } from "@/util/types/Command";

export default {
  name: "member",
  description: "👋 Modify user on this server",
  type: ApplicationCommandType.ChatInput,
  cooldown: 5000,
  contexts: [InteractionContextType.Guild],
  defaultMemberPermissions: [
    PermissionFlagsBits.ManageGuild,
    PermissionFlagsBits.ManageRoles,
    PermissionFlagsBits.ManageNicknames,
    PermissionFlagsBits.KickMembers,
    PermissionFlagsBits.BanMembers,
  ],
  integrationTypes: [ApplicationIntegrationType.GuildInstall],
  usage: "/member <subcommand>",
  options: [
    {
      name: "ban",
      description: "🔐 Ban user from this server",
      type: ApplicationCommandOptionType.Subcommand,
      usage: "/member ban <reason>",
      //defaultMemberPermissions: [PermissionFlagsBits.BanMembers],
      options: [
        {
          name: "user",
          description: "The user who should be banned",
          required: true,
          type: ApplicationCommandOptionType.User,
        },
        {
          name: "reason",
          description: "Reason for banning the user",
          required: false,
          type: ApplicationCommandOptionType.String,
          max_length: 512,
        },
      ],
    },
    {
      name: "unban",
      description: "🔓 Unban user from this server",
      type: ApplicationCommandOptionType.Subcommand,
      usage: "/member unban <reason>",
      //defaultMemberPermissions: [PermissionFlagsBits.BanMembers],
      options: [
        {
          name: "user_id",
          description: "The user who should be unbanned",
          required: true,
          type: ApplicationCommandOptionType.String,
        },
        {
          name: "reason",
          description: "Reason for unbanning the user",
          required: false,
          type: ApplicationCommandOptionType.String,
          max_length: 512,
        },
      ],
    },
    {
      name: "kick",
      description: "🔐 Kick user from this server",
      type: ApplicationCommandOptionType.Subcommand,
      usage: "/member kick <reason>",
      //defaultMemberPermissions: [PermissionFlagsBits.KickMembers],
      options: [
        {
          name: "user",
          description: "The user who should be kicked",
          required: true,
          type: ApplicationCommandOptionType.User,
        },
        {
          name: "reason",
          description: "Reason for kicking the user",
          required: false,
          type: ApplicationCommandOptionType.String,
        },
      ],
    },
    {
      name: "info",
      description: "📝 Check information about user",
      type: ApplicationCommandOptionType.Subcommand,
      usage: "/member info <user>",
      options: [
        {
          name: "user",
          description: "The user who should be checked",
          required: true,
          type: ApplicationCommandOptionType.User,
        },
      ],
    },
    {
      name: "avatar",
      description: "🧩 Get user avatar",
      type: ApplicationCommandOptionType.Subcommand,
      usage: "/member avatar <user> [guild_avatar]",
      options: [
        {
          name: "user",
          description: "The user which avatar should be shown",
          required: true,
          type: ApplicationCommandOptionType.User,
        },
        {
          name: "guild_avatar",
          description: "Show guild avatar instead of user avatar",
          required: false,
          type: ApplicationCommandOptionType.Boolean,
        },
      ],
    },
    {
      name: "banner",
      description: "🧩 Get user banner",
      type: ApplicationCommandOptionType.Subcommand,
      usage: "/member banner <user> [guild_banner]",
      options: [
        {
          name: "user",
          description: "The user which banner should be shown",
          required: true,
          type: ApplicationCommandOptionType.User,
        },
        {
          name: "guild_banner",
          description: "Show guild banner instead of user banner",
          required: false,
          type: ApplicationCommandOptionType.Boolean,
        },
      ],
    },
    {
      name: "nickname",
      description: "🏷️ Set/remove nickname for user",
      type: ApplicationCommandOptionType.SubcommandGroup,
      usage: "/member nickname set <user> <nickname> | /member nickname remove <user>",
      //defaultMemberPermissions: [PermissionFlagsBits.ManageNicknames],
      options: [
        {
          name: "set",
          description: "🏷️ Set nickname for user",
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              name: "user",
              description: "The user which nickname should be set",
              required: true,
              type: ApplicationCommandOptionType.User,
            },
            {
              name: "nickname",
              description: "The nickname which should be set",
              required: true,
              type: ApplicationCommandOptionType.String,
              max_length: 32,
            },
          ],
        },
        {
          name: "remove",
          description: "🏷️ Remove nickname for user",
          type: ApplicationCommandOptionType.Subcommand,
          //defaultMemberPermissions: [PermissionFlagsBits.ManageNicknames],
          options: [
            {
              name: "user",
              description: "The user which nickname should be removed",
              required: true,
              type: ApplicationCommandOptionType.User,
            },
          ],
        },
      ],
    },
  ],
  run: async (client, interaction, guildSettings) => {
    const command = interaction.options.getSubcommandGroup();
    const subcommand = interaction.options.getSubcommand();

    if (subcommand === "ban") {
      await banMember(client, interaction, guildSettings?.embedColor || client.config.defaultColor);
    } else if (subcommand === "unban") {
      await unBanMember(client, interaction, guildSettings?.embedColor || client.config.defaultColor);
    } else if (subcommand === "kick") {
      await kickMember(client, interaction, guildSettings?.embedColor || client.config.defaultColor);
    } else if (subcommand === "info") {
      await getMemberInfo(client, interaction, guildSettings?.embedColor || client.config.defaultColor);
    } else if (subcommand === "avatar") {
      await getUserAvatar(client, interaction, guildSettings?.embedColor || client.config.defaultColor);
    } else if (subcommand === "banner") {
      await getUserBanner(client, interaction, guildSettings?.embedColor || client.config.defaultColor);
    } else if (command === "nickname") {
      const subcommand = interaction.options.getSubcommand() as "set" | "remove";
      await changememberNickname(client, interaction, guildSettings?.embedColor || client.config.defaultColor, subcommand);
    }
  },
} satisfies SlashCommand;
