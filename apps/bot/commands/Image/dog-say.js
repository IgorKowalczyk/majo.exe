import { getLines } from "@nyxia/util/images";
import { loadImage, createCanvas } from "@napi-rs/canvas";
import { ApplicationCommandType, ApplicationCommandOptionType, AttachmentBuilder, EmbedBuilder } from "discord.js";

export default {
 name: "dog-say",
 description: "🐶 Make a dog say something, oh...",
 type: ApplicationCommandType.ChatInput,
 cooldown: 5000,
 dm_permission: false,
 usage: "/dog-say [text]",
 options: [
  {
   name: "text",
   description: "Text to say",
   type: ApplicationCommandOptionType.String,
   required: true,
   max_length: 55,
  },
 ],
 run: async (client, interaction, guildSettings) => {
  try {
   const text = interaction.options.getString("text");

   const background = await loadImage("./util/images/files/dog.png");
   const canvas = createCanvas(background.width, background.height);
   const context = canvas.getContext("2d");
   context.drawImage(background, 0, 0, canvas.width, canvas.height);

   const fontSize = 32;

   context.font = `${fontSize}px 'Arial'`;
   context.fillStyle = "#000000";

   context.translate(350, 50);
   const lines = getLines(context, text, 275);

   for (let i = 0; i < lines.length; i++) {
    context.fillText(lines[i], 0, i * fontSize);
   }

   const file = new AttachmentBuilder(canvas.toBuffer("image/png"), {
    name: "dog-say.png",
   });

   const embed = new EmbedBuilder()
    .setTitle("🐶 Dog Say")
    .setImage("attachment://dog-say.png")
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setTimestamp()
    .setFooter({
     text: `Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
     iconURL: interaction.member.user.displayAvatarURL({
      size: 256,
     }),
    });

   return interaction.followUp({ embeds: [embed], files: [file] });
  } catch (err) {
   console.log(err);
   client.errorMessages.internalError(interaction, err);
  }
 },
};
