const Discord = require('discord.js')
const db = require('quick.db')
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args) => {

    let user = message.author;

    let author = db.fetch(`money_${message.guild.id}_${user.id}`)

    let Embed = new Discord.RichEmbed()
    .setColor("FF5757")
    .setDescription(`:cross: You need 2000 coins to purchase Bronze VIP`);

    if (args[0] == 'bronze') {
        if (author < 3500) return message.channel.send(Embed)
        
        db.fetch(`bronze_${message.guild.id}_${user.id}`);
        db.set(`bronze_${message.guild.id}_${user.id}`, true)

        let Embed2 = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(`:white_check_mark:  Purchased Bronze VIP For 3500 Coins`);

        db.subtract(`money_${message.guild.id}_${user.id}`, 3500)
        message.channel.send(Embed2)
    } else if(args[0] == 'nikes') {
        let Embed2 = new Discord.RichEmbed()
        .setColor("FF5757")
        .setDescription(`You need 600 coins to purchase some Nikes`);

        if (author < 600) return message.channel.send(Embed2)
       
        db.fetch(`nikes_${message.guild.id}_${user.id}`)
        db.add(`nikes_${message.guild.id}_${user.id}`, 1)

        let Embed3 = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(`:white_check_mark:  Purchased Fresh Nikes For 600 Coins`);

        db.subtract(`money_${message.guild.id}_${user.id}`, 600)
        message.channel.send(Embed3)
    } else if(args[0] == 'car') {
        let Embed2 = new Discord.RichEmbed()
        .setColor("FF5757")
        .setDescription(`You need 800 coins to purchase a new car`);

        if (author < 800) return message.channel.send(Embed2)
       
        db.fetch(`car_${message.guild.id}_${user.id}`)
        db.add(`car_${message.guild.id}_${user.id}`, 1)

        let Embed3 = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(`:white_check_mark:  Purchased a New Car For 800 Coins`);

        db.subtract(`money_${message.guild.id}_${user.id}`, 800)
        message.channel.send(Embed3)
    } else if(args[0] == 'mansion') {
        let Embed2 = new Discord.RichEmbed()
        .setColor("FF5757")
        .setDescription(` You need 1200 coins to purchase a Mansion`);

        if (author < 1200) return message.channel.send(Embed2)
       
        db.fetch(`house_${message.guild.id}_${user.id}`)
        db.add(`house_${message.guild.id}_${user.id}`, 1)

        let Embed3 = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(`:white_check_mark: Purchased a Mansion For 1200 Coins`);

        db.subtract(`money_${message.guild.id}_${user.id}`, 1200)
        message.channel.send(Embed3)
		
	} else if(args[0] == 'list') {
	let list = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle("List of all items you have to buy:")
     	.addField("Bronze", "Cost: 3500 coins")
		.addField("Nikes", "Cost: 600 coins")
		.addField("Car", "Cost: 800 coins")
		.addField("Mansion", "Cost: 1200 coins")
		message.channel.send(list)
    } else {
        let embed3 = new Discord.RichEmbed()
        .setColor("FF5757")
        .setTitle("Enter an item to buy, type " + `${prefix}` + " buy list to show all things")
        message.channel.send(embed3)
    }

}
  
module.exports.help = {
    name: "buy",
    description: "Buy item from shop, add a `list` arg to display all things",
    usage: "buy <item>",
    type: "Economy"  
}
