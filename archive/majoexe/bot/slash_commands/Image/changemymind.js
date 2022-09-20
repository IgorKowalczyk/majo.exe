const { MessageEmbed, MessageAttachment } = require("discord.js");
const canvacord = require("canvacord");

module.exports = {
 name: "changemymind",
 description: "📝 Try to change my mind! Oh no! You can't",
 category: "Image",
 usage: "/changemymind <text>",
 options: [
  {
   name: "text",
   description: "Text to be placed on the photo",
   type: 3,
   required: true,
  },
 ],
 run: async (client, interaction, args) => {
  try {
   if (!args[0]) {
    return client.createSlashError(interaction, `${client.bot_emojis.error} | You must enter a text!`);
   }
   if (args.toString().length > client.max_input) {
    return client.createSlashError(interaction, `${client.bot_emojis.error} | Text can't be longer than \`${client.max_input}\` characters!`);
   }
   const wait = new MessageEmbed() // Prettier
    .setColor("#5865f2")
    .setDescription(`${client.bot_emojis.loading} | Please wait... I'm generating your image`);
   interaction.followUp({ embeds: [wait] }).then((msg) => {
    (async () => {
     const changemymind = await canvacord.Canvas.changemymind(args.join(" "));
     const attachment = new MessageAttachment(changemymind, "changemymind.png");
     msg.edit({ embeds: [], files: [attachment] });
    })();
   });
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
