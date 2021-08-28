const Discord = require("discord.js");
const weather = require("weather-js");

module.exports = {
 name: "weather",
 aliases: [],
 description: "Checks a weather forecast",
 category: "Utility",
 usage: "weather <location>",
 run: async (client, message, args) => {
  try {
   if (!args[0]) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.success} | Please specify a location`,
     },
    });
   }
   weather.find(
    {
     search: args.join(" "),
     degreeType: "C",
    },
    function (error, result) {
     if (error) {
      return message.lineReply({
       embed: {
        color: 16734039,
        description: `${client.bot_emojis.success} | Something went wrong... :cry:`,
       },
      });
     }
     if (result === undefined || result.length === 0) {
      return message.lineReply({
       embed: {
        color: 16734039,
        description: `${client.bot_emojis.success} | Invaild location!`,
       },
      });
     }
     const current = result[0].current;
     const location = result[0].location;
     const weatherinfo = new Discord.MessageEmbed() // Prettier
      .setTitle(
       `${client.bot_emojis.weather} Weather forecast for ${current.observationpoint}`,
       message.guild.iconURL({
        dynamic: true,
        format: "png",
       })
      )
      .setThumbnail(current.imageUrl)
      .setColor("RANDOM")
      .setDescription(`**${current.skytext}**`)
      .addField(`${client.bot_emojis.temperature} Temperature`, `${current.temperature}°`)
      .addField(`${client.bot_emojis.hot} Feels like`, `${current.feelslike}°`)
      .addField(`${client.bot_emojis.tornado} Wind`, current.winddisplay, true)
      .addField(`${client.bot_emojis.humidity} Humidity `, `${current.humidity}%`)
      .addField(`${client.bot_emojis.ruler} Degree Type`, "Celsius")
      .addField(`${client.bot_emojis.earth} Timezone`, `UTC${location.timezone}`)
      .setTimestamp()
      .setFooter(
       `Requested by ${message.author.username}`,
       message.author.displayAvatarURL({
        dynamic: true,
        format: "png",
        size: 2048,
       })
      );
     message.lineReply(weatherinfo);
    }
   );
  } catch (err) {
   message.lineReply({
    embed: {
     color: 16734039,
     description: `Something went wrong... ${client.bot_emojis.sadness}`,
    },
   });
  }
 },
};
