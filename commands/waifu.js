const Discord = require("discord.js");
const superagent = require("snekfetch");
     
        module.exports.run = async (client, message, args, level) => {

            superagent.get('https://nekos.life/api/v2/img/waifu')
                .end((err, response) => {
              const lewdembed = new Discord.RichEmbed()
              .setDescription(message.author.toString() + " This is your waifu!")
              .setImage(response.body.url)
              .setColor(`RANDOM`)
              .setURL(response.body.url);
          message.channel.send(lewdembed);
            }).catch((err) => message.channel.send({embed: {
                color: 16734039,
                title: "Something went wrong... :cry:"
            }}));
          
        }
        
module.exports.help = {
    name: "waifu",
    description: "Display a random waifu image",
    usage: "waifu",
    type: "Fun"  
}

