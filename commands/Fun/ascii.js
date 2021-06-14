const Discord = require("discord.js");
const figlet = require("figlet");
const hastebin = require("hastebin");

module.exports = {
 name: "ascii",
 aliases: ["asciiart", "ascii-art"],
 category: "Fun",
 description: "Convert text to asci format",
 usage: "ascii <text>",
 run: async (client, message, args) => {
  try {
   var max = 1000;
   if (args.join(" ").length > max)
    return message.lineReply({
     embed: {
      color: 16734039,
      description: "❌ | The max length for ascii is " + `${max}` + " !",
     },
    });
   if (!args[0])
    return message.lineReply({
     embed: {
      color: 16734039,
      description: "❌ | Please enter a text to convert!",
     },
    });
   figlet(`${args.join(" ")}`, function (err, data) {
    if (err) {
     return message.lineReply({
      embed: {
       color: 16734039,
       description: "Something went wrong... :cry:",
      },
     });
    }
    hastebin
     .createPaste(
      data,
      {
       raw: true,
       contentType: "text/plain",
       server: "https://haste.zneix.eu/",
      },
      {}
     )
     .then(function (urlToPaste) {
      const embed = new Discord.MessageEmbed() // Prettier()
       .setColor("RANDOM")
       .setTitle(
        ":white_check_mark: Success!",
        message.guild.iconURL({
         dynamic: true,
         format: "png",
        })
       )
       .setDescription(":tada: Your ascii code is generated! \n:link: Link to ascii code paste: " + urlToPaste)
       .setFooter(
        "Requested by " + `${message.author.username}`,
        message.author.displayAvatarURL({
         dynamic: true,
         format: "png",
         size: 2048,
        })
       )
       .setTimestamp();
      message.lineReply(embed);
     })
     .catch(function (requestError) {
      message.lineReply({
       embed: {
        color: 16734039,
        description: "Something went wrong while uploading ascii code to server :cry:",
       },
      });
     });
   });
  } catch (err) {
   message.lineReply({
    embed: {
     color: 16734039,
     description: "Something went wrong... :cry:",
    },
   });
  }
 },
};
