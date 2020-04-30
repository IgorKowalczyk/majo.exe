const Discord = module.require("discord.js");
const client = new Discord.Client();
module.exports.run = async (client, message, args) => {
	
        await message.channel.send({embed: {
            color: 3447003,
            title: "🏓 Pinging..."
        }}).then(msg=>{
        const _ = new Discord.RichEmbed()
        .setTitle(':ping_pong: Pong!')
		.addField("Bot ping:", + `${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms`)
		.addField("Api ping:", `${Math.round(client.ws.ping)}ms`)
        .setColor('RANDOM')
		.setTimestamp()
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