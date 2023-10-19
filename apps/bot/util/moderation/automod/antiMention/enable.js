/* eslint-disable complexity */

import { enableAutoModRule, createAutoModRule } from "@majoexe/util/database";
import { ChannelType, AutoModerationRuleEventType, AutoModerationActionType, AutoModerationRuleTriggerType, EmbedBuilder, PermissionsBitField, codeBlock } from "discord.js";

export async function enableAntiMention(client, interaction, limit, exemptRoles, exemptChannels, timeout, logChannel, createdRule, guildSettings) {
 if (createdRule) {
  if (createdRule.enabled) {
   return client.errorMessages.createSlashError(interaction, "❌ The anti-mention system is already `enabled`");
  } else if (!createdRule.enabled) {
   await interaction.guild.autoModerationRules.edit(createdRule.ruleId, {
    enabled: true,
   });

   await enableAutoModRule(interaction.guild.id, createdRule.ruleId);

   const embed = new EmbedBuilder()
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setTimestamp()
    .setTitle("✅ Successfully `enabled` the anti-mention system again")
    .setDescription("The anti-mention system has been `enabled`. Mention spam will now be blocked.")
    .setFields([
     {
      name: "🔒 Rule name",
      value: "`Mention spam over the limit`",
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
      value: codeBlock("All mentions over the limit"),
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
  }
 } else {
  const ruleToCreate = {
   name: "Disallow mention spam [Majo.exe]",
   creatorId: client.id,
   enabled: true,
   eventType: AutoModerationRuleEventType.MessageSend,
   triggerType: AutoModerationRuleTriggerType.MentionSpam,
   exemptChannels: exemptChannels ? [exemptChannels.id] : [],
   exemptRoles: exemptRoles ? [exemptRoles.id] : [],
   triggerMetadata: {
    mentionTotalLimit: limit,
    mentionRaidProtectionEnabled: true,
   },
   actions: [
    {
     type: AutoModerationActionType.BlockMessage,
     metadata: {
      channel: interaction.channel,
      customMessage: "Message blocked due to containing too many mentions. Rule added by Majo.exe",
     },
    },
   ],
   reason: `Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
  };

  if (timeout) {
   ruleToCreate.actions.push({
    type: AutoModerationActionType.Timeout,
    metadata: {
     durationSeconds: timeout,
    },
   });
  }

  if (logChannel) {
   if (!logChannel.permissionsFor(interaction.guild.members.me).has(PermissionsBitField.Flags.ViewChannel)) {
    return client.errorMessages.createSlashError(interaction, `❌ I don't have permission to view <#${logChannel.id}> channel`);
   }

   if (!logChannel.permissionsFor(interaction.guild.members.me).has(PermissionsBitField.Flags.SendMessages)) {
    return client.errorMessages.createSlashError(interaction, `❌ I don't have permission to send messages in <#${logChannel.id}> channel`);
   }

   if (!logChannel.permissionsFor(interaction.member).has(PermissionsBitField.Flags.ViewChannel)) {
    return client.errorMessages.createSlashError(interaction, `❌ You don't have permission to view <#${logChannel.id}> channel`);
   }

   if (!logChannel.permissionsFor(interaction.member).has(PermissionsBitField.Flags.SendMessages)) {
    return client.errorMessages.createSlashError(interaction, `❌ You don't have permission to send messages in <#${logChannel.id}> channel`);
   }

   ruleToCreate.actions.push({
    type: AutoModerationActionType.SendAlertMessage,
    metadata: {
     channel: logChannel,
     message: "Message blocked due to containing too many mentions. Rule added by Majo.exe",
    },
   });
  }

  const rule = await interaction.guild.autoModerationRules.create(ruleToCreate);

  await createAutoModRule(interaction.guild.id, rule.id, "anti-mention", true);

  const embed = new EmbedBuilder()
   .setColor(guildSettings?.embedColor || client.config.defaultColor)
   .setTimestamp()
   .setTitle("✅ Successfully `enabled` the anti-mention system")
   .setDescription(`The anti-mention system has been \`enabled\`. Mention spam over the limit (${limit}) will now be blocked.`)
   .setFields([
    {
     name: "🔒 Rule name",
     value: `\`Mention spam over the limit (${limit})\``,
     inline: true,
    },
    {
     name: "📨 Rule event",
     value: "`Message send`",
     inline: true,
    },
    {
     name: `📛 Rule action${timeout || logChannel ? "s" : ""}`,
     value: `\`Block message\`${timeout ? `, Timeout for \`${timeout}\` seconds` : ""}${logChannel ? `, Send alert message in <#${logChannel.id}>` : ""}`,
     inline: true,
    },
    {
     name: "⏱️ Rule timeout",
     value: timeout ? `\`${timeout} seconds\`` : "`None`",
     inline: true,
    },
    {
     name: "📝 Rule log channel",
     value: logChannel ? `<#${logChannel.id}>` : "`None`",
     inline: true,
    },
    {
     name: "🔑 Rule trigger",
     value: codeBlock(`All mentions over the limit (${limit})`),
     inline: false,
    },
    {
     name: "🔗 Rule exempt channels",
     value: exemptChannels ? (exemptChannels.type === ChannelType.GuildCategory ? `All channels in the category \`${exemptChannels.name}\`` : `<#${exemptChannels.id}>`) : "`None`",
     inline: true,
    },
    {
     name: "🔗 Rule exempt roles",
     value: exemptRoles ? `<@&${exemptRoles.id}>` : "`None`",
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
}
