const Discord = require("discord.js")
const db = require("quick.db")

module.exports.run = async (client, message, args) => {
	
if (args[0] == 'welcome') {
    let channel = message.mentions.channels.first()
    
    if(!channel) {
      return message.channel.send({embed: {
                    color: 16734039,
                    title: "You must mention a channel to set!"
                }})
    }
    
    db.set(`welchannel_${message.guild.id}`, channel.id)
    
	let embed = new Discord.RichEmbed()
    .setColor("#FFFFFF")
    .setDescription(`Welcome Channel is seted as ${channel}`);
    message.channel.send(embed)
  } else if(args[0] == 'bye') {
	  
	let channel = message.mentions.channels.first()
    
    if(!channel) {
      return message.channel.send({embed: {
                    color: 16734039,
                    title: "You must mention a channel to set!"
                }})
    }
    
    db.set(`byechannel_${message.guild.id}`, channel.id)
    
	let embed = new Discord.RichEmbed()
    .setColor("#FFFFFF")
    .setDescription(`Bye Channel is seted as ${channel}`);
    message.channel.send(embed)
  }
}

module.exports.help = {
    name: "setwelcome",
    description: "Set welcome channel",
    usage: "setwelcome <channel>",
    type: "General" 
}