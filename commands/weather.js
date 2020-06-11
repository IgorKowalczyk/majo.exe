const Discord = require("discord.js");
const weather = require('weather-js')

module.exports.run = async (client, message, args) => {

if(args.length === 0){
    let errorembed = new Discord.RichEmbed()
    .setTitle("Error :cry:")
    .setDescription("Please enter a location!")
	.setColor("FF5757")
    .setTimestamp()
  return message.channel.send(errorembed);
}

weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) {
  
if(result.length === 0){
    let errorembed = new Discord.RichEmbed()
    .setTitle("Error :cry:")
    .setDescription("Please enter a vaild location!")
	.setColor("FF5757")
    .setTimestamp()
  return message.channel.send(errorembed);
}

  var current = result[0].current;
  var location = result[0].location;
	if (err) {
	let errorembed = new Discord.RichEmbed()
    .setTitle("Error :cry:")
    .setDescription("Please enter a vaild location!")
	.setColor("FF5757")
    .setTimestamp()
  return message.channel.send(errorembed);
	}

	
    let embed = new Discord.RichEmbed()
    .setDescription(`**${current.skytext}**`)
    .setAuthor(`Weather for ${current.observationpoint}`)
    .setThumbnail(current.imageUrl)
    .setColor(0x00AE86)
    .addField('Timezone', `UTC${location.timezone}`, true)
    .addField('Degree Type', location.degreetype, true)
    .addField('Temperature', `${current.temperature} Degrees`, true)
    .addField('Feels Like', `${current.feelslike} Degrees`, true)
    .addField('Winds', current.winddisplay, true)
    .addField('Humidity', `${current.humidity}%`, true)
    message.channel.send(embed)
});


}

module.exports.help = {
    name: "weather",
    description: "Display a weather stats",
    usage: "weather <location>",
    type: "Utility"  
}