/* eslint-disable complexity */

import { fetchAutoModRules, syncAutoModRule } from "@majoexe/util/database";
import { ApplicationCommandType, ChannelType, ApplicationCommandOptionType, PermissionsBitField, EmbedBuilder, codeBlock, PermissionFlagsBits } from "discord.js";
import { disableAntiInvite, enableAntiInvite, disableAntiLink, enableAntiLink, disableAntiMention, enableAntiMention, disableAntiSpam, enableAntiSpam } from "../../util/moderation/automod/index.js";

export default {
 name: "automod",
 description: "🤖 Configure Automoderation for your server",
 type: ApplicationCommandType.ChatInput,
 cooldown: 5000,
 dm_permission: false,
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
 permissions: [PermissionFlagsBits.ManageGuild],
 run: async (client, interaction, guildSettings) => {
  try {
   if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) {
    return client.errorMessages.createSlashError(interaction, "❌ You don't have permission to use this command. You need `Manage Server` permission");
   }

   if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageGuild)) {
    return client.errorMessages.createSlashError(interaction, "❌ I don't have permission to change Automoderation settings. Please give me `Manage Server` permission");
   }

   const command = interaction.options.getSubcommandGroup();
   const subcommand = interaction.options.getSubcommand();

   if (subcommand === "settings") {
    let allRules = await fetchAutoModRules(interaction.guild.id);

    allRules.forEach(async (rule) => {
     try {
      allRules[allRules.indexOf(rule)] = await syncAutoModRule(interaction, rule.ruleType);
     } catch (err) {
      await client.errorMessages.createSlashError(interaction, `❌ Failed to sync rule \`${rule.ruleId}\``);
     }
    });

    const antiInviteRule = allRules.find((rule) => rule.ruleType === "anti-invite");
    const antiLinkRule = allRules.find((rule) => rule.ruleType === "anti-link");
    const antiMentionRule = allRules.find((rule) => rule.ruleType === "anti-mention");
    const antiSpamRule = allRules.find((rule) => rule.ruleType === "anti-spam");

    const embed = new EmbedBuilder()
     .setColor(guildSettings?.embedColor || client.config.defaultColor)
     .setTimestamp()
     .setTitle("🤖 Automoderation settings")
     .setDescription("> You can `enable`/`disable` automoderation systems using `/automod <subcommand>`")
     .setFields([
      {
       name: "🔗 Anti-invite system",
       value: codeBlock(antiInviteRule?.enabled ? "✅ Enabled" : "❌ Disabled"),
       inline: false,
      },
      {
       name: "🔗 Anti-link system",
       value: codeBlock(antiLinkRule?.enabled ? "✅ Enabled" : "❌ Disabled"),
       inline: false,
      },
      {
       name: "🔗 Anti-mention system",
       value: codeBlock(antiMentionRule?.enabled ? "✅ Enabled" : "❌ Disabled"),
       inline: false,
      },
      {
       name: "🔗 Anti-spam system",
       value: codeBlock(antiSpamRule?.enabled ? "✅ Enabled" : "❌ Disabled"),
       inline: false,
      },
     ])
     .setThumbnail(
      interaction.guild.iconURL({
       size: 256,
      })
     )
     .setFooter({
      text: `Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
      iconURL: interaction.user.displayAvatarURL({
       size: 256,
      }),
     });

    return interaction.followUp({ embeds: [embed] });
   } else if (command === "anti-invite") {
    const exemptRoles = interaction.options.getRole("exempt-roles");
    const exemptChannels = interaction.options.getChannel("exempt-channels");
    const timeout = interaction.options.getInteger("timeout");
    const logChannel = interaction.options.getChannel("log-channel");
    const createdRule = await syncAutoModRule(interaction, "anti-invite");

    if (subcommand === "enable") {
     await enableAntiInvite(client, interaction, exemptRoles, exemptChannels, timeout, logChannel, createdRule, guildSettings);
    } else {
     await disableAntiInvite(client, interaction, createdRule, guildSettings);
    }
   } else if (command === "anti-link") {
    const exemptRoles = interaction.options.getRole("exempt-roles");
    const exemptChannels = interaction.options.getChannel("exempt-channels");
    const timeout = interaction.options.getInteger("timeout");
    const logChannel = interaction.options.getChannel("log-channel");
    const createdRule = await syncAutoModRule(interaction, "anti-link");

    if (subcommand === "enable") {
     await enableAntiLink(client, interaction, exemptRoles, exemptChannels, timeout, logChannel, createdRule, guildSettings);
    } else {
     await disableAntiLink(client, interaction, createdRule, guildSettings);
    }
   } else if (command === "anti-mention") {
    const limit = interaction.options.getInteger("limit") || 5;
    const exemptRoles = interaction.options.getRole("exempt-roles");
    const exemptChannels = interaction.options.getChannel("exempt-channels");
    const timeout = interaction.options.getInteger("timeout");
    const logChannel = interaction.options.getChannel("log-channel");
    const createdRule = await syncAutoModRule(interaction, "anti-mention");

    if (subcommand === "enable") {
     await enableAntiMention(client, interaction, limit, exemptRoles, exemptChannels, timeout, logChannel, createdRule, guildSettings);
    } else {
     await disableAntiMention(client, interaction, createdRule, guildSettings);
    }
   } else if (command === "anti-spam") {
    const exemptRoles = interaction.options.getRole("exempt-roles");
    const exemptChannels = interaction.options.getChannel("exempt-channels");
    const logChannel = interaction.options.getChannel("log-channel");
    const createdRule = await syncAutoModRule(interaction, "anti-spam");

    if (subcommand === "enable") {
     await enableAntiSpam(client, interaction, exemptRoles, exemptChannels, logChannel, createdRule, guildSettings);
    } else {
     await disableAntiSpam(client, interaction, createdRule, guildSettings);
    }
   } else if (command === "anti-bad-words") {
    const exemptRoles = interaction.options.getRole("exempt-roles");
    const exemptChannels = interaction.options.getChannel("exempt-channels");
    const logChannel = interaction.options.getChannel("log-channel");
    const profanity = interaction.options.getBoolean("profanity") || true;
    const sexualContent = interaction.options.getBoolean("sexual-content") || true;
    const slurs = interaction.options.getBoolean("slurs") || true;
    const createdRule = await syncAutoModRule(interaction, "anti-bad-words");

    if (!profanity && !sexualContent && !slurs) {
     return client.errorMessages.createSlashError(interaction, "❌ You need to enable at least one filter!");
    }

    return client.errorMessages.createSlashError(interaction, "❌ This feature is not available yet! Please wait for the next update!");
   }
  } catch (err) {
   client.errorMessages.internalError(interaction, err);
  }
 },
};
