const Discord = require("discord.js");
const ms = require("ms");

module.exports = {
 name: "giveaway",
 aliases: [],
 description: "Create a giveaway",
 category: 'Utility',
 usage: "giveaway <time> <channel> <prize>",
 run: async (client, message, args) => {
  try {
   if (!args[0]) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "❌ | You did not specify your time!\nCorrect formatting: \`number<d/h/m>\`.\nLegend: \`d\` - Day, \`h\` - Hour/s, \`m\` - Minute/s"
    }})
   }
   if (!args[0].endsWith("d") && !args[0].endsWith("h") && !args[0].endsWith("m")) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "❌ | You didn't use the correct formatting for the time!\nCorrect formatting: \`number<d/h/m>\`.\nLegend: \`d\` - Day, \`h\` - Hour/s, \`m\` - Minute/s"
    }})
   }
   if (isNaN(args[0][0])) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "❌ | You didn't specify your time!\nCorrect formatting: \`number<d/h/m>\`.\nLegend: \`d\` - Day, \`h\` - Hour/s, \`m\` - Minute/s"
    }})
   }
   let channel = message.mentions.channels.first();
   if (!channel) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "❌ | You didn't enter a channel!\nYou must provide a channel in the guild to create giveaway!"
    }})
   }
   let prize = args.slice(2).join(" ");
   if (!prize) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "❌ | You must enter a prize to start giveaway!",
    }})
   }
   const endembed = new Discord.MessageEmbed()
    .setTitle(":tada: GIVEAWAY ENDED! :tada:")
    .setDescription("The giveaway for prize of **" + `${prize}` + "** ended!")
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter("Requested by " + `${message.author.username}` + " The giveaway ended at", message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }));
   const success = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(":white_check_mark: Success!", message.guild.iconURL({ dynamic: true, format: 'png'}))
    .setDescription(":tada: Giveaway created in " + `${channel}` + "!")
    .setFooter("This message will be deleted after 10 seconds", message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
   message.channel.send(success).then(m => m.delete({timeout: 10000}))
   const embed = new Discord.MessageEmbed()
    .setTitle(":tada: New giveaway! :tada:", message.guild.iconURL({ dynamic: true, format: 'png'}))
    .setDescription("The user " + `${message.author}` + " is hosting a giveaway for the prize of **" + `${prize}` + "**\n*React to this message with :tada: emoji to enter the giveaway!*")
    .setTimestamp(Date.now() + ms(args[0]))
    .setFooter("Requested by " + `${message.author.username}` + " • The giveaway will end in " + `${args[0]}` + "!", message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
    .setColor("RANDOM");
   let m = await channel.send(embed)
   m.react("🎉")
   setTimeout(() => {
    m.edit(endembed);
    if (m.reactions.cache.get("🎉").count <= 1) {
    return channel.send({embed: {
     color: 16734039,
     description: "❌ | Not enough people reacted for me to start draw a winner! (" + `${m.reactions.cache.get("🎉").count}` + " reactions)",
    }})
    }
    let winner = m.reactions.cache.get("🎉").users.cache.filter((u) => !u.bot).random();
    const end = new Discord.MessageEmbed()
     .setColor("RANDOM")
     .setDescription(":tada: The winner of the giveaway for **" + `${prize}` + "** is " + `${winner}` + "! :tada:")
    return channel.send(end);
   }, ms(args[0]));
  } catch (err) {
   message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
