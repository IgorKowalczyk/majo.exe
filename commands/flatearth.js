const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  try {
	let embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle("If the earth isn\'t flat, explain this:")
	.setImage("https://igorkowalczyk.github.io/majobot/lib/img/earth.png")
    message.channel.send(embed);
  } catch (err) {
    message.channel.send({embed: {
                color: 16734039,
                description: "Something went wrong... :cry:"
            }})
  }
}

module.exports.help = {
    name: "flatearth",
    description: "Shows why the Earth is flat",
    usage: "flatearth",
    type: "Fun" 
}
