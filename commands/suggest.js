const Discord = require('discord.js');
const config = require("../config");

module.exports = {
 name: "suggest",
 aliases: [],
 description: "Suggest feature in bot",
 category: "General",
 usage: "suggest <suggestion>",
 run: async (client, message, args) => {
  try {
   if(!args[0]) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "❌ | You need to enter a suggestion!",
    }})  
   }
   if(args.join(" ") > 1000) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "❌ | Your suggestion can have a maximum of 1000 characters!",
    }})
   }
   const channel = client.channels.cache.get(config.suggestionschannel)
   if (channel) {
    const embed = new Discord.MessageEmbed()
     .setAuthor("🤔" + message.author.username + " suggestion!", message.guild.iconURL())
     .setColor("RANDOM")
     .setDescription(message.args)
     .addField("Reporter", `<@${message.author.id}> (ID: ${message.author.id})`)
     .addField("User guild", `${message.guild.name} (ID: ${message.guild.id})`)
     .setFooter("Majo.exe", message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
     .setThumbnail(message.guild.iconURL())
    channel.send(embed);
    const success = new Discord.MessageEmbed()
     .setColor("RANDOM")
     .setDescription(`${message.author} your suggestion was send, you can view it in Majo.exe Developers server in <#${suggestionschannel} channel.`)
     .setFooter(`[Majo.exe Developers](${config.server})`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
   } else {
    return message.channel.send({embed: {
     color: 16734039,
     description: "❌ | I can't find suggestions channel. Mayby the channel didn't exist. If you are the bot developer please configure it in config.",
    }})
   }
  } catch (err) {
   message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
  