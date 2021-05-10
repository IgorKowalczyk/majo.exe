const Discord = require("discord.js");

module.exports = {
 name: "greroll",
 aliases: ["giveaway-reroll"],
 description: "Reroll a giveaway",
 category: 'Utility',
 usage: "greroll <giveaway-id>",
 run: async (client, message, args) => {
  try {
   let giveaway = client.giveawaysManager.giveaways.find((g) => g.guildID === message.guild.id && g.prize === args.join(' ')) ||
   client.giveawaysManager.giveaways.find((g) => g.guildID === message.guild.id && g.messageID === args[0]);
   if (!giveaway) {
    return message.channel.send({embed: {
     color: 16734039,
     description: '❌ | Unable to find a giveaway for `'+ args.join(' ') +'`.'
    }})
   }
   const messageID = args[0];
   if(!messageID) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "❌ | Please enter a giveaway message ID"
    }})
   }
   client.giveawaysManager.reroll(messageID).then(() => {
    return message.channel.send({embed: {
     color: 16734039,
     description: '✨ | Success! Giveaway rerolled!'
    }})
   }).catch((err) => {
    return message.channel.send({embed: {
     color: 16734039,
     description: '❌ | No giveaway found for ' + messageID + ', please check and try again'
    }})
   })
  } catch (err) {
   message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
