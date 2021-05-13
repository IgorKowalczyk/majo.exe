const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "meme",
 aliases: [],
 description: "Sends a random meme",
 category: "Fun",
 usage: "meme",
 run: async (client, message, args) => {
  try {
   const subReddits = ["meme","animemes", "MemesOfAnime", "animememes", "AnimeFunny", "dankmemes", "dankmeme", "wholesomememes", "MemeEconomy", "techsupportanimals", "meirl", "me_irl", "2meirl4meirl", "AdviceAnimals"];
   const random = subReddits[Math.floor(Math.random() * subReddits.length)];
   (async () => {
    const response = await fetch('https://www.reddit.com/r/${random}.json?sort=top&t=week')
     const body = await response.json();
    const allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
    if (!allowed.length) {
     return await message.channel.send({embed: {
      color: 16734039,
      description: "❌ | I can\t get the memes from my pocket. Please try again later"
     }})
    }
    const randomnumber = Math.floor(Math.random() * allowed.length)
    const embed = new Discord.MessageEmbed()
     .setColor("RANDOM")
     .setTitle(allowed[randomnumber].data.title)
     .setDescription("Posted by: " + allowed[randomnumber].data.author)
     .setImage(allowed[randomnumber].data.url)
     .addField("Other info:", "Up votes: " + allowed[randomnumber].data.ups + " / Comments: " + allowed[randomnumber].data.num_comments)
     .setFooter(`r/${random} | Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
    message.channel.send(embed)
   })()
  } catch(err) {
   console.log(err)
   message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
 