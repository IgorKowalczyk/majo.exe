const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {

const sneezes = [
  "***Achoo!***",
  "*chew!*",
  "Ah... Ah... **A_CHOO!_**",
  "_Ah..._***CHOOOOOOOOOOOOOOOOOOOO!***",
  "*Achoo!* Excuse me!",
];

await message.channel.send({embed: {
 color: 3447003,
 description: sneezes[Math.floor(Math.random() * Math.floor(sneezes.length))]
}});

}

module.exports.help = {
    name: "sneeze",
    description: "Achoo!",
    usage: "sneeze",
	type: "Fun"
}
