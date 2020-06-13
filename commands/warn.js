const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (client, message, args) => {

  //!warn @daeshan <reason>
  if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send({embed: {
            color: 16734039,
            description: "You don't have premission to warn members!"
        }})
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.channel.send({embed: {
            color: 16734039,
            description: "I can't find the user!"
        }})
  if(wUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send({embed: {
            color: 16734039,
            description: "I can't warn this user!"
        }})
  let reason = args.join(" ").slice(22);

  if (!reason) return message.channel.send({embed: {
            color: 16734039,
            description: "Please enter a reason!"
        }})
  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };

  warns[wUser.id].warns++;

  fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err)
  });

  let warnEmbed = new Discord.RichEmbed()
  .setTitle("Warns")
  .setColor("RANDOM")
  .addField("Warned User:", `<@${wUser.id}>`)
  .addField("Warned In:", message.channel)
  .addField("Number of Warnings:", warns[wUser.id].warns)
  .addField("Reason:", reason)
  .setTimestamp()
  message.channel.send(warnEmbed);
}

module.exports.help = {
    name: "warn",
    description: "Warn a user",
    usage: "warn <user> <channel>",
    type: "Moderation"
}