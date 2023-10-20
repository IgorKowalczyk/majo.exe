/* eslint-disable complexity */

import { enableAutoModRule, createAutoModRule } from "@majoexe/util/database";
import { ChannelType, AutoModerationRuleEventType, AutoModerationActionType, AutoModerationRuleTriggerType, EmbedBuilder, PermissionsBitField, codeBlock } from "discord.js";

export async function enableAntiSpam(client, interaction, exemptRoles, exemptChannels, logChannel, createdRule, guildSettings) {
 const existingRules = await interaction.guild.autoModerationRules.fetch({ cache: false });
 const conflictingRule = existingRules.filter((rule) => rule.triggerType === AutoModerationRuleTriggerType.Spam).first();
 if (conflictingRule) {
  await conflictingRule.delete("New anti-spam rule created");
 }

 if (createdRule) {
  if (createdRule.enabled) {
   return client.errorMessages.createSlashError(interaction, "❌ The anti-spam system is already `enabled`");
  } else if (!createdRule.enabled) {
   await interaction.guild.autoModerationRules.edit(createdRule.ruleId, {
    enabled: true,
   });

   await enableAutoModRule(interaction.guild.id, createdRule.ruleId);

   const embed = new EmbedBuilder()
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setTimestamp()
    .setTitle("✅ Successfully `enabled` the anti-spam system again")
    .setDescription("The anti-spam system has been `enabled`. Generic spam will now be blocked.")
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
   name: "Anti-spam [Majo.exe]",
   creatorId: client.id,
   enabled: true,
   eventType: AutoModerationRuleEventType.MessageSend,
   triggerType: AutoModerationRuleTriggerType.Spam,
   exemptChannels: exemptChannels ? [exemptChannels.id] : [],
   exemptRoles: exemptRoles ? [exemptRoles.id] : [],
   actions: [
    {
     type: AutoModerationActionType.BlockMessage,
     metadata: {
      channel: interaction.channel,
      customMessage: "Message blocked due to detected spam. Rule added by Majo.exe",
     },
    },
   ],
   reason: `Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
  };

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
     message: "Message blocked due to detected spam. Rule added by Majo.exe",
    },
   });
  }

  const rule = await interaction.guild.autoModerationRules.create(ruleToCreate);

  await createAutoModRule(interaction.guild.id, rule.id, "anti-spam", true);

  const embed = new EmbedBuilder()
   .setColor(guildSettings?.embedColor || client.config.defaultColor)
   .setTimestamp()
   .setTitle("✅ Successfully `enabled` the anti-spam system")
   .setDescription("The anti-spam system has been `enabled`. Generic spam will now be blocked.")
   .setFields([
    {
     name: "🔒 Rule name",
     value: "`Anti-spam`",
     inline: true,
    },
    {
     name: "📨 Rule event",
     value: "`Message send`",
     inline: true,
    },
    {
     name: `📛 Rule action${logChannel ? "s" : ""}`,
     value: `\`Block message\`${logChannel ? `, Send alert message in <#${logChannel.id}>` : ""}`,
     inline: true,
    },
    {
     name: "📝 Rule log channel",
     value: logChannel ? `<#${logChannel.id}>` : "`None`",
     inline: true,
    },
    {
     name: "🔑 Rule trigger",
     value: codeBlock("Generic spam"),
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
