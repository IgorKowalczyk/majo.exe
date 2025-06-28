import { createDatabaseAutoModRule, syncDatabaseAutoModRule } from "@majoexe/util/database";
import {
 ChannelType,
 AutoModerationRuleEventType,
 AutoModerationRuleKeywordPresetType,
 AutoModerationActionType,
 AutoModerationRuleTriggerType,
 EmbedBuilder,
 PermissionsBitField,
 codeBlock,
 ChatInputCommandInteraction,
 TextChannel,
 GuildMember,
 type AutoModerationRuleCreateOptions,
} from "discord.js";
import type { Majobot } from "@/index";
import type { GuildSettings } from "@/util/types/Command";

export async function enableAntiBadWords(client: Majobot, interaction: ChatInputCommandInteraction, guildSettings: GuildSettings) {
 if (!interaction.guild) return client.errorMessages.createSlashError(interaction, "❌ This command can only be used in a server.");
 if (!interaction.guild.members.me) return client.errorMessages.createSlashError(interaction, "❌ I can't find myself in this server.");
 if (!interaction.member) return client.errorMessages.createSlashError(interaction, "❌ You must be in a server to use this command.");

 const createdRule = await syncDatabaseAutoModRule(interaction.guild.id, "anti-bad-words");

 const exemptRoles = interaction.options.getRole("exempt-roles");
 const exemptChannels = interaction.options.getChannel("exempt-channels");
 const logChannel = interaction.options.getChannel("log-channel") as TextChannel;
 const profanity = interaction.options.getBoolean("profanity") ?? true;
 const sexualContent = interaction.options.getBoolean("sexual-content") ?? true;
 const slurs = interaction.options.getBoolean("slurs") ?? true;

 if (!profanity && !sexualContent && !slurs) return client.errorMessages.createSlashError(interaction, "❌ You need to enable at least one filter!");

 const existingRules = await interaction.guild.autoModerationRules.fetch({ cache: false });
 const conflictingRule = existingRules.filter((rule) => rule.triggerType === AutoModerationRuleTriggerType.KeywordPreset).first();
 if (conflictingRule) await conflictingRule.delete("New anti-bad-words rule created");

 if (createdRule) {
  if (createdRule.enabled) return client.errorMessages.createSlashError(interaction, "❌ The anti-bad-words system is already `enabled`");

  await interaction.guild.autoModerationRules.edit(createdRule.id, {
   enabled: true,
  });

  const embed = new EmbedBuilder()
   .setColor(guildSettings?.embedColor || client.config.defaultColor)
   .setTimestamp()
   .setTitle("✅ Successfully `enabled` the anti-bad-words system again")
   .setDescription("The anti-bad-words system has been `enabled`. Common bad words will now be blocked.")
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
   name: "Anti bad words [Majo.exe]",
   creatorId: client.user?.id,
   enabled: true,
   eventType: AutoModerationRuleEventType.MessageSend,
   triggerType: AutoModerationRuleTriggerType.KeywordPreset,
   exemptChannels: exemptChannels ? [exemptChannels.id] : [],
   exemptRoles: exemptRoles ? [exemptRoles.id] : [],
   triggerMetadata: {
    presets: [
     // prettier
     profanity ? AutoModerationRuleKeywordPresetType.Profanity : undefined,
     sexualContent ? AutoModerationRuleKeywordPresetType.SexualContent : undefined,
     slurs ? AutoModerationRuleKeywordPresetType.Slurs : undefined,
    ].filter(Boolean),
   },
   actions: [
    {
     type: AutoModerationActionType.BlockMessage,
     metadata: {
      channel: interaction.channel,
      customMessage: "Message blocked due to containing a bad word. Rule added by Majo.exe",
     },
    },
   ],
   reason: `Requested by ${interaction.user.globalName || interaction.user.username}`,
  } as AutoModerationRuleCreateOptions;

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
     customMessage: "Message blocked due to containing a bad word. Rule added by Majo.exe",
    },
   });
  }

  const rule = await interaction.guild.autoModerationRules.create(ruleToCreate);

  await createDatabaseAutoModRule(interaction.guild.id, rule.id, "anti-bad-words");

  const embed = new EmbedBuilder()
   .setColor(guildSettings?.embedColor || client.config.defaultColor)
   .setTimestamp()
   .setTitle("✅ Successfully `enabled` the anti-bad-words system")
   .setDescription("The anti-bad-words system has been `enabled`. Common bad words will now be blocked.")
   .setFields([
    {
     name: "🔒 Rule name",
     value: "`Anti bad words`",
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
     value: codeBlock("Common bad words"),
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
