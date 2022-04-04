const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "meme",
 description: "😆 Check out a random meme from Reddit",
 usage: "/meme",
 timeout: 3000,
 category: "Fun",
 run: async (client, interaction, args) => {
  try {
   const response = await fetch("https://reddit.com/r/dankmemes/random/.json");
   const body = await response.json();
   let meme = body[0].data.children[0].data;
   const row = new MessageActionRow() // Prettier
    .addComponents(
     new MessageButton() // Prettier
      .setStyle("LINK")
      .setURL(`https://reddit.com${meme.permalink}`)
      .setLabel("View meme")
    );
   const embed = new MessageEmbed() // Prettier
    .setColor("RANDOM")
    .setTitle(meme.title)
    .setURL(`https://reddit.com${meme.permalink}`)
    .setImage(meme.url)
    .setTimestamp()
    .setFooter({
     text: `${client.bot_emojis.like} ${meme.ups} upvotes • ${client.bot_emojis.chat} ${meme.num_comments} comments • Requested by ${interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    });
   interaction.followUp({ embeds: [embed], components: [row] });
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
