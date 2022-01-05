const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const mal = require("mal-scraper");

module.exports = {
 name: "anime",
 description: "Search for information on a given anime",
 options: [
  {
   name: "query",
   description: "Anime name",
   required: true,
   type: 3,
  },
 ],
 run: async (client, interaction, args) => {
  try {
   const search = args.join(" ");
   if (search.toString().length > client.max_input) {
    return client.createSlashError(interaction, `${client.bot_emojis.error} | Anime name can't be longer than \`${client.max_input}\` characters!`);
   }
   mal
    .getInfoFromName(search)
    .then((data) => {
     const embed = new MessageEmbed() // Prettier
      .setAuthor({
       name: `${client.bot_emojis.search_glass} My Anime List search result for ${args}`.split(",").join(" "),
       iconURL: interaction.guild.iconURL({
        dynamic: true,
        format: "png",
       }),
      })
      .setImage(data.picture)
      .setColor("RANDOM")
      .addField(`${client.bot_emojis.flag_gb} English Title`, `\`\`\`${data.englishTitle || "None!"}\`\`\``)
      .addField(`${client.bot_emojis.flag_jp} Japanese Title`, `\`\`\`${data.japaneseTitle || "None!"}\`\`\``)
      .addField(`${client.bot_emojis.book} Type`, `\`\`\`${data.type || "N/A!"}\`\`\``)
      .addField(`${client.bot_emojis.counting} Episodes`, `\`\`\`${data.episodes || "N/A!"} episodes\`\`\``)
      .addField(`${client.bot_emojis.star2} Rating`, `\`\`\`${data.rating || "N/A!"}\`\`\``)
      .addField(`${client.bot_emojis.calendar_spillar} Aired`, `\`\`\`${data.aired || "N/A!"}\`\`\``)
      .addField(`${client.bot_emojis.star} Score`, `\`\`\`${data.score || "N/A!"}\`\`\``)
      .addField(`${client.bot_emojis.barchart} Score Stats`, `\`\`\`${data.scoreStats || "N/A!"}\`\`\``)
      .setFooter({
       text: `Requested by ${interaction.user.username}`,
       iconURL: interaction.user.displayAvatarURL({
        dynamic: true,
        format: "png",
        size: 2048,
       }),
      })
      .setTimestamp();
     const row = new MessageActionRow() // Prettier
      .addComponents(
       // Prettier
       new MessageButton() // Prettier
        .setStyle("LINK")
        .setURL(data.url)
        .setLabel("View more")
      );
     interaction.followUp({ embeds: [embed], components: [row] });
    })
    .catch((err) => {
     return client.createSlashError(interaction, `${client.bot_emojis.error} | Please enter vaild anime name!`);
    });

  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};

