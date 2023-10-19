/* eslint-disable complexity */

import { fetchAutoModRules, syncAutoModRule } from "@majoexe/util/database";
import { ApplicationCommandType, ChannelType, ApplicationCommandOptionType, PermissionsBitField, EmbedBuilder, codeBlock } from "discord.js";
import { disableAntiInvite } from "../../util/moderation/automod/antiInvite/disable.js";
import { enableAntiInvite } from "../../util/moderation/automod/antiInvite/enable.js";
import { disableAntiLink } from "../../util/moderation/automod/antiLinks/disable.js";
import { enableAntiLink } from "../../util/moderation/automod/antiLinks/enable.js";
import { disableAntiMention } from "../../util/moderation/automod/antiMention/disable.js";
import { enableAntiMention } from "../../util/moderation/automod/antiMention/enable.js";

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
 ],
 permissions: [PermissionsBitField.Administrator],
 run: async (client, interaction, guildSettings) => {
  try {
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
   }
  } catch (err) {
   client.errorMessages.internalError(interaction, err);
  }
 },
};
