const Discord = require("discord.js");
const ms = require("ms");

module.exports = {
 name: "giveaway",
 aliases: [],
 description: "Create a giveaway",
 category: 'Utility',
 usage: "giveaway <time> <channel> <prize>",
 run: async (client, message, args) => {
  if (!args[0]) {
   return message.channel.send({embed: {
    color: 16734039,
    description: "You did not specify your time!\nCorrect formatting: \`number<d/h/m>\`. Legend: \`d\` - Day, \`h\` - Hour/s, \`m\` - Minute/s"
   }})
  }
  if (!args[0].endsWith("d") && !args[0].endsWith("h") && !args[0].endsWith("m")) {
   return message.channel.send({embed: {
    color: 16734039,
    description: "You did not use the correct formatting for the time!\nCorrect formatting: \`number<d/h/m>\`. Legend: \`d\` - Day, \`h\` - Hour/s, \`m\` - Minute/s"
   }})
  }
  if (isNaN(args[0][0])) {
   return message.channel.send({embed: {
    color: 16734039,
    description: "You did not specify your time!\nCorrect formatting: \`number<d/h/m>\`. Legend: \`d\` - Day, \`h\` - Hour/s, \`m\` - Minute/s"
   }})
  }
  let channel = message.mentions.channels.first();
  if (!channel) {
   return message.channel.send({embed: {
    color: 16734039,
    description: "I could not find that channel in the guild!"
   }})
  }
  let prize = args.slice(2).join(" ");
  if (!prize) {
   return message.channel.send({embed: {
    color: 16734039,
    description: "No prize specified!"
   }})
  }
  message.channel.send(`*Giveaway created in ${channel}*`);
  let embed = new MessageEmbed()
   .setTitle(`New giveaway!`)
   .setDescription(`The user ${message.author} is hosting a giveaway for the prize of **${prize}**`)
   .setTimestamp(Date.now() + ms(args[0]))
   .setColor(`RANDOM`);
  let m = await channel.send(embed);
  m.react("🎉");
  setTimeout(() => {
   if (m.reactions.cache.get("🎉").count <= 1) {
    message.channel.send(`Reactions: ${m.reactions.cache.get("🎉").count}`);
    return message.channel.send(`Not enough people reacted for me to start draw a winner!`);
   }
   let winner = m.reactions.cache.get("🎉").users.cache.filter((u) => !u.bot).random();
       channel.send(`The winner of the giveaway for **${prize}** is... ${winner}`);
  }, ms(args[0]));
 }
}
