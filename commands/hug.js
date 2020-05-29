const Discord = require("discord.js");
const superagent = require("snekfetch");

        module.exports.run = async (client, message, args, level) => {
            const user = message.mentions.users.first();
            if(!user)
                return message.channel.send({embed: {
                color: 16734039,
                title: "You must mention someone to give hug!"
            }})
		if (message.author === user) {
           return await message.channel.send({embed: {
                color: 16734039,
                title: "You cant hug yourself!"
            }})
            superagent.get('https://nekos.life/api/v2/img/hug')
                .end((err, response) => {
              const lewdembed = new Discord.RichEmbed()
              .setTitle(user.username + " Just got a hug from " + message.author.username)
              .setImage(response.body.url)
              .setColor("RANDOM")
              .setDescription((user.toString() + " got a hug from " + message.author.toString()))
              .setFooter(`this is so cute`)
              .setURL(response.body.url);
          message.channel.send(lewdembed);
            }).catch((err) => message.channel.send({embed: {
                color: 16734039,
                title: "Something went wrong... :cry:"
            }}));

        }

module.exports.help = {
    name: "hug",
    description: "Give hug to mentioned user",
    usage: "hug <user>",
    type: "Fun" 
}