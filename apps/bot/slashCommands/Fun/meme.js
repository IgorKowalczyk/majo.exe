import { ApplicationCommandType, EmbedBuilder } from "discord.js";
import fetch from "node-fetch";

export default {
 name: "meme",
 description: "😂 Get a random meme",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 dm_permission: true,
 usage: "/meme",
 run: async (client, interaction, guildSettings) => {
  // get joke from reddit api (dankmemes)
  try {
   const meme = await fetch("https://reddit.com/r/dankmemes/random/.json");
   const json = await meme.json();

   if (!json || !json[0] || !json[0].data || !json[0].data.children || !json[0].data.children[0] || !json[0].data.children[0].data || !json[0].data.children[0].data.title || !json[0].data.children[0].data.url) {
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
    .setTitle(json[0].data.children[0].data.title)
    .setImage(json[0].data.children[0].data.url)
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
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
