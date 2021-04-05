const Discord = module.require("discord.js");
const malScraper = require('mal-scraper');
const config = require("../../config");
const prefix = config.prefix;

module.exports = {
 name: "anime",
 aliases: ["animesearch"],
 description: "Search for anime list",
 category: "Diversão",
 usage: "animesearch <name>",
 run: async (client, message, args) => {
  try {
   const search = `${args}`;
   malScraper.getInfoFromName(search)
    .then((data) => {
     const embed = new Discord.MessageEmbed()
      .setAuthor(`:mag_right: Resultado da pesquisa My Anime List para ${args}`.split(',').join(' '), message.guild.iconURL({ dynamic: true, format: 'png'}))
      .setImage(data.picture)
      .setColor("RANDOM")
      .addField(":flag_gb: English Title", data.englishTitle)
      .addField(":flag_jp: Japanese Title", data.japaneseTitle)
      .addField(":book: Tipo", data.type)
      .addField(":1234: Episodios", data.episodes)
      .addField(":star2: Avaliação", data.rating)
      .addField(":calendar_spiral: Exibido", data.aired)
      .addField(":star: Pontuação", data.score)
      .addField(":bar_chart: Estatísticas de pontuação", data.scoreStats)
      .addField(":link: Link", data.url)
      .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
      .setTimestamp()
     message.channel.send(embed);
    }).catch((err) => message.channel.send({embed: {
     color: 16734039,
     description: "Por favor, indique um nome válido!"
   }}));
  } catch (err) {
   message.channel.send({embed: {
    color: 16734039,
    description: "Algo deu errado... :cry:"
   }})
  }
 }
}
