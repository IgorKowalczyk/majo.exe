const Discord = module.require("discord.js");
const Zalgo = require("to-zalgo");

module.exports.run = async (client, message, args) => {
  
   await message.channel.send({embed: {
                color: 3447003,
                title: Zalgo(args.join(" "))
            }}).then(msg => msg.delete(1899));
}

module.exports.help = {
    name: "zalgo",
    description: "Generate zalgo text",
    usage: "zalgo <text>"
}
