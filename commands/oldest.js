const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
        let mem = message.guild.members.filter(m => !m.user.client).sort( (a, b) => a.user.createdAt - b.user.createdAt).first()
        const Embed = new Discord.RichEmbed()
        .setTitle(`Oldest user on ${message.guild.name}`)
        .setColor(`RANDOM`)
        .setDescription(`${mem.user.tag} Has a oldest account on ${message.guild.name}! Account created at: ${formatDate(mem.user.createdAt)}`)
        message.channel.send(Embed)
    }

module.exports.help = {
    name: "oldest",
    description: "Display a user oldest server member",
    usage: "oldest",
    type: "Utility"  
}