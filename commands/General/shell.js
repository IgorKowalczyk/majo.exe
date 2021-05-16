const Discord = require("discord.js");
const config = require("../../config");
const process = require("child_process");

module.exports = {
 name: "shell",
 aliases: ["cmd", "exec", "terminal"],
 description: "Shows informations for developers",
 category: "General",
 usage: "info",
 run: async (client, message, args) => {
  try {
   if(message.author.id !== config.ownerid) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "❌ | You do not have permission to run this command (Only owner of the bot can run this)!"
    }});
   }
   const result = args.join(" ");
   if (!result) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "❌ | Please input some string!"
    }});
   }
   process.exec(result), (error, stdout) => {
    const response = (error || stdout);
    message.channel.send(response, {code: "asciidoc", split: "\n"}).catch(err => message.channel.send(err))
   }
  } catch(err) {
   message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
