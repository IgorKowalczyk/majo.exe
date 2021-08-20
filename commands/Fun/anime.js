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
     const embed = new Discord.MessageEmbed() // Prettier
      .setAuthor(
       `${client.bot_emojis.search_glass} My Anime List search result for ${args}`.split(",").join(" "),
       message.guild.iconURL({
        dynamic: true,
        format: "png",
       })
      )
      .setImage(data.picture)
      .setColor("RANDOM")
      .addField(`${client.bot_emojis.flag_gb} English Title`, data.englishTitle)
      .addField(`${client.bot_emojis.flag_jp} Japanese Title`, data.japaneseTitle)
      .addField(`${client.bot_emojis.book} Type`, data.type)
      .addField(`${client.bot_emojis.counting} Episodes`, data.episodes)
      .addField(`${client.bot_emojis.star2} Rating`, data.rating)
      .addField(`${client.bot_emojis.calendar_spillar} Aired`, data.aired)
      .addField(`${client.bot_emojis.star} Score`, data.score)
      .addField(`${client.bot_emojis.barchart} Score Stats`, data.scoreStats)
      .addField(`${client.bot_emojis.link} Link`, data.url)
      .setFooter(
       `Requested by ${message.author.username}`,
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
       description: `${client.bot_emojis.error} | Please enter a vaild anime name!\n\n**Usage:** \`${process.env.PREFIX} anime <anime>\``,
      },
     })
    );
  } catch (err) {
   message.lineReply({
    embed: {
     color: 16734039,
     description: `Something went wrong... ${client.bot_emojis.sadness}`,
    },
   });
  }
 },
};
