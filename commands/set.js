const Discord = require("discord.js")
const db = require("quick.db")
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args) => {
if (message.member.hasPermission("ADMINISTRATOR")) {
if (args[0] == 'welcome') {
    let channel = message.mentions.channels.first()
    
    if(!channel) {
      return message.channel.send({embed: {
                    color: 16734039,
                    description: "You must mention a channel to set!"
                }})
    }
    
    db.set(`welchannel_${message.guild.id}`, channel.id)
    
	let embed = new Discord.RichEmbed()
    .setColor("#FFFFFF")
    .setDescription(`Welcome Channel is seted as ${channel} (Note: If you have a channel named "hello-or-bye" the welcome messages will be send it in.)`);
    message.channel.send(embed)
  } else if(args[0] == 'bye') {
	  
	let channel = message.mentions.channels.first()
    
    if(!channel) {
      return message.channel.send({embed: {
                    color: 16734039,
                    description: "You must mention a channel to set!"
                }})
    }
    
    db.set(`byechannel_${message.guild.id}`, channel.id)
    
	let embed = new Discord.RichEmbed()
    .setColor("#FFFFFF")
  .setDescription(`Bye Channel is seted as ${channel} (Note: If you have a channel named "hello-or-bye" the bye messages will be send it in.)`);
    message.channel.send(embed)

  } else if(args[0] == 'log') {
    let log = message.guild.channels.find("name", "log")  
    if(log) return message.channel.send({embed: {
                    color: 16734039,
                    description: "The channel #log is already exist!"
                }})

    if(!log) {   
		var name = "log";
 message.guild.createChannel(name, { type: "text" }).then(
  (chan) => {
  chan.overwritePermissions(message.guild.id, {
     'SEND_MESSAGES': false
  })
  }
)}
  let success = new Discord.RichEmbed()
  .setDescription("The channel has been created and the channel logs is #logs")
  .setColor("RANDOM")
  .setTimestamp()
  message.channel.send(success);
  } else if(args[0] == 'list') {
	let list = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle("List of all values to set")
     	.addField("Welcome", "Set a welcome channel. Usage " + `${prefix}` + " set welcome <channel>")
        .addField("Bye", "Set a bye channel. Usage " + `${prefix}` + " set bye <channel>")
		.addField("Logs", "Set a logs channel. Usage " + `${prefix}` + " set log <channel>")
		message.channel.send(list) 
  } else {
        let embed = new Discord.RichEmbed()
        .setColor("FF5757")
        .setDescription("Enter a value to set, type " + `${prefix}` + " set list to show all values")
        message.channel.send(embed)
    }

 } else {
	message.channel.send({embed: {
                    color: 16734039,
                    description: "You don't have premissions to set config!"
                }})
	}
}

module.exports.help = {
    name: "set",
    description: "Set a config var, Eg. welcome, bye, logs channel",
    usage: "set <welcome/bye/log> <channel>",
    type: "Moderation" 
}