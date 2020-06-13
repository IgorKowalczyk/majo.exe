const Discord = require("discord.js");
const flip = require("flip-text");

module.exports.run = async (client, message, args) => {

if (args.length <= 0) return message.channel.send({embed: {
            color: 16734039,
            description: "You must provide a text!"
        }})

      var flipped = [];
  
  args.forEach((arg) => {
      flipped.push(flip(arg));
  });
  

const embed = new Discord.RichEmbed()
      .setColor("RANDOM")
	  .setTitle("Flipped text: " + flipped.join(" "))
  await message.channel.send(embed);
}

module.exports.help = {
    name: "fliptext",
    description: "Flip some text",
    usage: "fliptext <text>",
    type: "Fun"
}