const Discord = require("discord.js");

module.exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
if (!args) return message.reply("You have to have something to vote on! LOL")
if (!message.content.includes("?")) return message.reply("Include a ? in your vote!")
message.channel.send(`:ballot_box:  ${message.author.username} A vote has begun! React with the emojis to vote! :ballot_box: `);
const pollTopic = await message.channel.send(message.content.slice(2));
await pollTopic.react(`✅`);
await pollTopic.react(`⛔`);
// Create a reaction collector
const filter = (reaction) => reaction.emoji.name === '✅';
const collector = pollTopic.createReactionCollector(filter, { time: 15000 });
collector.on('collect', r => message.channel.send(`Collected ${r.emoji.name}`));
collector.on('end', collected => message.channel.send(`Collected ${collected.size} items`));
}

module.exports.help = {
    name: "poo;",
    description: "Create a pool",
    usage: "pool (arguments)",
    type: "Fun"  
}