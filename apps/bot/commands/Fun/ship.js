import { percentageBar } from "@majoexe/util/functions";
import { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } from "discord.js";

export default {
 name: "ship",
 description: "❤️ Ship users together",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 dm_permission: true,
 usage: "/ship <user1> <user2>",
 options: [
  {
   name: "first",
   description: "The first user to ship",
   type: ApplicationCommandOptionType.User,
   required: true,
  },
  {
   name: "second",
   description: "The second user to ship",
   type: ApplicationCommandOptionType.User,
   required: true,
  },
 ],
 run: async (client, interaction, guildSettings) => {
  try {
   const first = interaction.options.getUser("first");
   const second = interaction.options.getUser("second");

   if (!first || !second) {
    return client.errorMessages.createSlashError(interaction, "❌ You need to specify two users to ship");
   }

   if (first.id === second.id) {
    return client.errorMessages.createSlashError(interaction, "❌ You can't ship the same user with themselves");
   }

   const ship = Math.floor(Math.random() * 100) + 1;

   const embed = new EmbedBuilder()
    .setTitle(`❤️ Shipping ${first.globalName || first.username} and ${second.globalName || second.username}`)
    .setDescription(` **${ship > 50 ? "🔥 They are born for each other!" : "❄️ This isn't a match"}**\n\n${percentageBar(100, ship, 20)}`)
    .setTimestamp()
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setFooter({
     text: `Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
     iconURL: interaction.member.user.displayAvatarURL({
      size: 256,
     }),
    });

   ship > 50 ? embed.setThumbnail("https://cdn.discordapp.com/emojis/797365365595439104.gif?v=1") : embed.setThumbnail("https://cdn.discordapp.com/emojis/853644938867769454.gif?v=1");

   interaction.followUp({ embeds: [embed] });
  } catch (err) {
   client.errorMessages.internalError(interaction, err);
  }
 },
};
