const Discord = require("discord.js");
const YOUTUBE_API_KEY = process.env.YOUTUBE;
const YouTubeAPI = require("simple-youtube-api");
const youtube = new YouTubeAPI(YOUTUBE_API_KEY);

module.exports = {
 name: "search",
 aliases: [],
 category: "Music",
 cooldown: 5,
 description: "Search and select videos to play",
 usage: "search (video-url/title/query)",
 run: async (client, message, args) => {
  if (!args.length)
   return message.reply(`Usage: ${message.client.prefix}${module.exports.name} <Video Name>`).catch(console.error);
  if (message.channel.activeCollector)
   return message.reply("A message collector is already active in this channel.");
  if (!message.member.voice.channel)
   return message.reply("You need to join a voice channel first!").catch(console.error);
  const search = args.join(" ");
  const serverIcon = message.guild.iconURL();
  let resultsEmbed = new Discord.MessageEmbed()
   .setAuthor(`Searching for: ${search}`, serverIcon)
   .setThumbnail(serverIcon)
   .setColor("#000001")
   .setFooter(`Requested By ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
   .setTimestamp();  
  try {
   const results = await youtube.searchVideos(search, 10);
   results.map((video, index) => resultsEmbed.addField("\u200b", `${index + 1}. ${video.title}`));
   var resultsMessage = await message.channel.send(resultsEmbed);
   function filter(msg) {
    const pattern = /(^[1-9][0-9]{0,1}$)/g;
    return pattern.test(msg.content) && parseInt(msg.content.match(pattern)[0]) <= 10;
   }
   message.channel.activeCollector = true;
   const response = await message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ["time"] });
   const choice = resultsEmbed.fields[parseInt(response.first()) - 1].name;
   message.channel.activeCollector = false;
   // client.commands.get("play").execute(message, [choice]);
   let commandFile = require(`/commands/play.js`);
   commandFile.run(message, [choice]);
   resultsMessage.delete().catch(console.error);
   } catch (error) {
    console.error(error);
    message.channel.activeCollector = false;
   }
  }
}
