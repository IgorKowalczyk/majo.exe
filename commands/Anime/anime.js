const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const mal = require("mal-scraper");

module.exports = {
 name: "anime",
 aliases: ["animesearch"],
 description: "Search anime list",
 category: "Anime",
 usage: "anime <name>",
 run: async (client, message, args) => {
  try {
   const search = args.join(" ");
   mal
    .getInfoFromName(search)
    .then((data) => {
     const embed = new MessageEmbed() // Prettier
      .setAuthor(
       `${client.bot_emojis.search_glass} My Anime List search result for ${args}`.split(",").join(" "),
       message.guild.iconURL({
        dynamic: true,
        format: "png",
       })
      )
      .setImage(data.picture)
      .setColor("RANDOM")
      .addField(`${client.bot_emojis.flag_gb} English Title`, "```" + data.englishTitle + "```")
      .addField(`${client.bot_emojis.flag_jp} Japanese Title`, "```" + data.japaneseTitle + "```")
      .addField(`${client.bot_emojis.book} Type`, "```" + data.type + "```")
      .addField(`${client.bot_emojis.counting} Episodes`, "```" + data.episodes + " episodes```")
      .addField(`${client.bot_emojis.star2} Rating`, "```" + data.rating + "```")
      .addField(`${client.bot_emojis.calendar_spillar} Aired`, "```" + data.aired + "```")
      .addField(`${client.bot_emojis.star} Score`, "```" + data.score + "```")
      .addField(`${client.bot_emojis.barchart} Score Stats`, "```" + data.scoreStats + "```")
      .setFooter(
       `Requested by ${message.author.username}`,
       message.author.displayAvatarURL({
        dynamic: true,
        format: "png",
        size: 2048,
       })
      )
      .setTimestamp();
     const row = new MessageActionRow() // Prettier
      .addComponents(
       // Prettier
       new MessageButton() // Prettier
        .setStyle("LINK")
        .setURL(data.url)
        .setLabel("My Anime List")
      );
     message.reply({ embeds: [embed], components: [row] });
    })
    .catch((err) => {
     console.log(err);
     return client.createError(message, `${client.bot_emojis.error} | Please enter vaild anime name!\n\n**Usage:** \`${client.prefix} anime <anime name>\``);
    });
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
