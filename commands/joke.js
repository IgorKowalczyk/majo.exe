const superagent = require('superagent');
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {

            superagent.get('http://icanhazdadjoke.com/').set('Accept', 'application/json');
                .end((err, response) => {
              const lewdembed = new Discord.RichEmbed()
              .setColor(`RANDOM`)
              .setDescription(response.joke)
			  .setTitle("Joke")
          message.channel.send(lewdembed);
            }).catch((err) => message.channel.send({embed: {
                color: 16734039,
                title: "Something went wrong... :cry:"
            }}))
		}
          

module.exports.help = {
    name: "joke",
    description: "Display a random joke",
    usage: "joke",
    type: "Fun"  
}