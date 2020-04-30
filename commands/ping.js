const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
	
        await message.channel.send(`🏓 Pinging....`).then(msg=>{
        const _ = new Discord.MessageEmbed()
        color: 3447003,
        title: "Test",
		description: "Bot ping: ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms\nAPI ping: ${Math.round(client.ws.ping)}ms"
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