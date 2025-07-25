import {
 ApplicationCommandType,
 ApplicationCommandOptionType,
 PermissionsBitField,
 EmbedBuilder,
 Role,
 GuildMember,
 InteractionContextType,
 ApplicationIntegrationType,
} from "discord.js";
import type { SlashCommand } from "@/util/types/Command";

export default {
 name: "role",
 description: "🧩 Add/Remove role from user",
 type: ApplicationCommandType.ChatInput,
 cooldown: 2000,
 contexts: [InteractionContextType.Guild],
 integrationTypes: [ApplicationIntegrationType.GuildInstall],
 usage: "/role add <role> <user> | /role remove <role> <user> | /role info <role>",
 options: [
  {
   name: "add",
   description: "🧩 Add role to user",
   type: ApplicationCommandOptionType.Subcommand,
   usage: "/role add <role> <user>",
   //defaultMemberPermissions: [PermissionFlagsBits.ManageRoles],
   options: [
    {
     name: "role",
     description: "Role to add",
     required: true,
     type: ApplicationCommandOptionType.Role,
    },
    {
     name: "user",
     description: "The user who should get the role",
     required: true,
     type: ApplicationCommandOptionType.User,
    },
    {
     name: "reason",
     description: "Reason for adding the role",
     required: false,
     max_length: 256,
     type: ApplicationCommandOptionType.String,
    },
   ],
  },
  {
   name: "remove",
   description: "🧩 Remove role from user",
   type: ApplicationCommandOptionType.Subcommand,
   usage: "/role remove <role> <user>",
   //defaultMemberPermissions: [PermissionFlagsBits.ManageRoles],
   options: [
    {
     name: "role",
     description: "Role to remove",
     required: true,
     type: ApplicationCommandOptionType.Role,
    },
    {
     name: "user",
     description: "The user who should lose the role",
     required: true,
     type: ApplicationCommandOptionType.User,
    },
    {
     name: "reason",
     description: "Reason for adding the role",
     required: false,
     max_length: 256,
     type: ApplicationCommandOptionType.String,
    },
   ],
  },
  {
   name: "info",
   description: "🧩 Check information about role",
   type: ApplicationCommandOptionType.Subcommand,
   usage: "/role info <role>",
   options: [
    {
     name: "role",
     description: "Role to get info for",
     required: true,
     type: ApplicationCommandOptionType.Role,
    },
   ],
  },
 ],
 run: async (client, interaction, guildSettings) => {
  try {
   if (!interaction.guild) return client.errorMessages.createSlashError(interaction, "❌ This command can only be used in a server.");
   if (!interaction.member) return client.errorMessages.createSlashError(interaction, "❌ You must be in a server to use this command.");
   if (!interaction.guild.members.me) return client.errorMessages.createSlashError(interaction, "❌ Unable to get server data. Please try again.");

   const subCommand = interaction.options.getSubcommand();

   const interactionMember = interaction.member as GuildMember;
   const userPermissions = interactionMember.permissions as PermissionsBitField;

   // #region Add
   if (subCommand === "add") {
    const role = interaction.options.getRole("role") as Role;
    const user = interaction.options.getMember("user") as GuildMember;
    const reason = interaction.options.getString("reason") || "No reason provided";

    if (!role) return client.errorMessages.createSlashError(interaction, "❌ You need to provide a role to add!");

    if (role.managed) return client.errorMessages.createSlashError(interaction, "❌ You can't add a managed role!");

    if (!user) return client.errorMessages.createSlashError(interaction, "❌ You need to provide a user to add the role to!");

    if (!userPermissions.has(PermissionsBitField.Flags.ManageRoles)) return client.errorMessages.createSlashError(interaction, "❌ You don't have permission to manage roles");
    if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageRoles))
     return client.errorMessages.createSlashError(interaction, "❌ I don't have permission to manage roles");

    if (interactionMember.roles.highest.comparePositionTo(role) <= 0)
     return client.errorMessages.createSlashError(interaction, "❌ You can't add a role which is higher than your highest role!");

    if (interaction.guild.members.me.roles.highest.comparePositionTo(role) <= 0)
     return client.errorMessages.createSlashError(interaction, "❌ I can't add a role which is higher than my highest role!");

    await user.roles.add(role, reason);

    const embed = new EmbedBuilder()
     .setColor(guildSettings?.embedColor || client.config.defaultColor)
     .setTimestamp()
     .setTitle("🧩 Role added")
     .setDescription(`> **${user}** has been given the role **${role}**\n> **Reason:** ${reason}`)
     .setThumbnail(user.displayAvatarURL())
     .setFooter({
      text: `Role added by ${interaction.user.globalName || interaction.user.username}`,
      iconURL: interaction.user.displayAvatarURL(),
     });

    return interaction.followUp({ embeds: [embed] });
    // #endregion
    // #region Remove
   } else if (subCommand === "remove") {
    const role = interaction.options.getRole("role") as Role;
    const user = interaction.options.getMember("user") as GuildMember;
    const reason = interaction.options.getString("reason") || "No reason provided";

    if (!role) {
     return client.errorMessages.createSlashError(interaction, "❌ You need to provide a role to remove!");
    }

    if (!role) {
     return client.errorMessages.createSlashError(interaction, "❌ You need to provide a role to add!");
    }

    if (role.managed) {
     return client.errorMessages.createSlashError(interaction, "❌ You can't remove a managed role!");
    }

    if (!user) {
     return client.errorMessages.createSlashError(interaction, "❌ You need to provide a user to add the role to!");
    }

    if (!userPermissions.has(PermissionsBitField.Flags.ManageRoles)) {
     return client.errorMessages.createSlashError(interaction, "❌ You don't have permission to manage roles");
    }

    if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
     return client.errorMessages.createSlashError(interaction, "❌ I don't have permission to manage roles");
    }

    if (interactionMember.roles.highest.comparePositionTo(role) <= 0) {
     return client.errorMessages.createSlashError(interaction, "❌ You can't remove a role which is higher than your highest role!");
    }

    if (interaction.guild.members.me.roles.highest.comparePositionTo(role) <= 0) {
     return client.errorMessages.createSlashError(interaction, "❌ I can't remove a role which is higher than my highest role!");
    }

    if (interactionMember.roles.highest.comparePositionTo(user.roles.highest) <= 0) {
     return client.errorMessages.createSlashError(interaction, "❌ You can't remove a role from a user which is higher than your highest role!");
    }

    if (interaction.guild.members.me.roles.highest.comparePositionTo(user.roles.highest) <= 0) {
     return client.errorMessages.createSlashError(interaction, "❌ I can't remove a role from a user which is higher than my highest role!");
    }

    await user.roles.remove(role, reason);

    const embed = new EmbedBuilder()
     .setColor(guildSettings?.embedColor || client.config.defaultColor)
     .setTimestamp()
     .setTitle("🧩 Role removed")
     .setThumbnail(user.displayAvatarURL())
     .setDescription(`> **${user}** has been removed from the role **${role}**\n> **Reason:** ${reason}`)
     .setFooter({
      text: `Role removed by ${interaction.user.globalName || interaction.user.username}`,
      iconURL: interaction.user.displayAvatarURL(),
     });

    return interaction.followUp({ embeds: [embed] });
    // #endregion
    // #region Info
   } else if (subCommand === "info") {
    const role = interaction.options.getRole("role") as Role;

    if (!role) {
     return client.errorMessages.createSlashError(interaction, "❌ You need to provide a role to check info!");
    }

    const embed = new EmbedBuilder()
     .setAuthor({
      name: role.name,
      iconURL:
       interaction.guild.iconURL({
        size: 256,
       }) || "",
     })
     .setColor(role.color || guildSettings?.embedColor || client.config.defaultColor)
     .setFooter({
      text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
      iconURL: interaction.user.displayAvatarURL({
       size: 256,
      }),
     })

     .addFields([
      {
       name: `${client.config.emojis.role} Role ID`,
       value: `\`${role.id}\``,
       inline: false,
      },
      {
       name: `${client.config.emojis.color} Color`,
       value: `\`${role.hexColor}\``,
       inline: true,
      },
      {
       name: `${client.config.emojis.stage_channel} Mention`,
       value: `<@&${role.id}>`,
       inline: true,
      },
      {
       name: `${client.config.emojis.stopwatch} Date created`,
       value: `<t:${Math.floor(role.createdTimestamp / 1000)}:F> (<t:${Math.floor(role.createdTimestamp / 1000)}:R>)`,
       inline: false,
      },
      {
       name: `${client.config.emojis.member} Members `,
       value: `\`${role.members.size}\` members with this role`,
       inline: true,
      },
      {
       name: `${client.config.emojis.arrows_clockwise} Position `,
       value: `\`${role.position}/${interaction.guild.roles.cache.size}\` (from top)`,
       inline: true,
      },
      {
       name: `${client.config.emojis.lock} Managed`,
       value: `\`${role.managed ? "Yes" : "No"}\` ${role.managed && role.tags && role.tags.botId ? `(by <@${role.tags.botId}>)` : ""}`,
       inline: false,
      },
      {
       name: `${client.config.emojis.owner_crown} Hoisted`,
       value: `\`${role.hoist ? "Yes" : "No"}\``,
       inline: true,
      },
      {
       name: `${client.config.emojis.mention} Mentionable`,
       value: `\`${role.mentionable ? "Yes" : "No"}\``,
       inline: true,
      },
     ]);

    return interaction.followUp({ embeds: [embed] });
   }
   // #endregion
  } catch (_err) {
   return client.errorMessages.createSlashError(interaction, "❌ An error occurred while executing this command");
  }
 },
} satisfies SlashCommand;
