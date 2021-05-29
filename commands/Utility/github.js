const Discord = require('discord.js')
const fetch = require('node-fetch')
const moment = require('moment')
const Extra = require('discord-buttons');

module.exports = {
 name: "github",
 aliases: [],
 description: "Search for things in github",
 category: "Utility",
 usage: "github (search)",
 run: async (client, message, args) => {
  try {
   if (!args[0]) return message.lineReply({embed: {
    color: 16734039,
    description: "❌ | Please enter a Github username"
   }})
   fetch(`https://api.github.com/users/${args.join('-')}`)
    .then(res => res.json()).then(body => {
     if(body.message) return message.lineReply({embed: {
      color: 16734039,
      description: "❌ | 0 Users found, please provide vaild username"
     }})
     let {login, avatar_url, name, id, html_url, company, public_repos, public_gists, twitter_username, email, followers, following, location, created_at, bio} = body;
     const button = new Extra.MessageButton()
     .setLabel("See profile")
     .setStyle('url')
     .setURL(html_url)
     const embed = new Discord.MessageEmbed()
      .setAuthor(`🐙 ${login} Information!`, avatar_url)
      .setColor(`RANDOM`)
      .setThumbnail(`${avatar_url}`)
      .addField(`Username`, `${login}`)
      .addField(`ID`, `${id}`)
      .addField(`Bio`, `${bio || "No Bio"}`)
      .addField(`Public Repositories`, `${public_repos || "None"}`, true)
      .addField(`Public Gists`, `${public_gists || "None"}`, true)
      .addField(`Followers`, `${followers}`, true)
      .addField(`Following`, `${following}`, true)
      .addField(`Location`, `${location || "No Location"}`)
      .addField(`E-Mail`, `${email || "No email provided"}`)
      .addField(`Twitter`, `${twitter_username || "None"}`)
      .addField(`Company`, `${company || "No company"}`)
      .addField(`Account Created`, moment.utc(created_at).format("dddd, MMMM, Do YYYY"))
      .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
      .setTimestamp()
     message.lineReply({ button: button, embed: embed})
    })
  } catch (err) {
   message.lineReply({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
