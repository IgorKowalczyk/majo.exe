const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (client, message, args) => {

  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };
  
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You can't do that.");
  if(!wUser) return message.reply("Couldn't find them yo");
  let warnlevel = warns[wUser.id].warns

  //message.reply(`<@${wUser.id}> has ${warnlevel} warnings.`);
  
  
  let warnEmbed = new Discord.RichEmbed()
  .setTitle("Warns")
  .setColor("RANDOM")
  .addField("Number of" + `@${wUser.id}` + " warns:", `${warnlevel}`)
  .setTimestamp()
  message.channel.send(warnEmbed);
  
  

}

module.exports.help = {
    name: "warns",
    description: "Show number of warns",
    usage: "warns <user>",
    type: "Moderation"
}