import { ApplicationCommandType, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import fetch from "node-fetch";
import type { Majobot } from "../..";
import type { GuildSettings } from "../../util/types/Command";

interface Joke {
 type: string;
 setup: string;
 punchline: string;
 id: number;
}

export default {
 name: "joke",
 description: "😂 Get a random joke",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 dm_permission: true,
 usage: "/joke",
 run: async (client: Majobot, interaction: ChatInputCommandInteraction, guildSettings: GuildSettings) => {
  try {
   const joke = await fetch("https://official-joke-api.appspot.com/random_joke");
   if (!joke.ok) return client.errorMessages.createSlashError(interaction, "❌ No jokes found! Please try again later.");

   const json = (await joke.json()) as Joke;

   if (!json || !json.setup || !json.punchline) {
    return client.errorMessages.createSlashError(interaction, "❌ No jokes found! Please try again later.");
   }

   const embed = new EmbedBuilder()
    .setTitle("😂 Joke")
    .setDescription(`>>> **${json.setup}**\n\n${json.punchline}`)
    .setTimestamp()
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setThumbnail(interaction.user.displayAvatarURL({ size: 256 }))
    .setFooter({
     text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({ size: 256 }),
    });
   return interaction.followUp({ embeds: [embed] });
  } catch (err) {
   client.errorMessages.internalError(interaction, err);
  }
 },
};
