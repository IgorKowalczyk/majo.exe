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
    return message.channel.send({embed: {
     color: 16734039,
     description: "You don't have premission to prune messages!"
    }}).then(m => m.delete({timeout: 5000}))
    await message.delete({timeout: 5000})
   }
   if (isNaN(args[0])) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "Please input a vaild number!"
    }}).then(m => m.delete({timeout: 5000}))
    await message.delete({timeout: 5000})
   }
   if (args[0] > 100) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "Insert the number less than 100!"
    }}).then(m => m.delete({timeout: 5000}))
    await message.delete({timeout: 5000})
   }
   if (args[0] < 2) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "Insert the number more than 1!"
    }}).then(m => m.delete({timeout: 5000}))
    await message.delete({timeout: 5000})
   }
   await message.delete()
   await message.channel.bulkDelete(args[0])
   .then(messages => {
	 message.channel.send({embed: {
      color: 16734039,
      description: `Deleted ${messages.size}/${args[0]} messages.`
	 }}).then(m => m.delete({timeout: 5000}))
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
