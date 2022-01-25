const { MessageEmbed } = require("discord.js");
const flip = require("flip-text");

module.exports = {
 name: "fliptext",
 aliases: ["flip-text"],
 description: "Flip some text",
 category: "Fun",
 timeout: 5000000,
 usage: "fliptext <text>",
 run: async (client, message, args) => {
  try {
   if (!args[0]) {
    return client.createError(message, `${client.bot_emojis.error} | You must provide a text!\n\n**Usage:** \`${client.prefix} fliptext <text>\``);
   }
   if (args.toString().length > client.max_input) {
    return client.createError(message, `${client.bot_emojis.error} | The text can't be longer than \`${client.max_input}\` characters!\n\n**Usage:** \`${client.prefix} fliptext <text>\``);
   }
   let flipped = [];
   args.forEach((arg) => {
    flipped.push(flip(arg));
   });
   const embed = new MessageEmbed() // Prettier
    .setColor("RANDOM")
    .addField(`${client.bot_emojis.reverse_motherfucker} | Flipped text`, "```" + flipped.join(" ") + "```")
    .setFooter({
     text: `Requested by ${message.author.username}`,
     iconURL: message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    })
    .setTimestamp();
   await message.reply({ embeds: [embed] });
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
