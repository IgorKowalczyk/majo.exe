const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const axios = require("axios").default;

module.exports = {
 name: "meme",
 aliases: [],
 description: "Sends a random meme",
 category: "Fun",
 usage: "meme",
 run: async (client, message, args) => {
  try {
   const options = {
    method: "GET",
    url: `https://reddit.com/r/dankmemes/random/.json`,
   };
   axios.request(options).then((response) => {
    let meme = response.data[0].data.children[0].data;
    const row = new MessageActionRow().addComponents(new MessageButton().setStyle("LINK").setURL(`https://reddit.com${meme.permalink}`).setLabel("View meme"));
    const embed = new MessageEmbed() // Prettier
     .setColor("RANDOM")
     .setTitle(meme.title)
     .setURL(`https://reddit.com${meme.permalink}`)
     .setImage(meme.url)
     .setFooter(
      `${client.bot_emojis.like} ${meme.ups} • ${client.bot_emojis.chat} ${meme.num_comments} | Requested by ${message.author.username}`,
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     );
    message.reply({ embeds: [embed], components: [row] });
   });
  } catch (err) {
   console.log(err);
   message.reply({ embeds: [client.command_error_embed] });
  }
 },
};
