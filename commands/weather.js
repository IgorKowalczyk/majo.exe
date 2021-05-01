const Discord = require('discord.js');
const weather = require('weather-js');

module.exports = {
 name: "weather",
 aliases: [],
 description: "Checks a weather forecast",
 category: "Utility",
 usage: "weather <location>",
 run: async (client, message, args) => {
  try {
   if(!args[0]) {
    return message.channel.send('❌ | Please specify a location')
   }
   weather.find({search: args.join(" "), degreeType: 'C'}, function (error, result){
    // 'C' can be changed to 'F' for farneheit results
    if(error) {
     return message.channel.send({embed: {
      color: 16734039,
      description: "❌ | Something went wrong... :cry:"
     }})
    }
    if(result === undefined || result.length === 0) {
     return message.channel.send({embed: {
      color: 16734039,
      description: "❌ | Invaild location!"
     }})
    }
    const current = result[0].current;
    const location = result[0].location;
    const weatherinfo = new Discord.MessageEmbed()
     .setTitle(`🌤️ Weather forecast for ${current.observationpoint}`, message.guild.iconURL({ dynamic: true, format: 'png'}))
     .setThumbnail(current.imageUrl)
     .setColor("RANDOM")
     .setDescription(`**${current.skytext}**`)
     .addField('Timezone', `UTC${location.timezone}`, true)
     .addField('Degree Type', 'Celsius', true)
     .addField('Temperature', `${current.temperature}°`, true)
     .addField('Wind', current.winddisplay, true)
     .addField('Feels like', `${current.feelslike}°`, true)
     .addField('Humidity', `${current.humidity}%`, true)
     .setTimestamp()
     .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
    message.channel.send(weatherinfo)
   })        
  } catch (err) {
   message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
