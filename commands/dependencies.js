const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
  try {
	const embed = new Discord.RichEmbed()
	  .setTitle("Majo dependencies")
      .setDescription("Majo runs on" + Object.keys(require('../package').dependencies).length + "dependencies")
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

exports.help = {
  name: 'dependencies',
  category: 'System',
  description: 'Returns the amount of dependencies Cytrus uses',
  usage: 'dependencies'
};