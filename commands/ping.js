const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
    await message.channel.send(`**Pong!** Bot ping: ${Date.now() - message.createdTimestamp}ms`);
}

module.exports.help = {
    name: "ping",
    description: "Gets a ping",
    usage: "ping"
}