const superagent = require("snekfetch");
const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {

    superagent.get('https://nekos.life/api/v2/img/meow')
        .end((err, response) => {
      const embed = new Discord.RichEmbed()
      .setTitle("Random cat")
      .setImage(response.body.url)
      .setColor(`RANDOM`)
      .setFooter(`meow`)
      .setURL(response.body.url);
  message.channel.send(embed);
    }).catch((err) => message.channel.send({embed: {
                color: 16734039,
                description: "Something went wrong... :cry:"
            }}));

}

module.exports.help = {
    name: "cat",
    description: "Sends a random cat photo",
    usage: "cat",
    type: "Fun" 
}