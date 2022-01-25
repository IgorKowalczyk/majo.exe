const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const ms = require("ms");

module.exports = {
 name: "remind",
 aliases: ["reminder", "remindme", "remind-me"],
 description: "Reminds you at the specified time of the specified thing.",
 category: "Utility",
 usage: "remind <time>",
 run: async (client, message, args) => {
  try {
   if (!args[0]) {
    return client.createError(message, `${client.bot_emojis.error} | You need to enter time to set reminder!\n\n**Usage:** \`${client.prefix} remind <time>\``);
   }
   if (!args[0].endsWith("h") && !args[0].endsWith("m")) {
    return client.createError(message, `${client.bot_emojis.error} | You didn't use the correct formatting for the time!\n\n**Correct formatting:** \`number<h/m>\`.\n**Legend:** \`h\` - Hour/s, \`m\` - Minute/s\n**Usage:** \`${client.prefix} remind <time>\``);
   }
   if (!args[1]) {
    return client.createError(message, `${client.bot_emojis.error} | You need to enter reminder text!\n\n**Usage:** \`${client.prefix} remind <time>\``);
   }
   const reminder = args.slice(1).join(" ");
   let reminder_date = new Date(new Date().getTime() + ms(args[0]));
   const embed = new MessageEmbed()
    .setColor("GREEN")
    .setTimestamp()
    .setFooter({ text: `After ${args[0]} I'll send you dm! • Requested by ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }) })
    .setDescription(`${client.bot_emojis.success} | Reminder for \`${reminder}\` has been set! I will remind you <t:${moment(reminder_date).unix()}:R>`);
   message.reply({ embeds: [embed] });
   setTimeout(function () {
    const reminder_embed = new MessageEmbed() // Prettier
     .setColor("#4f545c")
     .setAuthor({ name: `${client.bot_emojis.stopwatch} Reminder!` })
     .setDescription(`\`${reminder}\``)
     .setThumbnail(message.author.displayAvatarURL())
     .setFooter(message.author.username, message.author.displayAvatarURL())
     .setTimestamp();
    message.author.send({ embeds: [reminder_embed] });
   }, ms(args[0]));
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
