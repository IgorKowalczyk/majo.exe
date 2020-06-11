const superagent = require('superagent');
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
  const { body } = await superagent
        .get('http://icanhazdadjoke.com/')
        .set('Accept', 'application/json');
        let jEmbed = new Discord.RichEmbed()
        .setTitle("Joke")
        .setDescription(body.joke)
        .setColor("#cdf785");
        message.channel.send(jEmbed);
    }

module.exports.help = {
    name: "joke",
    description: "Display a random joke",
    usage: "joke",
    type: "Fun"  
}