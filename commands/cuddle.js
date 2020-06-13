const Discord = require("discord.js");
const superagent = require("snekfetch");

        module.exports.run = async (client, message, args) => {
            const user = message.mentions.users.first();

            if(!user)
                return message.channel.send({embed: {
                color: 16734039,
                description: "You must mention someone to cuddle!"
            }})

            superagent.get('https://nekos.life/api/v2/img/cuddle')
                .end((err, response) => {
              const embed = new Discord.RichEmbed()
              .setTitle(user.username + " Just got a cuddle from " + message.author.username)
              .setImage(response.body.url)
              .setColor(`RANDOM`)
              .setDescription((user.toString() + " got a cuddle from " + message.author.toString()))
              .setFooter(`this is so cute`)
              .setURL(response.body.url);
          message.channel.send(embed);
            }).catch((err) => message.channel.send({embed: {
                color: 16734039,
                description: "Something went wrong... :cry:"
            }}));

        }

module.exports.help = {
    name: "cuddle",
    description: "Give a cuddle to mention user",
    usage: "cuddle <user>",
    type: "Fun" 
}