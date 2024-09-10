import { clearWarns, listWarnings, warnUser, removeWarning } from "@majoexe/util/database";
import { ApplicationCommandType, ApplicationCommandOptionType, PermissionsBitField, EmbedBuilder, codeBlock, PermissionFlagsBits, ChatInputCommandInteraction } from "discord.js";
import type { Majobot } from "../..";
import type { GuildSettings } from "../../util/types/Command";

export default {
 name: "warn",
 description: "⚠️ Add/remove/modify warnings for a user",
 type: ApplicationCommandType.ChatInput,
 cooldown: 2000,
 dm_permission: false,
 usage: "/warn <subcommand>",
 options: [
  {
   name: "add",
   description: "⚠️ Add a warning to a user",
   type: ApplicationCommandOptionType.Subcommand,
   options: [
    {
     name: "user",
     description: "The user to warn",
     type: ApplicationCommandOptionType.User,
     required: true,
    },
    {
     name: "reason",
     description: "The reason for the warning",
     type: ApplicationCommandOptionType.String,
     required: true,
    },
   ],
  },
  {
   name: "remove",
   description: "⚠️ Remove a warning from a user",
   type: ApplicationCommandOptionType.Subcommand,
   options: [
    {
     name: "user",
     description: "The user to remove the warning from",
     type: ApplicationCommandOptionType.User,
     required: true,
    },
    {
     name: "id",
     description: "The ID of the warning to remove",
     type: ApplicationCommandOptionType.Integer,
     required: true,
    },
   ],
  },
  {
   name: "list",
   description: "⚠️ List the warnings of a user",
   type: ApplicationCommandOptionType.Subcommand,
   options: [
    {
     name: "user",
     description: "The user to list the warnings of",
     type: ApplicationCommandOptionType.User,
     required: true,
    },
   ],
  },
  {
   name: "clear",
   description: "⚠️ Clear the warnings of a user",
   type: ApplicationCommandOptionType.Subcommand,
   options: [
    {
     name: "user",
     description: "The user to clear the warnings of",
     type: ApplicationCommandOptionType.User,
     required: true,
    },
   ],
  },
 ],
 permissions: [PermissionFlagsBits.ManageGuild],
 run: async (client: Majobot, interaction: ChatInputCommandInteraction, guildSettings: GuildSettings) => {
  try {
   if (!interaction.guild) return client.errorMessages.createSlashError(interaction, "❌ This command can only be used in a server.");
   if (!interaction.member) return client.errorMessages.createSlashError(interaction, "❌ You must be in a server to use this command.");
   if (!interaction.guild.members.me) return client.errorMessages.createSlashError(interaction, "❌ Unable to get server data. Please try again.");

   const userPermissions = interaction.member.permissions as PermissionsBitField;

   if (!userPermissions.has(PermissionsBitField.Flags.ManageGuild)) {
    return client.errorMessages.createSlashError(interaction, "❌ You don't have permission to use this command. You need `Manage Server` permission");
   }

   if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageGuild)) {
    return client.errorMessages.createSlashError(interaction, "❌ I don't have permission to change Automoderation settings. Please give me `Manage Server` permission");
   }

   const command = interaction.options.getSubcommand();

   if (command === "add") {
    const user = interaction.options.getUser("user");
    const reason = interaction.options.getString("reason");

    if (!user) {
     return client.errorMessages.createSlashError(interaction, "❌ You need to provide a user to warn!");
    }

    if (!reason) {
     return client.errorMessages.createSlashError(interaction, "❌ You need to provide a reason for the warning!");
    }

    const addedWarning = await warnUser(interaction.guild.id, user, reason, interaction.member.user.id);
    const warnNumber = addedWarning.warnId;

    const embed = new EmbedBuilder()
     .setTitle(`**✅ Successfully warned ${user.globalName || user.username}** / \`#${warnNumber}\``)
     .setDescription(`**Reason:**\n${codeBlock(reason)}\n**Note:** You can remove this warning with \`/warn remove ${user.id} ${warnNumber}\``)
     .setColor(guildSettings?.embedColor || client.config.defaultColor)
     .setTimestamp()
     .setFooter({
      text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
      iconURL: interaction.user.displayAvatarURL({
       size: 256,
      }),
     });

    await interaction.followUp({ embeds: [embed] });
   } else if (command === "remove") {
    const user = interaction.options.getUser("user");
    const id = interaction.options.getInteger("id");

    if (!user) {
     return client.errorMessages.createSlashError(interaction, "❌ You need to provide a user to remove the warning from!");
    }

    if (!id) {
     return client.errorMessages.createSlashError(interaction, "❌ You need to provide the ID of the warning to remove!");
    }

    const removedWarning = await removeWarning(interaction.guild.id, user.id, id);

    if (!removedWarning) {
     return client.errorMessages.createSlashError(interaction, "❌ I couldn't find a warning with that ID!");
    }

    const embed = new EmbedBuilder()
     .setTitle("✅ Successfully removed warning")
     .setDescription(`Removed warning \`#${removedWarning.warnId}\` from ${user}`)
     .setColor(guildSettings?.embedColor || client.config.defaultColor)
     .setTimestamp()
     .setFooter({
      text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
      iconURL: interaction.user.displayAvatarURL({
       size: 256,
      }),
     });

    await interaction.followUp({ embeds: [embed] });
   } else if (command === "list") {
    const user = interaction.options.getUser("user");

    if (!user) {
     return client.errorMessages.createSlashError(interaction, "❌ You need to provide a user to list the warnings of!");
    }

    const warnings = await listWarnings(interaction.guild.id, user.id);

    if (!warnings || warnings.length === 0) {
     return client.errorMessages.createSlashError(interaction, "❌ I couldn't find any warnings for that user!");
    }

    const embed = new EmbedBuilder()
     .setTitle(`🤖 Warnings for ${user.globalName || user.username} (${warnings.length})`)
     .setDescription(warnings.map((warning) => `- \`#${warning.warnId}\` - ${warning.message} (by <@${warning.createdById}> / <t:${Math.floor(warning.createdAt.getTime() / 1000)}:R>)`).join("\n"))
     .setColor(guildSettings?.embedColor || client.config.defaultColor)
     .setTimestamp()
     .setFooter({
      text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
      iconURL: interaction.user.displayAvatarURL({
       size: 256,
      }),
     });

    await interaction.followUp({ embeds: [embed] });
   } else if (command === "clear") {
    const user = interaction.options.getUser("user");

    if (!user) {
     return client.errorMessages.createSlashError(interaction, "❌ You need to provide a user to clear the warnings of!");
    }

    const count = await clearWarns(user.id, interaction.guild.id);

    const embed = new EmbedBuilder()
     .setTitle(`✅ Successfully cleared all warnings from ${user.globalName || user.username}`)
     .setDescription(`> \`${count || 0}\` warnings have been cleared from ${user}`)
     .setColor(guildSettings?.embedColor || client.config.defaultColor)
     .setTimestamp()
     .setFooter({
      text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
      iconURL: interaction.user.displayAvatarURL({
       size: 256,
      }),
     });

    await interaction.followUp({ embeds: [embed] });
   }
  } catch (err) {
   client.errorMessages.internalError(interaction, err);
  }
 },
};
