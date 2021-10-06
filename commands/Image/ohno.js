const { MessageEmbed, MessageAttachment } = require("discord.js");
const canvacord = require("canvacord");

module.exports = {
 name: "ohno",
 aliases: [],
 description: "Oh no! It's stupid!",
 category: "Image",
 usage: "ohno <text>",
 run: async (client, message, args) => {
  try {
   if (!args[0]) {
    return client.createError(message, `${client.bot_emojis.error} | You must enter a text!\n\n**Usage:** \`${client.prefix} ohno <text>\``);
   }
   if (args.join(" ") > 20) {
    return client.createError(message, `${client.bot_emojis.error} | Max lenght for the text is \`20\`!\n\n**Usage:** \`${client.prefix} ohno <text>\``);
   }
   const wait = new MessageEmbed() // Prettier
    .setColor("#5865f2")
    .setDescription(`${client.bot_emojis.loading} Please wait... I'm generating your image`);
   message.reply({ embeds: [wait] }).then((msg) => {
    (async () => {
     const ohno = await canvacord.Canvas.ohno(args.join(" "));
     const attachment = new MessageAttachment(ohno, "ohno.png");
     msg.edit({ embeds: [], files: [attachment] });
    })();
   });
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
