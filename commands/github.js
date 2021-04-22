const Discord = require('discord.js')
const fetch = require('node-fetch')
const moment = require('moment')
const config = require("../config");
const prefix = config.prefix;

module.exports = {
 name: "github",
 aliases: [],
 description: "Search for things in github",
 category: "Utility",
 usage: "github (search)",
 run: async (client, message, args) => {
  try {
   if (!args[0]) return message.channel.send({embed: {
    color: 16734039,
    description: "Please enter a Github username"
   }})
   fetch(`https://api.github.com/users/${args.join('-')}`)
    .then(res => res.json()).then(body => {
     if(body.message) return message.channel.send({embed: {
      color: 16734039,
      description: "0 Users found, please provide vaild username"
     }})
     let {login, avatar_url, name, id, html_url, public_repos, followers, following, location, created_at, bio} = body;
     const embed = new Discord.MessageEmbed()
      .setAuthor(`🐙 ${login} Information!`, avatar_url)
      .setColor(`RANDOM`)
      .setThumbnail(`${avatar_url}`)
      .addField(`Username`, `${login}`)
      .addField(`ID`, `${id}`)
      .addField(`Bio`, `${bio || "No Bio"}`)
      .addField(`Public Repositories`, `${public_repos || "None"}`, true)
      .addField(`Followers`, `${followers}`, true)
      .addField(`Following`, `${following}`, true)
      .addField(`Location`, `${location || "No Location"}`)
      .addField(`Account Created`, moment.utc(created_at).format("dddd, MMMM, Do YYYY"))
      .setFooter(message.client.user.username, message.client.user.displayAvatarURL())
      .setTimestamp()
     message.channel.send(embed)
    })
  } catch (err) {
    message.channel.send({embed: {
     color: 16734039,
     description: "Something went wrong... :cry:"
    }})
  }
 }
}
