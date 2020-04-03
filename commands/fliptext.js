const Discord = module.require("discord.js");
const flip = require("flip-text");

module.exports.run = async (client, message, args) => {
  args.reverse();
  var flipped = [];
  
  args.forEach((arg) => {
      flipped.push(flip(arg));
  });
   if (!message) {
        message.delete();
        return message.channel.send({embed: {
            color: 3447003,
            title: "Mention a valid member of this server!"
        }}).then(msg => msg.delete(2132));
    }

    await message.channel.send({embed: {
        color: 3447003,
        title: "Flipped text: " + flipped.join(" "),
    }});
}

module.exports.help = {
    name: "fliptext",
    description: "Flip some text",
    usage: "fliptext <text>",
    type: "Fun"
}
