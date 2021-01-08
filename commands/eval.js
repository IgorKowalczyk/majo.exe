const Discord = require("discord.js");
const beautify = require("beautify")
const config = require("../config");
const prefix = config.prefix;

module.exports = {
 name: "eval",
 aliases: [],
 description: "Evaluates and runs JavaScript code",
 category: "Moderation",
 usage: "eval <code>",
 run: async (client, message, args) => {
  try {
   if(message.author.id !== "440200028292907048") {
    return message.channel.send({embed: {
     color: 16734039,
     description: "You do not have permission to run this command (Only owner of the bot can run this)!"
    }});
   }
   if(!args[0]) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "Please put the code to evaluate!"
    }});
   }
   if (args.join(" ").toLowerCase().includes("token")) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "You can't use this (This for safetly resons)!"
    }});
   }
   if (args.join(" ").toLowerCase().includes("secret")) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "You can't use this (This for safetly resons)!"
    }});
   }
   if (args.join(" ").toLowerCase().includes("process.env")) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "You can't use this (This for safetly resons)!"
    }});
   }
   const toEval = args.join(" ")
   const evaluated = eval(toEval)
   const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTimestamp()
    .setTitle("Eval")
    .addField("To evaluate:", `\`\`\`js\n${beautify(args.join(" "), { format: "js"})}\n\`\`\``)
    .addField("Evaluated:", evaluated)
    .addField("Type of:", typeof(evaluated))
    .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
   message.channel.send(embed);
  } catch (err) {
   const embed = new Discord.MessageEmbed()
    .setColor("#FF0000")
    .setTitle("Error!")
    .setDescription("**Error Code:** *" + err + "*")
    .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
    .setTimestamp()
   return message.channel.send(embed);
  }
 }
}
