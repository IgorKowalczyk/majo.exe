import {
 ApplicationCommandType,
 ChannelType,
 ApplicationCommandOptionType,
 PermissionsBitField,
 PermissionFlagsBits,
 InteractionContextType,
 ApplicationIntegrationType,
} from "discord.js";
import {
 autoModSettings,
 disableAntiBadWords,
 enableAntiBadWords,
 disableAntiInvite,
 enableAntiInvite,
 disableAntiLink,
 enableAntiLink,
 disableAntiMention,
 enableAntiMention,
 disableAntiSpam,
 enableAntiSpam,
} from "@/util/moderation/automod/index";
import type { SlashCommand } from "@/util/types/Command";

export default {
 name: "automod",
 description: "🤖 Configure Automoderation for your server",
 type: ApplicationCommandType.ChatInput,
 cooldown: 4000,
 contexts: [InteractionContextType.Guild],
 integrationTypes: [ApplicationIntegrationType.GuildInstall],
 defaultMemberPermissions: [PermissionFlagsBits.ManageGuild],
 usage: "/automod <subcommand>",
 options: [
  {
   name: "settings",
   description: "🤖 Show the current automod settings",
   type: ApplicationCommandOptionType.Subcommand,
  },
  {
   name: "anti-invite",
   description: "🔗 Enable/Disable the anti-invite system",
   type: ApplicationCommandOptionType.SubcommandGroup,
   options: [
    {
     name: "enable",
     description: "🔗 Enable the anti-invite system",
     type: ApplicationCommandOptionType.Subcommand,
     options: [
      {
       name: "exempt-roles",
       description: "Exempt roles from the anti-invite system",
       type: ApplicationCommandOptionType.Role,
       required: false,
      },
      {
       name: "exempt-channels",
       description: "Exempt channels from the anti-invite system",
       type: ApplicationCommandOptionType.Channel,
       channelTypes: [ChannelType.GuildText, ChannelType.GuildCategory],
       required: false,
      },
      {
       name: "timeout",
       description: "The timeout for the anti-invite system",
       type: ApplicationCommandOptionType.Integer,
       required: false,
       maxValue: 120,
       minValue: 5,
      },
      {
       name: "log-channel",
       description: "The log channel for the anti-invite system",
       type: ApplicationCommandOptionType.Channel,
       channelTypes: [ChannelType.GuildText],
       required: false,
      },
     ],
    },
    {
     name: "disable",
     description: "🔗 Disable the anti-invite system",
     type: ApplicationCommandOptionType.Subcommand,
    },
   ],
  },
  {
   name: "anti-link",
   description: "🔗 Enable/Disable the anti-link system",
   type: ApplicationCommandOptionType.SubcommandGroup,
   options: [
    {
     name: "enable",
     description: "🔗 Enable the anti-link system",
     type: ApplicationCommandOptionType.Subcommand,
     options: [
      {
       name: "exempt-roles",
       description: "Exempt roles from the anti-link system",
       type: ApplicationCommandOptionType.Role,
       required: false,
      },
      {
       name: "exempt-channels",
       description: "Exempt channels from the anti-link system",
       type: ApplicationCommandOptionType.Channel,
       channelTypes: [ChannelType.GuildText, ChannelType.GuildCategory],
       required: false,
      },
      {
       name: "timeout",
       description: "The timeout for the anti-link system",
       type: ApplicationCommandOptionType.Integer,
       required: false,
       maxValue: 120,
       minValue: 5,
      },
      {
       name: "log-channel",
       description: "The log channel for the anti-link system",
       type: ApplicationCommandOptionType.Channel,
       channelTypes: [ChannelType.GuildText],
       required: false,
      },
     ],
    },
    {
     name: "disable",
     description: "🔗 Disable the anti-link system",
     type: ApplicationCommandOptionType.Subcommand,
    },
   ],
  },
  {
   name: "anti-mention",
   description: "💭 Enable/Disable the anti-mention system",
   type: ApplicationCommandOptionType.SubcommandGroup,
   options: [
    {
     name: "enable",
     description: "💭 Enable the anti-mention system",
     type: ApplicationCommandOptionType.Subcommand,
     options: [
      {
       name: "limit",
       description: "The limit for the anti-mention system",
       type: ApplicationCommandOptionType.Integer,
       required: false,
       minValue: 1,
       maxValue: 50,
      },
      {
       name: "exempt-roles",
       description: "Exempt roles from the anti-mention system",
       type: ApplicationCommandOptionType.Role,
       required: false,
      },
      {
       name: "exempt-channels",
       description: "Exempt channels from the anti-mention system",
       type: ApplicationCommandOptionType.Channel,
       channelTypes: [ChannelType.GuildText, ChannelType.GuildCategory],
       required: false,
      },
      {
       name: "timeout",
       description: "The timeout for the anti-mention system",
       type: ApplicationCommandOptionType.Integer,
       required: false,
       maxValue: 120,
       minValue: 5,
      },
      {
       name: "log-channel",
       description: "The log channel for the anti-mention system",
       type: ApplicationCommandOptionType.Channel,
       channelTypes: [ChannelType.GuildText],
       required: false,
      },
     ],
    },
    {
     name: "disable",
     description: "💭 Disable the anti-mention system",
     type: ApplicationCommandOptionType.Subcommand,
    },
   ],
  },
  {
   name: "anti-spam",
   description: "📨 Enable/Disable the anti-spam system",
   type: ApplicationCommandOptionType.SubcommandGroup,
   options: [
    {
     name: "enable",
     description: "📨 Enable the anti-spam system",
     type: ApplicationCommandOptionType.Subcommand,
     options: [
      {
       name: "exempt-roles",
       description: "Exempt roles from the anti-spam system",
       type: ApplicationCommandOptionType.Role,
       required: false,
      },
      {
       name: "exempt-channels",
       description: "Exempt channels from the anti-spam system",
       type: ApplicationCommandOptionType.Channel,
       channelTypes: [ChannelType.GuildText, ChannelType.GuildCategory],
       required: false,
      },
      {
       name: "log-channel",
       description: "The log channel for the anti-spam system",
       type: ApplicationCommandOptionType.Channel,
       channelTypes: [ChannelType.GuildText],
       required: false,
      },
     ],
    },
    {
     name: "disable",
     description: "📨 Disable the anti-spam system",
     type: ApplicationCommandOptionType.Subcommand,
    },
   ],
  },
  {
   name: "anti-bad-words",
   description: "🤬 Enable/Disable the anti-bad-words system",
   type: ApplicationCommandOptionType.SubcommandGroup,
   options: [
    {
     name: "enable",
     description: "🤬 Enable the anti-bad-words system",
     type: ApplicationCommandOptionType.Subcommand,
     options: [
      {
       name: "exempt-roles",
       description: "Exempt roles from the anti-bad-words system",
       type: ApplicationCommandOptionType.Role,
       required: false,
      },
      {
       name: "exempt-channels",
       description: "Exempt channels from the anti-bad-words system",
       type: ApplicationCommandOptionType.Channel,
       channelTypes: [ChannelType.GuildText, ChannelType.GuildCategory],
       required: false,
      },
      {
       name: "log-channel",
       description: "The log channel for the anti-bad-words system",
       type: ApplicationCommandOptionType.Channel,
       channelTypes: [ChannelType.GuildText],
       required: false,
      },
      {
       name: "profanity",
       description: "Enable/Disable the profanity filter",
       type: ApplicationCommandOptionType.Boolean,
       required: false,
      },
      {
       name: "sexual-content",
       description: "Enable/Disable the sexual content filter",
       type: ApplicationCommandOptionType.Boolean,
       required: false,
      },
      {
       name: "slurs",
       description: "Enable/Disable the slurs filter",
       type: ApplicationCommandOptionType.Boolean,
       required: false,
      },
     ],
    },
    {
     name: "disable",
     description: "🤬 Disable the anti-bad-words system",
     type: ApplicationCommandOptionType.Subcommand,
    },
   ],
  },
 ],
 run: async (client, interaction, guildSettings) => {
  try {
   if (!interaction.guild) return client.errorMessages.createSlashError(interaction, "❌ This command can only be used in a server.");
   if (!interaction.member) return client.errorMessages.createSlashError(interaction, "❌ You must be in a server to use this command.");
   if (!interaction.guild.members.me) return client.errorMessages.createSlashError(interaction, "❌ Unable to get server data. Please try again.");
   if (!guildSettings) return client.errorMessages.createSlashError(interaction, "❌ Unable to get server settings. Please try again later.");

   const memberPermissions = interaction.memberPermissions || new PermissionsBitField();

   if (!memberPermissions.has(PermissionsBitField.Flags.ManageGuild)) {
    return client.errorMessages.createSlashError(interaction, "❌ You don't have permission to use this command. You need `Manage Server` permission");
   }

   if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageGuild)) {
    return client.errorMessages.createSlashError(interaction, "❌ I don't have permission to change Automoderation settings. Please give me `Manage Server` permission");
   }

   const command = interaction.options.getSubcommandGroup();
   const subcommand = interaction.options.getSubcommand();

   if (subcommand === "settings") {
    await autoModSettings(client, interaction, guildSettings);
   } else if (command === "anti-invite") {
    if (subcommand === "enable") {
     await enableAntiInvite(client, interaction, guildSettings);
    } else {
     await disableAntiInvite(client, interaction, guildSettings);
    }
   } else if (command === "anti-link") {
    if (subcommand === "enable") {
     await enableAntiLink(client, interaction, guildSettings);
    } else {
     await disableAntiLink(client, interaction, guildSettings);
    }
   } else if (command === "anti-mention") {
    if (subcommand === "enable") {
     await enableAntiMention(client, interaction, guildSettings);
    } else {
     await disableAntiMention(client, interaction, guildSettings);
    }
   } else if (command === "anti-spam") {
    if (subcommand === "enable") {
     await enableAntiSpam(client, interaction, guildSettings);
    } else {
     await disableAntiSpam(client, interaction, guildSettings);
    }
   } else if (command === "anti-bad-words") {
    if (subcommand === "enable") {
     await enableAntiBadWords(client, interaction, guildSettings);
    } else {
     await disableAntiBadWords(client, interaction, guildSettings);
    }
   }
  } catch (err) {
   client.errorMessages.internalError(interaction, err);
  }
 },
} satisfies SlashCommand;
