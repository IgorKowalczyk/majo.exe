const Discord = module.require("discord.js");
const prefix = process.env.PREFIX;

module.exports = {
 name: "prune",
 aliases: [],
 description: "Removes up to 100 messages",
 category: 'Moderation',
 usage: "prune <amount>",
 run: async (client, message, args) => {
  try {
   if (!message.member.hasPermission("MANAGE_MESSAGES") || !message.member.hasPermission("ADMINISTRATOR")) {
    let error = new Discord.MessageEmbed()
     .setColor("FF5757")
     .setDescription("You don't have premission to prune messages!")
     .setFooter("This message will be deleted after 3 seconds")
    message.channel.send(error).then(m => m.delete({timeout: 3000}))
    return message.delete({timeout: 3000})
   }
   if (isNaN(args[0])) {
    let error = new Discord.MessageEmbed()
     .setColor("FF5757")
     .setDescription("Please input a vaild number!")
     .setFooter("This message will be deleted after 3 seconds")
    message.channel.send(error).then(m => m.delete({timeout: 3000}))
    return message.delete({timeout: 3000})
   }
   if (args[0] > 100) {
    let error = new Discord.MessageEmbed()
     .setColor("FF5757")
     .setDescription("Insert the number less than 100!")
     .setFooter("This message will be deleted after 3 seconds")
    message.channel.send(error).then(m => m.delete({timeout: 3000}))
    return message.delete({timeout: 3000})
   }
   if (args[0] < 2) {
    let error = new Discord.MessageEmbed()
     .setColor("FF5757")
     .setDescription("Insert the number more than 1!")
     .setFooter("This message will be deleted after 3 seconds")
    message.channel.send(error).then(m => m.delete({timeout: 3000}))
    return message.delete({timeout: 3000})
   }
   await message.delete()
   await message.channel.bulkDelete(args[0])
   .then(messages => {
    let error = new Discord.MessageEmbed()
     .setColor("RANDOM")
     .setDescription("Deleted ${messages.size}/${args[0]} messages.")
     .setFooter("This message will be deleted after 3 seconds")
    return message.channel.send(error).then(m => m.delete({timeout: 3000}))
   })
  } catch(err) {
   message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
  }})
  console.log(err)
  }
 }
}
