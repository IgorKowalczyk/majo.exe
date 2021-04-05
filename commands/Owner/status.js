const config = require('../../config.js');
const Discord = require("discord.js");
const client = new Discord.Client({disableMentions: "everyone"});

module.exports = {
  name: "status",
  aliases: ["stats", "setgame"],
  description: "Muda o status do bot",
  category: "Dono",
  usage: "status <status of the bot>",
run: (client, message, args, sql) =>{
    if (message.author.id !== "506505845215985674") return message.channel.send({embed: {
      color: 16734039,
      description: "Apenas o proprietário do Bot pode usar este comando."
     }});
      
      client.user.setActivity(args.join(" "));
    }
  }

