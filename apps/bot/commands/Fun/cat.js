import { ApplicationCommandType, EmbedBuilder } from "discord.js";

export default {
 name: "cat",
 description: "🐱 Get a random cat image",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 dm_permission: true,
 usage: "/cat",
 run: async (client, interaction, guildSettings) => {
  try {
   const data = await fetch("https://api.thecatapi.com/v1/images/search");
   const json = await data.json();

   if (!json || !json[0]) {
    return client.errorMessages.createSlashError(interaction, "❌ No results found.");
   }

   const embed = new EmbedBuilder()
    .setTitle("🐱 Meow!")
    .setImage(json[0].url)
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setTimestamp()
    .setFooter({
     text: `Requested by ${interaction.member.user.username}`,
     iconURL: interaction.member.user.displayAvatarURL({ size: 256 }),
    });
   return interaction.followUp({ embeds: [embed] });
  } catch (err) {
   client.errorMessages.internalError(interaction, err);
  }
 },
};
