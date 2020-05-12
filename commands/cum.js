const randomPuppy = require('random-puppy');
const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {  

    if (!message.channel.nsfw) {
		message.react('💢');
		return message.channel.send({embed: {
                color: 16734039,
                title: "You can use this command in an NSFW Channel!"
            }})
	}
	
    let reddit = [
        "cumsluts",
        "GirlsFinishingTheJob",
        "cumfetish",
        "amateurcumsluts",
        "cumcoveredfucking",
        "cumhaters",
        "thickloads",
        "before_after_cumsluts",
        "pulsatingcumshots",
        "impressedbycum",
        "cummy"
    ]

    let cum = cums[Math.floor(Math.random() * cums.length)];

    message.channel.startTyping();

    randomPuppy(cum).then(async url => {
            await message.channel.send({
                files: [{
                    attachment: url,
                    name: 'meme.png'
                }]
            }).then(() => message.channel.stopTyping());
    }).catch(function (err)  {
      message.channel.send({embed: {
         color: 16734039,
         title: "Something went wrong... :cry:"
         }})
      return;
    });
}

module.exports.help = {
    name: "cum",
    description: "Sends a random cum image/gif",
    usage: "cum",
    type: "NSFW" 
}

