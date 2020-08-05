const db = require('quick.db')
const Discord = require('discord.js')
const ms = require("parse-ms");

module.exports.run = async (client, message, args) => {
    let user = message.author;
    let author = await db.fetch(`rob_${message.guild.id}_${user.id}`)

    let timeout = 600000;
    
    if (author !== null && timeout - (Date.now() - author) > 0) {
        let time = ms(timeout - (Date.now() - author));
    
        let timeEmbed = new Discord.RichEmbed()
        .setColor("FF5757")
        .setDescription(`:x:  You have already robbed someone\n\nTry again in ${time.minutes}m ${time.seconds}s `);
        message.channel.send(timeEmbed)
      } else {

        let amount = Math.floor(Math.random() * 80) + 1;
        let embed1 = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(`:white_check_mark: You robbed a someone a and earned ${amount} coins`);
        message.channel.send(embed1)
        
        db.add(`money_${message.guild.id}_${user.id}`, amount)
        db.set(`rob_${message.guild.id}_${user.id}`, Date.now())
    };
}



module.exports.help = {
    name: "rob",
    description: "Rob someone and get a coins",
    usage: "rob",
    type: "Economy"  
}

