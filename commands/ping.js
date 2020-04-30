const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
	
        await message.channel.send(`🏓 Pinging....`).then(msg=>{
        const _ = new Discord.MessageEmbed()
        .setTitle('Pong!')
        .setDescription(`🏓 Pong!\nLatency is ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms\nAPI Latency is ${Math.round(bot.ws.ping)}ms`)
        .setColor('RANDOM')
        msg.edit(_);
        msg.edit("\u200B")
    })
}



module.exports.help = {
    name: "ping",
    description: "Gets a ping",
    usage: "ping",
    type: "General"
}