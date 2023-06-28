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
    const embed = new EmbedBuilder()
     .setColor("#EF4444")
     .setTimestamp()
     .setTitle("❌ Error")
     .setDescription("> No results found.")
     .setFooter({
      text: `Requested by ${interaction.member?.user?.username}`,
      iconURL: interaction.member?.user?.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     });
    return interaction.followUp({ ephemeral: true, embeds: [embed] });
   }

   const embed = new EmbedBuilder()
    .setTitle("🐱 Meow!")
    .setImage(json[0].url)
    .setColor(guildSettings?.embedColor || client.config.bot.defaultEmbedColor)
    .setTimestamp()
    .setFooter({
     text: `Requested by ${interaction.member?.user?.username}`,
     iconURL: interaction.member?.user?.displayAvatarURL({
      dynamic: true,
      format: "png",
     }),
    });
   return interaction.followUp({ embeds: [embed] });
  } catch (err) {
   client.errorMessages.generateErrorMessage(interaction, err);
  }
 },
};
