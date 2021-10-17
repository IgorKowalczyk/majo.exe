const { MessageEmbed } = require("discord.js");
const client = require("nekos.life");
const neko = new client();

module.exports = {
 name: "cat-emoji",
 aliases: [],
 description: "Cats is cute",
 category: "Fun",
 usage: "cat-emoji",
 run: async (client, message, args) => {
  (async () => {
   try {
    let text = await neko.sfw.catText();
    const embed = new MessageEmbed()
     .setColor("RANDOM")
     .setTitle(client.bot_emojis.cat)
     .setDescription(`>>> \`${text.cat}\``)
     .setFooter(
      `Requested by ${message.author.username}`,
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     );
    message.reply({ embeds: [embed] });
   } catch (err) {
    console.log(err);
    return client.createCommandError(message, err);
   }
  })();
 },
};
