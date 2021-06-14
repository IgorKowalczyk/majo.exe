const Discord = require("discord.js");
const randomPuppy = require("random-puppy");

module.exports = {
 name: "meme",
 aliases: [],
 description: "Sends a random meme",
 category: "Fun",
 usage: "meme",
 run: async (client, message, args) => {
  try {
   const subReddits = ["meme", "animemes", "MemesOfAnime", "animememes", "AnimeFunny", "dankmemes", "dankmeme", "wholesomememes", "MemeEconomy", "techsupportanimals", "meirl", "me_irl", "2meirl4meirl", "AdviceAnimals"];
   const random = subReddits[Math.floor(Math.random() * subReddits.length)];
   randomPuppy(random).then(async (url) => {
    const embed = new Discord.MessageEmbed() // Prettier()
     .setColor("RANDOM")
     .setTitle("Random meme")
     .setImage(url)
     .setFooter(
      "Requested by " + `${message.author.username}`,
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     );
    message.lineReply(embed);
   });
  } catch (err) {
   console.log(err);
   message.lineReply({
    embed: {
     color: 16734039,
     description: "Something went wrong... :cry:",
    },
   });
  }
 },
};
