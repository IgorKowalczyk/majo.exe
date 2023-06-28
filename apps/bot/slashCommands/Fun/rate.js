import { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } from "discord.js";

export default {
 name: "rate",
 description: "📈 Rate something",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 dm_permission: true,
 usage: "/rate (thing)",
 options: [
  {
   name: "thing",
   description: "Thing to rate",
   type: ApplicationCommandOptionType.String,
   required: true,
  },
 ],
 run: async (client, interaction) => {
  try {
   const thing = interaction.options.getString("thing");
   const rate = Math.floor(Math.random() * 100) + 1;

   let color;
   if (rate <= 100 && rate >= 90) {
    color = "#57F287";
   } else if (rate >= 50 && rate <= 89) {
    color = "#FFFF00";
   } else if (rate >= 0 && rate <= 49) {
    color = "#ED4245";
   }

   const embed = new EmbedBuilder()
    .setTitle("📈 Rating")
    .setDescription(`>>> **I rate ${thing} a ${rate}/100!**`)
    .setTimestamp()
    .setColor(color)
    .setThumbnail(
     interaction.member?.user?.displayAvatarURL({
      dynamic: true,
      format: "png",
     })
    )
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
