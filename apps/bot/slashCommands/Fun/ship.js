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

   if (first?.id === second?.id) {
    const embed = new EmbedBuilder()
     .setColor("#EF4444")
     .setTimestamp()
     .setTitle("❌ Invalid users")
     .setDescription("> You can't ship the same user with themselves")
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

   const ship = Math.floor(Math.random() * 100) + 1;

   const embed = new EmbedBuilder()
    .setTitle(`❤️ Shipping ${first?.username} and ${second?.username}`)
    .setDescription(` **${ship > 50 ? "🔥 They are born for each other!" : "❄️ This isn't a match"}**\n\n${percentageBar(100, ship, 20)}`)
    .setTimestamp()
    .setColor(guildSettings?.embedColor || client.config.global.defaultColor)
    .setFooter({
     text: `Requested by ${interaction.member?.user?.username}`,
     iconURL: interaction.member?.user?.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    });

   if (ship > 50) {
    embed.setThumbnail("https://cdn.discordapp.com/emojis/797365365595439104.gif?v=1");
   } else {
    embed.setThumbnail("https://cdn.discordapp.com/emojis/853644938867769454.gif?v=1");
   }

   interaction.followUp({ embeds: [embed] });
  } catch (err) {
   client.errorMessages.generateErrorMessage(interaction, err);
  }
 },
};
