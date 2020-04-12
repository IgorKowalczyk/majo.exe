const Discord = require("discord.js");

module.exports.run = async (client, message, args, level) => {
 let args = message.content.split(" ").slice(1);
        let thingToEcho = args.join(" ")
        const yes = client.emojis.get("✅");
        const no = client.emojis.get("❌");
        var poll = new Discord.RichEmbed()
        .setAuthor("📜 | Poll")
        .setColor('#36393f')
        .addField(`Please answer with :white_check_mark: or with :x: :`, thingToEcho)
        .setTimestamp()
        message.channel.send(poll)
        .then(message => {
            message.react(yes)
            message.react(no)
        })

}


module.exports.help = {
    name: "poll",
    description: "Create a poll",
    usage: "poll (arguments)",
    type: "Fun"  
}