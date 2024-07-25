import { ApplicationCommandType, EmbedBuilder, PermissionsBitField, codeBlock } from "discord.js";

function convertCamelCaseToWords(text) {
 return text.replace(/([A-Z])/g, " $1").replace(/^./, (str) => {
  return str.toUpperCase().trim();
 });
}

export default {
 name: "permissions",
 description: "🛠️ Check Nyxia's permissions in your server",
 type: ApplicationCommandType.ChatInput,
 cooldown: 5000,
 dm_permission: false,
 usage: "/permissions",
 run: async (client, interaction, guildSettings) => {
  try {
   const clientMember = interaction.guild.members.cache.get(client.user.id);
   const requiredPermissions = new PermissionsBitField(client.config.permissions);

   const permissionsText = requiredPermissions.toArray().map((permission) => {
    const hasPermission = clientMember.permissions.has(permission);
    const permissionName = convertCamelCaseToWords(permission.replace(/_/g, " "));

    return `${hasPermission ? "✅" : "❌"} ${permissionName}`;
   });

   const embed = new EmbedBuilder()
    .setColor(guildSettings.embedColor || client.config.defaultColor)
    .setTimestamp()
    .setTitle(`🛠️ Permissions in ${interaction.guild.name}`)
    .setDescription(`> To work properly, ${client.user} needs **all** of the following permissions:\n${codeBlock(permissionsText.join("\n"))}`)
    .setTimestamp()
    .setFooter({
     text: `Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
     iconURL: interaction.member.user.displayAvatarURL({
      size: 256,
     }),
    });
   return interaction.followUp({ ephemeral: false, embeds: [embed] });
  } catch (err) {
   client.errorMessages.internalError(interaction, err);
  }
 },
};
