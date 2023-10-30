import { ApplicationCommandType, ApplicationCommandOptionType, PermissionsBitField, EmbedBuilder, codeBlock, PermissionFlagsBits } from "discord.js";

export default {
 name: "warn",
 description: "🤖 Add/remove/modify warnings for a user",
 type: ApplicationCommandType.ChatInput,
 cooldown: 5000,
 dm_permission: false,
 usage: "/warn <subcommand>",
 options: [
  {
   name: "add",
   description: "Add a warning to a user",
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
   description: "Remove a warning from a user",
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
     type: ApplicationCommandOptionType.String,
     required: true,
    },
   ],
  },
  {
   name: "list",
   description: "List the warnings of a user",
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
   description: "Clear the warnings of a user",
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

   const command = interaction.options.getSubcommandGroup();
   const subcommand = interaction.options.getSubcommand();

   return client.errorMessages.createSlashError(interaction, `❌ This command is not yet implemented! Please wait for the next update`);
  } catch (err) {
   client.errorMessages.internalError(interaction, err);
  }
 },
};
