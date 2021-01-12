const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");
const config = require("../config");
const prefix = config.prefix;

module.exports = {
 name: "buy",
 aliases: [],
 description: "Buy item from shop, add a `list` arg to display all things",
 category: "Economy",
 usage: "buy <item>",
 run: async (client, message, args) => {
  try {
   let user = message.author;
   let author = db.fetch(`money_${message.guild.id}_${user.id}`)
   if (args[0] == 'bronze') {
    if (author < 3500) {
     const bronzeerror = new Discord.MessageEmbed()
      .setTitle("Error!", message.guild.iconURL({ dynamic: true, format: 'png'}))
      .setColor(16734039)
      .setDescription(`You need 3500 coins to purchase Bronze VIP`)
      .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
     return message.channel.send(bronzeerror);
    }
    db.fetch(`bronze_${message.guild.id}_${user.id}`);
    db.set(`bronze_${message.guild.id}_${user.id}`, true)
    const bronzesuccess = new Discord.MessageEmbed()
     .setTitle("Succes!", message.guild.iconURL({ dynamic: true, format: 'png'}))
     .setColor("RANDOM")
     .setDescription(`:white_check_mark:  Purchased Bronze VIP For 3500 Coins`)
     .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
    db.subtract(`money_${message.guild.id}_${user.id}`, 3500)
    message.channel.send(bronzesuccess)
   // -------- \\
   } else if(args[0] == 'nikes') {
    if (author < 600) {
     const nikeserror = new Discord.MessageEmbed()
      .setTitle("Error!", message.guild.iconURL({ dynamic: true, format: 'png'}))
      .setColor(16734039)
      .setDescription(`You need 600 coins to purchase some Nikes`)
      .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
     return message.channel.send(nikeserror);
    }
    db.fetch(`nikes_${message.guild.id}_${user.id}`)
    db.add(`nikes_${message.guild.id}_${user.id}`, 1)
    const nikessuccess = new Discord.MessageEmbed()
     .setTitle("Succes!", message.guild.iconURL({ dynamic: true, format: 'png'}))
     .setColor("RANDOM")
     .setDescription(`:white_check_mark:  Purchased Fresh Nikes For 600 Coins`)
     .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
    db.subtract(`money_${message.guild.id}_${user.id}`, 600)
    message.channel.send(Embed3)
    // -------- \\
   } else if(args[0] == 'car') {
    if (author < 800) {
     const carerror = new Discord.MessageEmbed()
     .setTitle("Error!", message.guild.iconURL({ dynamic: true, format: 'png'}))
     .setColor(16734039)
     .setDescription(`You need 800 coins to purchase a new car`)
     .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
     return message.channel.send(carerror);
    }
    db.fetch(`car_${message.guild.id}_${user.id}`)
    db.add(`car_${message.guild.id}_${user.id}`, 1)
    const carsuccess = new Discord.MessageEmbed()
     .setTitle("Succes!", message.guild.iconURL({ dynamic: true, format: 'png'}))
     .setColor("RANDOM")
     .setDescription(`:white_check_mark:  Purchased a New Car For 800 Coins`)
     .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
    db.subtract(`money_${message.guild.id}_${user.id}`, 800)
    message.channel.send(carsuccess)
    // -------- \\
   } else if(args[0] == 'mansion') {
    if (author < 1200) {
     const mansionerror = new Discord.MessageEmbed()
      .setTitle("Error!", message.guild.iconURL({ dynamic: true, format: 'png'}))
      .setColor(16734039)
      .setDescription(` You need 1200 coins to purchase a Mansion`)
      .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
     return message.channel.send(mansionerror);
    }
    db.fetch(`house_${message.guild.id}_${user.id}`)
    db.add(`house_${message.guild.id}_${user.id}`, 1)
    const mansionsuccess = new Discord.MessageEmbed()
     .setTitle("Succes!", message.guild.iconURL({ dynamic: true, format: 'png'}))
     .setColor("RANDOM")
     .setDescription(`:white_check_mark: Purchased a Mansion For 1200 Coins`)
     .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
    db.subtract(`money_${message.guild.id}_${user.id}`, 1200)
    message.channel.send(Embed3)
   // -------- \\
	 } else if(args[0] == 'list') {
    const list = new Discord.MessageEmbed()
     .setColor("RANDOM")
     .setTitle("List of all items you have to buy:")
     .addField("Bronze", "Cost: 3500 coins")
	   .addField("Nikes", "Cost: 600 coins")
  	 .addField("Car", "Cost: 800 coins")
		 .addField("Mansion", "Cost: 1200 coins")
    message.channel.send(list)
   // -------- \\
   } else {
    const noitem = new Discord.MessageEmbed()
     .setColor("FF5757")
     .setTitle("Enter an item to buy, type `" + `${prefix}` + " buy list` to show all things")
    message.channel.send(noitem)
   }
 } catch (err) {
  message.channel.send({embed: {
   color: 16734039,
   description: "Something went wrong... :cry:"
  }})
 }
 }
}
