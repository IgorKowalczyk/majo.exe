import { ApplicationCommandType, EmbedBuilder } from "discord.js";
import fetch from "node-fetch";

export default {
 name: "joke",
 description: "😂 Get a random joke",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 dm_permission: true,
 usage: "/joke",
 run: async (client, interaction, guildSettings) => {
  try {
   const joke = await fetch("https://official-joke-api.appspot.com/random_joke");
   const json = await joke.json();

   if (!json || !json.setup || !json.punchline) {
    return client.errorMessages.createSlashError(interaction, "❌ No results found.");
   }

   const embed = new EmbedBuilder()
    .setTitle("😂 Joke")
    .setDescription(`>>> **${json.setup}**\n\n${json.punchline}`)
    .setTimestamp()
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setThumbnail(interaction.member.user.displayAvatarURL({ size: 256 }))
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
