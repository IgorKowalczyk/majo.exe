const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
  try {
	const embed = new Discord.RichEmbed()
	  .setTitle("Majo dependencies")
      .setDescription("Majo runs on " + Object.keys(require('../package').dependencies).length + " dependencies")
	  .setTimestamp()
	  .setColor("RANDOM")
  message.channel.send(embed);
  } catch (err) {
    message.channel.send({embed: {
                color: 16734039,
                description: "Something went wrong... :cry:"
            }})
  }
}

module.exports.help = {
    name: "dependencies",
    description: "Returns the amount of dependencies Majo uses",
    usage: "dependencies",
    type: "General" 
}
