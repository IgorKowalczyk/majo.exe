/* eslint-disable complexity */

import { fetchAutoModRules, deleteAutoModRule, createAutoModRule, enableAutoModRule, disableAutoModRule } from "@majoexe/util/database";
import { ApplicationCommandType, ChannelType, ApplicationCommandOptionType, AutoModerationRuleEventType, AutoModerationActionType, AutoModerationRuleTriggerType, EmbedBuilder, PermissionsBitField, codeBlock } from "discord.js";

export default {
 name: "automod",
 description: "Configure Automoderation for your server",
 type: ApplicationCommandType.ChatInput,
 cooldown: 5000,
 dm_permission: false,
 usage: "/automod <command>",
 options: [
  {
   name: "anti-invite",
   description: "Enable/Disable the anti-invite system",
   type: ApplicationCommandOptionType.Subcommand,
   options: [
    {
     name: "enable",
     description: "Enable the anti-invite system",
     type: ApplicationCommandOptionType.Boolean,
     required: true,
    },
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
    }
   ],
  },
 ],
 permissions: [PermissionsBitField.Administrator],
 run: async (client, interaction, guildSettings) => {
  try {
   const subcommand = interaction.options.getSubcommand();

   if (subcommand === "anti-invite") {
    const enable = interaction.options.getBoolean("enable");
    const exemptRoles = interaction.options.getRole("exempt-roles");
    const exemptChannels = interaction.options.getChannel("exempt-channels");
    const timeout = interaction.options.getInteger("timeout");
    const logChannel = interaction.options.getChannel("log-channel");
    const rules = await fetchAutoModRules(interaction.guild.id);

    let createdRule = rules.find((rule) => rule.ruleType === "invite");

    if (createdRule) {
     try {
      const existingRule = await interaction.guild.autoModerationRules.fetch({ autoModerationRule: createdRule.ruleId, cache: false, force: true });
      if (!existingRule) {
       await deleteAutoModRule(interaction.guild.id, createdRule.ruleId);
       createdRule = null;
      } else if (createdRule.enabled !== existingRule.enabled) {
       existingRule.enabled ? await enableAutoModRule(interaction.guild.id, createdRule.ruleId) : await disableAutoModRule(interaction.guild.id, createdRule.ruleId);
       createdRule.enabled = existingRule.enabled;
      }
     } catch (err) {
      await deleteAutoModRule(interaction.guild.id, createdRule.ruleId);
      createdRule = null;
     }
    }

    if (enable) {
     if (createdRule && createdRule.enabled) {
      return client.errorMessages.createSlashError(interaction, "❌ The anti-invite system is already `enabled`");
     } else if (createdRule && !createdRule.enabled) {
      await interaction.guild.autoModerationRules.edit(createdRule.ruleId, {
       enabled: true,
      });

      await enableAutoModRule(interaction.guild.id, createdRule.ruleId);

      const embed = new EmbedBuilder()
       .setColor(guildSettings?.embedColor || client.config.defaultColor)
       .setTimestamp()
       .setTitle("✅ Successfully `enabled` the anti-invite system again")
       .setDescription("The anti-invite system has been `enabled`. All Discord invites will now be blocked.")
       .setFields([
        {
         name: "🔒 Rule name",
         value: "`Disallow invites`",
         inline: true,
        },
        {
         name: "📨 Rule event",
         value: "`Message send`",
         inline: true,
        },
        {
         name: "📛 Rule action(s)",
         value: "`Block message`",
         inline: true,
        },
        {
         name: "🔑 Rule trigger",
         value: codeBlock("All Discord invite links"),
         inline: false,
        },
       ])
       .setFooter({
        text: `Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
        iconURL: interaction.user.displayAvatarURL({
         size: 256,
        }),
       })
       .setThumbnail(
        interaction.guild.iconURL({
         size: 256,
        })
       );

      return interaction.followUp({ embeds: [embed] });
     } else if (!createdRule) {

      const ruleToCreate = {
       name: "Disallow invites [Majo.exe]",
       creatorId: client.id,
       enabled: true,
       eventType: AutoModerationRuleEventType.MessageSend,
       triggerType: AutoModerationRuleTriggerType.Keyword,
       exemptChannels: exemptChannels ? [exemptChannels.id] : [],
       exemptRoles: exemptRoles ? [exemptRoles.id] : [],
       triggerMetadata: {
        regexPatterns: ["(?:https?://)?(?:www.|ptb.|canary.)?(?:discord(?:app)?.(?:(?:com|gg)/(?:invite|servers)/[a-z0-9-_]+)|discord.gg/[a-z0-9-_]+)"],
       },
       actions: [
        {
         type: AutoModerationActionType.BlockMessage,
         metadata: {
          channel: interaction.channel,
          customMessage: "Message blocked due to containing an invite link. Rule added by Majo.exe",
         },
        },
       ],
       reason: `Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
      }

      if (timeout) {
       ruleToCreate.actions.push({
        type: AutoModerationActionType.Timeout,
        metadata: {
         durationSeconds: timeout,
        },
       });
      }

      if (logChannel) {
       ruleToCreate.actions.push({
        type: AutoModerationActionType.SendAlertMessage,
        metadata: {
         channel: logChannel,
         message: "Message blocked due to containing an invite link. Rule added by Majo.exe",
        },
       });
      }

      const rule = await interaction.guild.autoModerationRules.create(ruleToCreate);

      await createAutoModRule(interaction.guild.id, rule.id, "invite", true);

      const embed = new EmbedBuilder()
       .setColor(guildSettings?.embedColor || client.config.defaultColor)
       .setTimestamp()
       .setTitle("✅ Successfully `enabled` the anti-invite system")
       .setDescription("The anti-invite system has been `enabled`. All Discord invites will now be blocked.")
       .setFields([
        {
         name: "🔒 Rule name",
         value: "`Disallow invites`",
         inline: true,
        },
        {
         name: "📨 Rule event",
         value: "`Message send`",
         inline: true,
        },
        {
         name: "📛 Rule action(s)",
         value: "`Block message`",
         inline: true,
        },
        {
         name: "⏱️ Rule timeout",
         value: timeout ? `\`${timeout} seconds\`` : "None",
         inline: true,
        },
        {
         name: "📝 Rule log channel",
         value: logChannel ? `<#${logChannel.id}>` : "None",
         inline: true,
        },
        {
         name: "🔑 Rule trigger",
         value: codeBlock("All Discord invite links"),
         inline: false,
        },
        {
         name: "🔗 Rule exempt channels",
         value: exemptChannels ? (exemptChannels.type === ChannelType.GuildCategory ? `All channels in the category \`${exemptChannels.name}\`` : `<#${exemptChannels.id}>`) : "None",
         inline: true,
        },
        {
         name: "🔗 Rule exempt roles",
         value: exemptRoles ? `<@&${exemptRoles.id}>` : "None",
         inline: true,
        },
       ])
       .setFooter({
        text: `Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
        iconURL: interaction.user.displayAvatarURL({
         size: 256,
        }),
       })
       .setThumbnail(
        interaction.guild.iconURL({
         size: 256,
        })
       );

      return interaction.followUp({ embeds: [embed] });
     }
    } else {
     if (!createdRule || (createdRule && !createdRule.enabled)) {
      return client.errorMessages.createSlashError(interaction, "❌ The anti-invite system is already `disabled`");
     }

     await interaction.guild.autoModerationRules.edit(createdRule.ruleId, {
      enabled: false,
     });

     await disableAutoModRule(interaction.guild.id, createdRule.ruleId);

     const embed = new EmbedBuilder()
      .setColor(guildSettings?.embedColor || client.config.defaultColor)
      .setTimestamp()
      .setTitle("⛔ Successfully `disabled` the anti-invite system")
      .setDescription("The anti-invite system has been `disabled`. All Discord invites will no longer be blocked.")
      .setFooter({
       text: `Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
       iconURL: interaction.user.displayAvatarURL({
        size: 256,
       }),
      })
      .setThumbnail(
       interaction.guild.iconURL({
        size: 256,
       })
      );

     return interaction.followUp({ embeds: [embed] });
    }
   }
  } catch (err) {
   console.log(err);
   client.errorMessages.internalError(interaction, err);
  }
 },
};
