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
    description: "You did not specify your time!\nCorrect formatting: \`number<d/h/m>\`.\nLegend: \`d\` - Day, \`h\` - Hour/s, \`m\` - Minute/s"
   }})
  }
  if (!args[0].endsWith("d") && !args[0].endsWith("h") && !args[0].endsWith("m")) {
   return message.channel.send({embed: {
    color: 16734039,
    description: "You did not use the correct formatting for the time!\nCorrect formatting: \`number<d/h/m>\`.\nLegend: \`d\` - Day, \`h\` - Hour/s, \`m\` - Minute/s"
   }})
  }
  if (isNaN(args[0][0])) {
   return message.channel.send({embed: {
    color: 16734039,
    description: "You did not specify your time!\nCorrect formatting: \`number<d/h/m>\`.\nLegend: \`d\` - Day, \`h\` - Hour/s, \`m\` - Minute/s"
   }})
  }
  let channel = message.mentions.channels.first();
  if (!channel) {
   return message.channel.send({embed: {
    color: 16734039,
    description: "You must provide a channel in the guild to create giveaway!"
   }})
  }
  let prize = args.slice(2).join(" ");
  if (!prize) {
   return message.channel.send({embed: {
    color: 16734039,
    description: "No prize specified!"
   }})
  }
  let success = new Discord.MessageEmbed()
   .setColor("RANDOM")
   .setDescription: ("Giveaway created in " + `channel` + "!")
   .setFooter("This message will be deleted after 10 seconds")
  message.channel.send(success).then(m => m.delete({timeout: 10000}))
  let embed = new Discord.MessageEmbed()
   .setTitle(":tada: New giveaway! :tada:")
   .setDescription("The user " + `message.author` + " is hosting a giveaway for the prize of **" + `prize` + "**")
   .setTimestamp(Date.now() + ms(args[0]))
   .setFooter("The giveaway will end in **" + `args[0]` + "**!")
   .setColor("RANDOM");
  let m = await channel.send(embed);
  m.react("🎉");
  setTimeout(() => {
   if (m.reactions.cache.get("🎉").count <= 1) {
   return message.channel.send({embed: {
    color: 16734039,
    title: "Not enough people reacted for me to start draw a winner!",
    description: "Reactions: " + `m.reactions.cache.get("🎉").count` + "!"
   }})
   }
   let winner = m.reactions.cache.get("🎉").users.cache.filter((u) => !u.bot).random();
    channel.send({embed: {
     color: 16734039,
     description: ":tada: The winner of the giveaway for **" + `prize` + "** is " + `winner` + "! :tada:"
   }})
  }, ms(args[0]));
 }
}
