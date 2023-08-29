/* eslint-disable complexity */
import { setXPLevelUpMessageSettings, setXPSettings, fetchXPSettings } from "@majoexe/util/database";
import { ApplicationCommandType, ApplicationCommandOptionType, PermissionsBitField, PermissionFlagsBits, EmbedBuilder, time } from "discord.js";

export default {
 name: "xp-settings",
 description: "📈 Change the XP settings of current server",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 dm_permission: false,
 usage: "/xp-settings <subcommand>",
 default_member_permissions: [PermissionFlagsBits.Administrator],
 options: [
  {
   name: "change",
   description: "📈 Change the XP settings of current server",
   type: ApplicationCommandOptionType.Subcommand,
   usage: "/xp-settings change <action> <type>",
   default_member_permissions: [PermissionFlagsBits.Administrator],
   options: [
    {
     name: "action",
     description: "The action you want to perform",
     required: true,
     type: ApplicationCommandOptionType.String,
     choices: [
      {
       name: "Enable",
       value: "enable",
      },
      {
       name: "Disable",
       value: "disable",
      },
     ],
    },
    {
     name: "type",
     description: "The type of XP settings you want to enable",
     required: true,
     type: ApplicationCommandOptionType.String,
     choices: [
      {
       name: "Leveling messages",
       value: "leveling",
      },
      {
       name: "Gaining XP",
       value: "gaining",
      },
     ],
    },
   ],
  },
  {
   name: "view",
   description: "📈 View the XP settings of current server",
   type: ApplicationCommandOptionType.Subcommand,
   usage: "/xp-settings view",
   default_member_permissions: [PermissionFlagsBits.Administrator],
  },
 ],
 run: async (client, interaction, guildSettings) => {
  try {
   if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
    return client.errorMessages.createSlashError(interaction, "❌ You don't have permission to enable leveling messages, you need `Administrator` permission");
   }

   const subcommand = interaction.options.getSubcommand();

   if (subcommand === "change") {
    const action = interaction.options.getString("action");
    const type = interaction.options.getString("type");

    if (type === "leveling") {
     if (action === "enable") {
      const settings = await fetchXPSettings(interaction.guild.id);

      if (!settings || !settings.enableXP) {
       return client.errorMessages.createSlashError(interaction, "❌ XP is disabled in this server, you can't enable leveling messages if XP is disabled");
      }

      await setXPLevelUpMessageSettings(interaction.guild.id, true);

      const embed = new EmbedBuilder()
       .setColor(guildSettings.embedColor || client.config.defaultColor)
       .setTimestamp()
       .setTitle("✅ Success")
       .setDescription("> Successfully **`enabled`** leveling messages, now bot **will send** a message when a user levels up")
       .setFooter({
        text: `Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
        iconURL: interaction.member.user.displayAvatarURL({
         size: 256,
        }),
       });
      return interaction.followUp({ ephemeral: true, embeds: [embed] });
     } else if (action === "disable") {
      const settings = await fetchXPSettings(interaction.guild.id);

      if (!settings || !settings.enableXP) {
       return client.errorMessages.createSlashError(interaction, "❌ XP is disabled in this server, you can't disable leveling messages if XP is disabled");
      }
      await setXPLevelUpMessageSettings(interaction.guild.id, false);

      const embed = new EmbedBuilder()
       .setColor(guildSettings.embedColor || client.config.defaultColor)
       .setTimestamp()
       .setTitle("✅ Success")
       .setDescription("> Successfully **`disabled`** leveling messages, now bot **will not send** a message when a user levels up")
       .setFooter({
        text: `Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
        iconURL: interaction.member.user.displayAvatarURL({
         size: 256,
        }),
       });
      return interaction.followUp({ ephemeral: true, embeds: [embed] });
     }
    } else if (type === "gaining") {
     if (action === "enable") {
      await setXPSettings(interaction.guild.id, true);

      const embed = new EmbedBuilder()
       .setColor(guildSettings.embedColor || client.config.defaultColor)
       .setTimestamp()
       .setTitle("✅ Success")
       .setDescription("> Successfully **`enabled`** gaining XP, now users **will gain XP** when they send a message")
       .setFooter({
        text: `Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
        iconURL: interaction.member.user.displayAvatarURL({
         size: 256,
        }),
       });
      return interaction.followUp({ ephemeral: true, embeds: [embed] });
     } else if (action === "disable") {
      await setXPSettings(interaction.guild.id, false);

      const embed = new EmbedBuilder()
       .setColor(guildSettings.embedColor || client.config.defaultColor)
       .setTimestamp()
       .setTitle("✅ Success")
       .setDescription("> Successfully **`disabled`** gaining XP, now users **will not gain XP** when they send a message")
       .setFooter({
        text: `Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
        iconURL: interaction.member.user.displayAvatarURL({
         size: 256,
        }),
       });
      return interaction.followUp({ ephemeral: true, embeds: [embed] });
     }
    }
   } else if (subcommand === "view") {
    const settings = await fetchXPSettings(interaction.guild.id);

    const embed = new EmbedBuilder()
     .setColor(guildSettings.embedColor || client.config.defaultColor)
     .setTimestamp()
     .setTitle("📈 XP Settings")
     .setDescription(`> ${settings.enableXPLevelUpMessage ? client.config.emojis.success : client.config.emojis.error} **Leveling messages:** \`${settings.enableXPLevelUpMessage ? "Enabled" : "Disabled"}\` (Last updated: ${settings.enableXPLevelUpMessageLastChanged ? time(settings.enableXPLevelUpMessageLastChanged, "R") : "Never"})\n> ${settings.enableXP ? client.config.emojis.success : client.config.emojis.error} **Gaining XP:** \`${settings.enableXP ? "Enabled" : "Disabled"}\` (Last updated: ${settings.enableXPLastChanged ? time(settings.enableXPLastChanged, "R") : "Never"})`)
     .setFooter({
      text: `Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
      iconURL: interaction.member.user.displayAvatarURL({
       size: 256,
      }),
     });
    return interaction.followUp({ ephemeral: true, embeds: [embed] });
   } else {
    return client.errorMessages.createSlashError(interaction, "❌ Invalid subcommand, please use `/xp-settings <subcommand>`");
   }
  } catch (err) {
   client.errorMessages.internalError(interaction, err);
  }
 },
};
