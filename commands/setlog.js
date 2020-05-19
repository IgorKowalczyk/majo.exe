const Discord = require("discord.js");

module.exports.run = (client, message, args) => {
if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send({embed: {
                    color: 16734039,
                    title: "Sorry, but you don't have access to set the logs."
                }})
				
    let log = message.guild.channels.find("name", "log")  
    if(log) return message.channel.send({embed: {
                    color: 16734039,
                    title: "The channel #log is already exist!"
                }})

    if(!log) {   
		var name = "log";
 message.guild.createChannel(name, { type: "text" }).then(
  (chan) => {
  chan.overwritePermissions(message.guild.id, {
     'SEND_MESSAGES': false
  })
  chan.setTopic('A log stream for @majo.exe')
  }
)}
  let success = new Discord.RichEmbed()
  .setTitle("The channel has been created and the channel logs is #logs")
  .setColor("RANDOM")
  .setTimestamp()
  message.channel.send(success);
}

module.exports.help = {
    name: "setlog",
    description: "Set a log channel",
    usage: "setlog",
    type: "Moderation"
}