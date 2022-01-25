const { MessageEmbed } = require("discord.js");

module.exports = {
 name: "eightball",
 aliases: ["8ball", "fortune"],
 description: "Tells you a fortune",
 category: "Fun",
 usage: "eightball <question>",
 run: async (client, message, args) => {
  try {
   if (!args) {
    return client.createError(message, `${client.bot_emojis.error} | You need to enter question :/\n\n**Usage:** \`${client.prefix} 8ball <question>\``);
   }
   if (args.toString().length > client.max_input) {
    return client.createError(message, `${client.bot_emojis.error} | Question can't be longer than \`${client.max_input}\` characters!\n\n**Usage:** \`${client.prefix} 8ball <question>\``);
   }
   const fortunes = ["Yes.", "It is certain.", "It is decidedly so.", "Without a doubt.", "Yes definelty.", "You may rely on it.", "As I see it, yes.", "Most likely.", "Outlook good.", "Signs point to yes.", "Reply hazy, try again.", "Ask again later.", "Better not tell you now...", "Cannot predict now.", "Concentrate and ask again.", "Don't count on it.", "My reply is no.", "My sources say no.", "Outlook not so good...", "Very doubtful."];
   const embed = new MessageEmbed() // Prettier
    .setDescription(`>>> ${fortunes[Math.floor(Math.random() * fortunes.length)]}`)
    .setTimestamp()
    .setAuthor({ name: client.bot_emojis.magic_ball })
    .setColor("RANDOM")
    .setFooter({
     text: `Requested by ${message.author.username}`,
     iconURL: message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    });
   await message.reply({ embeds: [embed] });
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
