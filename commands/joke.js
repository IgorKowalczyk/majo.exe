const superagent = require('superagent');
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {

superagent.get('http://icanhazdadjoke.com/')
		.end((err, response) => {
        let jEmbed = new Discord.RichEmbed()
        .setTitle("Joke")
        .setDescription(response.joke)
        .setColor("RANDOM");
        message.channel.send(jEmbed);
            }).catch((err) => message.channel.send({embed: {
                color: 16734039,
                title: "Something went wrong... :cry:"
            }}));
          
        }

module.exports.help = {
    name: "joke",
    description: "Display a random joke",
    usage: "joke",
    type: "Fun"  
}