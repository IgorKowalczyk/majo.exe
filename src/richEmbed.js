// RichEmbed
const Discord = require('discord.js')

const richEmbed = (richEmbedData) => {
  const embed = new Discord.RichEmbed()
    .setTitle(richEmbedData.title)
    .setColor(richEmbedData.color)
    .setDescription(richEmbedData.description)
    .setImage(richEmbedData.image)
  return embed
}
module.exports = { richEmbed }
