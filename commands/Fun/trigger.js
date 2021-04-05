const canvacord = require("canvacord");
const { MessageAttachment } = require("discord.js");

module.exports = {
    name: "trigger",
    aliases: ["triggered"],
    description: "Cria um gif triggered.gif",
    category: "Diversão",
    usage: "trigger <image>",
run: async (client, message, args) => {
    let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
    let triggered = await canvacord.Canvas.trigger(user.displayAvatarURL({ format: "png", dynamic: false }));
    let attachment = new MessageAttachment(triggered, "triggered.gif");
    return message.channel.send(attachment);
}
}
