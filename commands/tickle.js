const Discord = require("discord.js");
const superagent = require("snekfetch");

        module.exports.run = async (client, message, args, level) => {

            const user = message.mentions.users.first();
            if(!user)
                return message.channel.send({embed: {
                color: 16734039,
                title: "You must mention someone to tickle!"
            }});
		if (message.author === user) {
           return await message.channel.send({embed: {
                color: 16734039,
                title: "You cant tickle yourself!"
            }})
            superagent.get('https://nekos.life/api/v2/img/tickle')
                .end((err, response) => {
              const lewdembed = new Discord.RichEmbed()
              .setTitle(user.username + " just got tickled by " + message.author.username)
              .setImage(response.body.url)
              .setColor(`RANDOM`)
              .setDescription((user.toString() + " got tickled by " + message.author.toString()))
              .setFooter(`._.`)
              .setURL(response.body.url);
          message.channel.send(lewdembed);
            }).catch((err) => message.channel.send({embed: {
                color: 16734039,
                title: "Something went wrong... :cry:"
            }}));

        }

module.exports.help = {
    name: "tickle",
    description: "Tickle a user",
    usage: "tickle <user>",
    type: "Fun"  
}

