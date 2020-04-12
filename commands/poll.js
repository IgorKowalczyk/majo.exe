const Discord = require("discord.js");

module.exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
if (!args) return message.reply({embed: {
            color: 3447003,
            title: "You must provide a text to ask a question!"
        }})
message.channel.send({embed: {
            color: 3447003,
            title: ":ballot_box: " +`${message.author.username}` + "A vote has begun! React with the emojis to vote! :ballot_box:"
        }})

const pollTopic = await message.channel.send({embed: {
            color: 3447003,
            title: `message.content.slice(2)`
        }})
await pollTopic.react(`✅`);
await pollTopic.react(`⛔`);
// Create a reaction collector
const filter = (reaction) => reaction.emoji.name === '✅';
const collector = pollTopic.createReactionCollector(filter, { time: 15000 });

const filter2 = (reaction) => reaction.emoji.name === '✅';
const collector2 = pollTopic.createReactionCollector(filter2, { time: 15000 });
collector2.on('end', collected => message.channel.send(`${collected.size}/${collected2.size}`));
collector.on('end', collected => message.channel.send(`${collected.size}/${collected2.size}`));
}



module.exports.help = {
    name: "poll",
    description: "Create a poll",
    usage: "poll (arguments)",
    type: "Fun"  
}