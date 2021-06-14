const Discord = require("discord.js");
const malScraper = require("mal-scraper");

module.exports = {
 name: "anime",
 aliases: ["animesearch"],
 description: "Search anime list",
 category: "Fun",
 usage: "animesearch <name>",
 run: async (client, message, args) => {
  try {
   const search = `${args}`;
   malScraper
    .getInfoFromName(search)
    .then((data) => {
     const embed = new Discord.MessageEmbed() // Prettier()
      .setAuthor(
       `🔍 My Anime List search result for ${args}`.split(",").join(" "),
       message.guild.iconURL({
        dynamic: true,
        format: "png",
       })
      )
      .setImage(data.picture)
      .setColor("RANDOM")
      .addField(":flag_gb: English Title", data.englishTitle)
      .addField(":flag_jp: Japanese Title", data.japaneseTitle)
      .addField(":book: Type", data.type)
      .addField(":1234: Episodes", data.episodes)
      .addField(":star2: Rating", data.rating)
      .addField(":calendar_spiral: Aired", data.aired)
      .addField(":star: Score", data.score)
      .addField(":bar_chart: Score Stats", data.scoreStats)
      .addField(":link: Link", data.url)
      .setFooter(
       "Requested by " + `${message.author.username}`,
       message.author.displayAvatarURL({
        dynamic: true,
        format: "png",
        size: 2048,
       })
      )
      .setTimestamp();
     message.lineReply(embed);
    })
    .catch((err) =>
     message.lineReply({
      embed: {
       color: 16734039,
       description: "❌ | Please enter a vaild name!",
      },
     })
    );
  } catch (err) {
   message.lineReply({
    embed: {
     color: 16734039,
     description: "Something went wrong... :cry:",
    },
   });
  }
 },
};
