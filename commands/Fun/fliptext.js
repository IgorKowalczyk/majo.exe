const { MessageEmbed } = require("discord.js");
const flip = require("flip-text");

module.exports = {
 name: "fliptext",
 aliases: [],
 description: "Flip some text",
 category: "Fun",
 usage: "fliptext <text>",
 run: async (client, message, args) => {
  try {
   if (!args[0]) {
    return client.createError(message, `${client.bot_emojis.error} | You must provide a text!\n\n**Usage:** \`${client.prefix} fliptext <text>\``);
   }
   if (args.lenght > 50) {
    return client.createError(message, `${client.bot_emojis.error} | The text can't be longer than 50 characters!`);
   }
   let flipped = [];
   args.forEach((arg) => {
    flipped.push(flip(arg));
   });
   const embed = new MessageEmbed() // Prettier
    .setColor("RANDOM")
    .addField(`${client.bot_emojis.reverse_motherfucker} | Flipped text`, "```" + flipped.join(" ") + "```")
    .setFooter(
     `Requested by ${message.author.username}`,
     message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    )
    .setTimestamp();
   await message.reply({ embeds: [embed] });
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
