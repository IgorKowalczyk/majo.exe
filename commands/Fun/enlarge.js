const Discord = require("discord.js");
const { parse } = require("twemoji-parser");

module.exports = {
    name: "enlarge",
    aliases: ["ampliar",],
    description: "Amplia um emoji",
    category: "Diversão",
    usage: "enlarge <emoji>",
run: async (client, message, args) => {
    
    const emoji = args[0];
    if (!emoji) return message.channel.send("Nenhum emoji fornecido!");

    let custom = Discord.Util.parseEmoji(emoji);
    const embed = new Discord.MessageEmbed()
    .setTitle(`Versão ampliada de. ${emoji}`)
    .setColor("#FFFF00");

    if (custom.id) {
        embed.setImage(`https://cdn.discordapp.com/emojis/${custom.id}.${custom.animated ? "gif" : "png"}`);
        return message.channel.send(embed);
    }
    else {
        let parsed = parse(emoji, { assetType: "png" });
        if (!parsed[0]) return message.channel.send("Emoji inválido!");

        embed.setImage(parsed[0].url);
        return message.channel.send(embed);
    }

}
}
