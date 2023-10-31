/* eslint-disable complexity */

import prismaClient from "@majoexe/database";
import { ApplicationCommandType, ApplicationCommandOptionType, PermissionsBitField, EmbedBuilder, codeBlock, PermissionFlagsBits } from "discord.js";

export default {
 name: "warn",
 description: "⚠️ Add/remove/modify warnings for a user",
 type: ApplicationCommandType.ChatInput,
 cooldown: 5000,
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
 run: async (client, interaction, guildSettings) => {
  try {
   if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) {
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

    const warning = await prismaClient.guildWarns.findMany({
     where: {
      guildId: interaction.guild.id,
      user: {
       discordId: user.id,
      },
     },
     take: 1,
     orderBy: {
      warnId: "desc",
     },
    });

    const warnNumber = warning.length === 0 ? 1 : warning[0].warnId + 1;

    await prismaClient.guildWarns.create({
     data: {
      guild: {
       connectOrCreate: {
        where: {
         guildId: interaction.guild.id,
        },
        create: {
         guildId: interaction.guild.id,
        },
       },
      },
      user: {
       connectOrCreate: {
        where: {
         discordId: user.id,
        },
        create: {
         discordId: user.id,
         name: user.username,
         global_name: user.global_name || user.username,
         discriminator: user.discriminator,
        },
       },
      },
      warnId: warnNumber,
      message: reason,
      createdById: interaction.member.user.id,
     },
    });

    const embed = new EmbedBuilder()
     .setTitle(`**✅ Successfully warned ${user.global_name || user.username}** / \`#${warnNumber}\``)
     .setDescription(`**Reason:**\n${codeBlock(reason)}\n**Note:** You can remove this warning with \`/warn remove ${user.id} ${warnNumber}\``)
     .setColor(guildSettings?.embedColor || client.config.defaultColor)
     .setTimestamp()
     .setFooter({
      text: `Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
      iconURL: interaction.member.user.displayAvatarURL({
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

    const warning = await prismaClient.guildWarns.findFirst({
     where: {
      guildId: interaction.guild.id,
      user: {
       discordId: user.id,
      },
      warnId: id,
     },
    });

    if (!warning) {
     return client.errorMessages.createSlashError(interaction, "❌ I couldn't find a warning with that ID!");
    }

    await prismaClient.guildWarns.delete({
     where: {
      id: warning.id,
     },
    });

    const embed = new EmbedBuilder()
     .setTitle("✅ Successfully removed warning")
     .setDescription(`Removed warning \`#${warning.warnId}\` from ${user}`)
     .setColor(guildSettings?.embedColor || client.config.defaultColor)
     .setTimestamp()
     .setFooter({
      text: `Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
      iconURL: interaction.member.user.displayAvatarURL({
       size: 256,
      }),
     });

    await interaction.followUp({ embeds: [embed] });
   } else if (command === "list") {
    const user = interaction.options.getUser("user");

    if (!user) {
     return client.errorMessages.createSlashError(interaction, "❌ You need to provide a user to list the warnings of!");
    }

    const warnings = await prismaClient.guildWarns.findMany({
     where: {
      guildId: interaction.guild.id,
      user: {
       discordId: user.id,
      },
     },
    });

    if (!warnings || warnings.length === 0) {
     return client.errorMessages.createSlashError(interaction, "❌ I couldn't find any warnings for that user!");
    }

    const embed = new EmbedBuilder()
     .setTitle(`🤖 Warnings for ${user.global_name || user.username} (${warnings.length})`)
     .setDescription(warnings.map((warning) => `- \`#${warning.warnId}\` - ${warning.message} (by <@${warning.createdById}> / <t:${Math.floor(warning.createdAt.getTime() / 1000)}:R>)`).join("\n"))
     .setColor(guildSettings?.embedColor || client.config.defaultColor)
     .setTimestamp()
     .setFooter({
      text: `Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
      iconURL: interaction.member.user.displayAvatarURL({
       size: 256,
      }),
     });

    await interaction.followUp({ embeds: [embed] });
   } else if (command === "clear") {
    const user = interaction.options.getUser("user");

    if (!user) {
     return client.errorMessages.createSlashError(interaction, "❌ You need to provide a user to clear the warnings of!");
    }

    const warnings = await prismaClient.guildWarns.findMany({
     where: {
      guildId: interaction.guild.id,
      user: {
       discordId: user.id,
      },
     },
    });

    if (!warnings || warnings.length === 0) {
     return client.errorMessages.createSlashError(interaction, "❌ I couldn't find any warnings for that user!");
    }

    await prismaClient.guildWarns.deleteMany({
     where: {
      guildId: interaction.guild.id,
      user: {
       discordId: user.id,
      },
     },
    });

    const embed = new EmbedBuilder()
     .setTitle(`✅ Successfully cleared all warnings from ${user.global_name || user.username}`)
     .setDescription(`> \`${warnings.length}\` warnings have been cleared from ${user}`)
     .setColor(guildSettings?.embedColor || client.config.defaultColor)
     .setTimestamp()
     .setFooter({
      text: `Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
      iconURL: interaction.member.user.displayAvatarURL({
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
