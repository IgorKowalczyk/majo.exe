const superagent = require("snekfetch");
const Discord = require('discord.js')

module.exports.run = async (client, message, args, level) => {
    superagent.get('https://nekos.life/api/v2/img/woof')
        .end((err, response) => {
      const lewdembed = new Discord.RichEmbed()
      .setTitle("Random dog")
      .setImage(response.body.url)
      .setColor("RANDOM")
      .setFooter(`woof`)
      .setURL(response.body.url);
  message.channel.send(lewdembed);
    }).catch((err) => message.channel.send({embed: {
                color: 16734039,
                title: "Something went wrong... :cry:"
            }}));

}

module.exports.help = {
    name: "dog",
    description: "Sends a random dog photo",
    usage: "dog",
    type: "Fun" 
}