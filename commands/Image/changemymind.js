const { MessageEmbed, MessageAttachment } = require("discord.js");
const canvacord = require("canvacord");

module.exports = {
 name: "changemymind",
 aliases: [],
 description: "Try to change my mind!",
 category: "Image",
 usage: "changemymind <text>",
 run: async (client, message, args) => {
  try {
   if (!args[0]) {
    return client.createError(message, `${client.bot_emojis.error} | You must enter a text!\n\n**Usage:** \`${client.prefix} changemymind <text>\``);
   }
   if (args.toString().length > client.max_input) {
    return client.createError(message, `${client.bot_emojis.error} | Text can't be longer than \`${client.max_input}\` characters!\n\n**Usage:** \`${client.prefix} changemymind <text>\``);
   }
   const wait = new MessageEmbed() // Prettier
    .setColor("#5865f2")
    .setDescription(`${client.bot_emojis.loading} | Please wait... I'm generating your image`);
   message.reply({ embeds: [wait] }).then((msg) => {
    (async () => {
     const changemymind = await canvacord.Canvas.changemymind(args.join(" "));
     const attachment = new MessageAttachment(changemymind, "changemymind.png");
     msg.edit({ embeds: [], files: [attachment] });
    })();
   });
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
