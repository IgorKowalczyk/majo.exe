const Discord = module.require("discord.js");
const Moment = require("moment-timezone");

module.exports.run = async (client, message, args) => {
  let messageid = args[0];
  
  if (!messageid || messageid.length < 0) 
    
        return message.channel.send({embed: {
            color: 3447003,
            description: "Specify a message id!"
        }})

  
  message.channel.fetchMessages().then((messages) => {
    if (!messages.has(messageid)) 
        return message.channel.send({embed: {
            color: 3447003,
            description: "Specify a vaild message id!"
        }})
    
    if (messages.has(messageid)) {
      let msg = messages.get(messageid);
      let createdAt = new Date(msg.createdTimestamp);
      
      let embed = new Discord.RichEmbed()
        .setAuthor(msg.author.username, msg.author.avatarURL)
        .setColor("3498db")
        .setDescription(msg.content)
        .setFooter(Moment(createdAt).tz('Europe/London').format('l, LT'))
      
      return message.channel.send(embed=embed);
    }
  });
}

module.exports.help = {
    name: "quote",
    description: "Quote a message",
    usage: "quote <id>",
    type: "Utility"   
}