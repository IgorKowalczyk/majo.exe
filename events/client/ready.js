const prefix = process.env.PREFIX;
const { ErelaClient, Utils } = require("erela.js");
const { Collection, MessageEmbed, Discord } = require("discord.js");
const chalk = require('chalk');
const { nodes } = require("../../config.json");

module.exports = (client) => {
try {
 setInterval(() => {
 var date = new Date()	.toJSON().slice(0, 10).replace(/-/g, "/");	
 const enddate = new Date().getFullYear() + "/06/13";	
 const enddateEEP = new Date().getFullYear() + "/04/18";
 const statuslist = [];	
 if (date == enddate) {	
  statuslist.push(	
   `🎉 ${client.guilds.cache.size} servers 🎉`,	
   `🎉 ${client.users.cache.size} members 🎉`,	
   `🎉 ${prefix} help 🎉`,	
   `🎉 Happy Birthday Discord! 🎉`	
  );	
 } else if (date == enddateEEP) {	
  statuslist.push(	
   `🔥 ${client.guilds.cache.size} servers 🔥`,	
   `🔥 ${client.users.cache.size} members 🔥`,	
   `🔥 ${prefix} help 🔥`,	
   `🔥 EEP 4 LIFE (04/18)! 🔥`	
  );	
 } else {	
  statuslist.push(	
   `${client.guilds.cache.size} servers`,	
   `${client.users.cache.size} members`,	
   `${prefix} help`	
  );	
 }	
 const random = Math.floor(Math.random() * (statuslist.length - 1) + 1);
 client.user.setActivity(statuslist[random], { type: 'WATCHING' });
 }, 10000);
} catch(err) {
 console.log(err);
}

client.queue = new Collection();
client.music = new ErelaClient(client, nodes)
 .on("nodeError", console.log)
 .on("nodeConnect", () => console.log(chalk.blue("[Lavalink] Successfully Connected..")))
 .on("queueEnd", player => {
  const embed = new MessageEmbed()
   .setDescription(`\`📛\` | **Song has been:** \`Ended\``)
   .setColor('#000001');
  player.textChannel.send(embed)
  client.music.players.destroy(player.guild.id)
 })

.on("trackStart", ({ textChannel }, { title, duration, uri, identifier, requester, author }) => {
 const player = client.music.players.get(textChannel.guild.id);
 const qduration = Utils.formatTime(player.queue.reduce((acc, cur) => ({ duration: acc.duration + cur.duration })).duration, true);
 const embed = new MessageEmbed()
  .setAuthor(`Starting playing...`, 'https://cdn.discordapp.com/emojis/741605543046807626.gif')
  .setDescription(`**[${title}](${uri})**`)
  .setColor('#000001')
  .setThumbnail(`https://img.youtube.com/vi/${identifier}/hqdefault.jpg`)
  .addField('Author:', author, true)
  .addField('Requester:', requester, true)
  .addField('Current Volume:', player.volume, true)
  .addField('Queue Length:', player.queue.length, true)
  .addField('Duration:', `${Utils.formatTime(duration, true)}`, true)
  .addField('Total Duration:', qduration, true)
  .addField(`Current Duration: \`[0:00 / ${Utils.formatTime(duration, true)}]\``, `\`\`\`🔴 | 🎶──────────────────────────────\`\`\``)
  .setTimestamp();          
 return textChannel.send(embed)
})

client.levels = new Map()
 .set("none", 0.0)
 .set("low", 0.10)
 .set("medium", 0.15)
 .set("high", 0.25);

console.log(chalk.blue("Connected! Logged in as ") + chalk.blue.underline(`${client.user.tag}`) + chalk.blue("!"));
}
