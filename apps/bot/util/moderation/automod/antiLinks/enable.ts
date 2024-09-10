import { createAutoModRule, syncAutoModRule } from "@majoexe/util/database";
import { ChannelType, AutoModerationRuleEventType, AutoModerationActionType, AutoModerationRuleTriggerType, EmbedBuilder, PermissionsBitField, codeBlock, ChatInputCommandInteraction, type AutoModerationRuleCreateOptions, TextChannel, GuildMember } from "discord.js";
import type { Majobot } from "../../../..";
import type { GuildSettings } from "../../../types/Command";

export async function enableAntiLink(client: Majobot, interaction: ChatInputCommandInteraction, guildSettings: GuildSettings) {
 if (!interaction.guild) return client.errorMessages.createSlashError(interaction, "❌ This command can only be used in a server.");
 if (!interaction.guild.members.me) return client.errorMessages.createSlashError(interaction, "❌ I can't find myself in this server.");
 if (!interaction.member) return client.errorMessages.createSlashError(interaction, "❌ You must be in a server to use this command.");
 const createdRule = await syncAutoModRule(interaction.guild.id, "anti-link");

 const exemptRoles = interaction.options.getRole("exempt-roles");
 const exemptChannels = interaction.options.getChannel("exempt-channels");
 const timeout = interaction.options.getInteger("timeout");
 const logChannel = interaction.options.getChannel("log-channel") as TextChannel;

 const existingRules = await interaction.guild.autoModerationRules.fetch({ cache: false });
 const conflictingRules = existingRules.filter((rule) => rule.triggerType === AutoModerationRuleTriggerType.Keyword);
 if (conflictingRules.size === 6) return client.errorMessages.createSlashError(interaction, "❌ You can only have 6 keyword rules enabled at once. Please disable one of the existing keyword rules before enabling this one.");

 if (createdRule) {
  if (createdRule.enabled) return client.errorMessages.createSlashError(interaction, "❌ The anti-link system is already `enabled`");

  await interaction.guild.autoModerationRules.edit(createdRule.id, {
   enabled: true,
  });

  const embed = new EmbedBuilder()
   .setColor(guildSettings?.embedColor || client.config.defaultColor)
   .setTimestamp()
   .setTitle("✅ Successfully `enabled` the anti-link system again")
   .setDescription("The anti-link system has been `enabled`. All links will now be blocked.")
   .setFooter({
    text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
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
 } else {
  const ruleToCreate = {
   name: "Disallow links [Majo.exe]",
   creatorId: client.user?.id,
   enabled: true,
   eventType: AutoModerationRuleEventType.MessageSend,
   triggerType: AutoModerationRuleTriggerType.Keyword,
   exemptChannels: exemptChannels ? [exemptChannels.id] : [],
   exemptRoles: exemptRoles ? [exemptRoles.id] : [],
   triggerMetadata: {
    regexPatterns: ["(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?"],
   },
   actions: [
    {
     type: AutoModerationActionType.BlockMessage,
     metadata: {
      channel: interaction.channel,
      customMessage: "Message blocked due to containing an link. Rule added by Majo.exe",
     },
    },
   ],
   reason: `Requested by ${interaction.user.globalName || interaction.user.username}`,
  } as AutoModerationRuleCreateOptions;

  if (timeout) {
   ruleToCreate.actions = ruleToCreate.actions.concat({
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

   const user = interaction.member as GuildMember;

   if (!logChannel.permissionsFor(user).has(PermissionsBitField.Flags.ViewChannel)) {
    return client.errorMessages.createSlashError(interaction, `❌ You don't have permission to view <#${logChannel.id}> channel`);
   }

   if (!logChannel.permissionsFor(user).has(PermissionsBitField.Flags.SendMessages)) {
    return client.errorMessages.createSlashError(interaction, `❌ You don't have permission to send messages in <#${logChannel.id}> channel`);
   }

   ruleToCreate.actions = ruleToCreate.actions.concat({
    type: AutoModerationActionType.SendAlertMessage,
    metadata: {
     channel: logChannel,
     customMessage: "Message blocked due to containing an link. Rule added by Majo.exe",
    },
   });
  }

  const rule = await interaction.guild.autoModerationRules.create(ruleToCreate);

  await createAutoModRule(interaction.guild.id, rule.id, "anti-link");

  const embed = new EmbedBuilder()
   .setColor(guildSettings?.embedColor || client.config.defaultColor)
   .setTimestamp()
   .setTitle("✅ Successfully `enabled` the anti-link system")
   .setDescription("The anti-link system has been `enabled`. All links will now be blocked.")
   .setFields([
    {
     name: "🔒 Rule name",
     value: "`Disallow links`",
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
     value: codeBlock("All links"),
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
    text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
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
