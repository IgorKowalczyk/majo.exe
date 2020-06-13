const Discord = require("discord.js");
const cnf = require('../config.json');

module.exports.run = async (client, message, args) => {

const pollmessage = await args.join(" ");

var pollrandom = ["✅", "❌",];  

if (pollmessage.length <= 0) return message.channel.send({embed: {
            color: 16734039,
            description: "You must provide a text to ask a question!"
        }})
const embed = new Discord.RichEmbed()
.setTitle(":ballot_box: " +`${message.author.username}` + " A vote has begun! React with the emojis to vote! :ballot_box:",)
.setColor("RANDOM")
.addField("Pool", pollmessage,)
.setFooter("Note: The voting will be ended in 30 seconds! • Bot created by " + `${cnf.owner}`,)
.setTimestamp()
const pollTopic = await message.channel.send({embed})
await pollTopic.react(`✅`);
await pollTopic.react(`❌`);
// Create a reaction collector
const filter = (reaction) => reaction.emoji.name === '✅';
const collector = pollTopic.createReactionCollector(filter, { time: 30000 });
collector.on('end', collected => message.channel.send({embed: {
            color: 3447003,
            title: ":tada: Collected " + `${collected.size}` + " positive votes! :tada:",
			description: "My answer is: " + pollrandom[Math.floor(Math.random()*pollrandom.length)] + ", but I'm afraid to vote."
        }})
);
}

module.exports.help = {
    name: "poll",
    description: "Create a poll",
    usage: "poll (arguments)",
    type: "Fun"  
}