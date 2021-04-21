const Discord = require("discord.js");
const fetch = require('node-fetch');
const config = require("../config");
const prefix = config.prefix;

module.exports = {
 name: "djs",
 aliases: ["discordjs", "djsdocs"],
 description: "Look at the discord.js docs",
 category: "Utility",
 usage: "djs (query)",
 run: async (client, message, args) => {
  try {
   const query = args[0]
   const version = message.content.split('--src=')[1]
   if (!version) version = 'stable'
  if (!query) message.channel.send({embed: {
   color: 16734039,
   description: "Please enter a term to search!"
  }})
  const res = await fetch(`https://djsdocs.sorta.moe/v2/embed?src=${version}&q=${query}`)
  const body = await res.json()
  return message.channel.send({
   embed: body
  }).catch(c => {
   message.channel.send({embed: {
    color: 16734039,
    description: "Invaild query!"
   }})
  })
  } catch (err) {
   message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
