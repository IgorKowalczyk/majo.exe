import { ApplicationCommandType, ApplicationIntegrationType, EmbedBuilder, InteractionContextType, PermissionsBitField, codeBlock } from "discord.js";
import type { SlashCommand } from "@/util/types/Command";

function convertCamelCaseToWords(text: string) {
 return text.replace(/([A-Z])/g, " $1").replace(/^./, (str) => {
  return str.toUpperCase().trim();
 });
}

export default {
 name: "permissions",
 description: "🎛️ Check Majo.exe's permissions in your server",
 type: ApplicationCommandType.ChatInput,
 cooldown: 5000,
 contexts: [InteractionContextType.Guild],
 integrationTypes: [ApplicationIntegrationType.GuildInstall],
 usage: "/permissions",
 run: async (client, interaction, guildSettings) => {
  try {
   if (!client.user) return client.errorMessages.createSlashError(interaction, "❌ Bot is not ready yet. Please try again later.");
   if (!interaction.guild) return client.errorMessages.createSlashError(interaction, "❌ This command can only be used in a server.");
   if (!guildSettings) return client.errorMessages.createSlashError(interaction, "❌ Guild settings not found. Please try again later.");

   const clientMember = interaction.guild.members.cache.get(client.user.id);
   if (!clientMember) return client.errorMessages.createSlashError(interaction, "❌ Bot is not in the server.");
   const requiredPermissions = new PermissionsBitField(client.config.permissions);

   const permissionsText = requiredPermissions.toArray().map((permission) => {
    const hasPermission = clientMember.permissions.has(permission);
    const permissionName = convertCamelCaseToWords(permission.replace(/_/g, " "));

    return `${hasPermission ? "✅" : "❌"} ${permissionName}`;
   });

   const embed = new EmbedBuilder()
    .setColor(guildSettings.embedColor || client.config.defaultColor)
    .setTimestamp()
    .setTitle(`🎛️ Permissions in ${interaction.guild.name}`)
    .setDescription(`> To work properly, ${client.user} needs **all** of the following permissions:\n${codeBlock(permissionsText.join("\n"))}`)
    .setTimestamp()
    .setFooter({
     text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({
      size: 256,
     }),
    });
   return interaction.followUp({ embeds: [embed] });
  } catch (err) {
   client.errorMessages.internalError(interaction, err);
  }
 },
} satisfies SlashCommand;
