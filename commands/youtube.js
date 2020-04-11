const Discord = require("discord.js");


module.exports.run = async (client, message, args) => {

let youtube = args.slice(0).join('+');

  let link = `https://www.youtube.com/results?search_query=` + youtube;
  if (!youtube) return message.reply(`Please enter a word `)
  if (!link) return message.reply("Console error")
  let embed = new Discord.RichEmbed()
    .setTitle("Searching in youtube")
    .setColor(3447003)
    .setTimestamp()
    .addField("Searched word:", `${args.slice(0).join(' ')}`)
    .addField('Link:', `${link}`)
  message.channel.send(embed);
}

module.exports.help = {
    name: "youtube",
    description: "Search on youtube",
    usage: "search (word)",
    type: "Fun"  
}
