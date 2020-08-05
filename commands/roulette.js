const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (client, message, args) => {
  let user = message.author;

  function isOdd(num) { 
	if ((num % 2) == 0) return false;
	else if ((num % 2) == 1) return true;
}
    
let colour = args[0];
let money = parseInt(args[1]);
let moneydb = await db.fetch(`money_${message.guild.id}_${user.id}`)

let random = Math.floor(Math.random() * 37);

let moneyhelp = new Discord.RichEmbed()
.setColor("FF5757")
.setDescription(`:x: Specify an amount to gamble | !majo roulette <color> <amount>`);

let moneymore = new Discord.RichEmbed()
.setColor("FF5757")
.setDescription(`:x: You are betting more than you have`);

let colorbad = new Discord.RichEmbed()
.setColor("FF5757")
.setDescription(`:x: Specify a color | Red [1.5x] Black [2x] Green [15x]`);


    if (!colour)  return message.channel.send(colorbad);
    colour = colour.toLowerCase()
    if (!money) return message.channel.send(moneyhelp); 
    if (money > moneydb) return message.channel.send(moneymore);
    
    if (colour == "b" || colour.includes("black")) colour = 0;
    else if (colour == "r" || colour.includes("red")) colour = 1;
    else if (colour == "g" || colour.includes("green")) colour = 2;
    else return message.channel.send(colorbad);
    
    
    
    if (random == 0 && colour == 2) { // Green
        money *= 15
        db.add(`money_${message.guild.id}_${user.id}`, money)
        let moneyEmbed1 = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(`:tada: You won ${money} coins :tada:`)
		.setFooter(`Multiplier: 15x | Color: Green`)
        message.channel.send(moneyEmbed1)
    } else if (isOdd(random) && colour == 1) { // Red
        money = parseInt(money * 1.5)
        db.add(`money_${message.guild.id}_${user.id}`, money)
        let moneyEmbed2 = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(`:tada: You won ${money} coins :tada:`)
	.setFooter(`Multiplier: 1.5x | Color: Red`);
        message.channel.send(moneyEmbed2)
    } else if (!isOdd(random) && colour == 0) { // Black
        money = parseInt(money * 2)
        db.add(`money_${message.guild.id}_${user.id}`, money)
        let moneyEmbed3 = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(`:tada: You won ${money} coins :tada:`)
		.setFooter(`Multiplier: 2x | Color: Black`)
        message.channel.send(moneyEmbed3)
    } else { // Wrong
        db.subtract(`money_${message.guild.id}_${user.id}`, money)
        let moneyEmbed4 = new Discord.RichEmbed()
        .setColor("FF5757")
        .setDescription(`:x: You lost ${money} coins`)
		.setFooter(`Multiplier: 0x | :/`)
        message.channel.send(moneyEmbed4)
    }
}


module.exports.help = {
    name: "roulette",
    description: "Plays a roulette",
    usage: "roulette <color> <amout>",
    type: "Economy"   
}
