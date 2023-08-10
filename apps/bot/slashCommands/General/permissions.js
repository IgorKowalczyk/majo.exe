import { ApplicationCommandType, EmbedBuilder, codeBlock } from "discord.js";

function convertCamelCaseToWords(text) {
 return text.replace(/([A-Z])/g, " $1").replace(/^./, (str) => {
  return str.toUpperCase().trim();
 });
}

export default {
 name: "permissions",
 description: "🎛️ Check Majo.exe's permissions in your server",
 type: ApplicationCommandType.ChatInput,
 cooldown: 5000,
 dm_permission: false,
 usage: "/permissions",
 run: async (client, interaction, guildSettings) => {
  try {
   const clientMember = interaction.guild?.members.cache.get(client.user?.id);
   const permissions = clientMember?.permissions.toArray();
   const words = permissions.map((permission) => convertCamelCaseToWords(permission));

   const embed = new EmbedBuilder()
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setTimestamp()
    .setTitle(`🎛️ Permissions in ${interaction.guild?.name}`)
    .setDescription(`> **${client.user?.username}** has the following permissions in this server:\n${codeBlock(words?.join("\n"))}`)
    .setTimestamp()
    .setFooter({
     text: `Requested by ${interaction.member?.user?.username}`,
     iconURL: interaction.member?.user?.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    });
   return interaction.followUp({ ephemeral: false, embeds: [embed] });
  } catch (err) {
   client.errorMessages.generateErrorMessage(interaction, err);
  }
 },
};
