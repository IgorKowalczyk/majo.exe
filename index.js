const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const http = require('http');
const express = require('express');
const app = express();
const ytdl = require('ytdl-core'); // To music commands
const request = require('request'); // To music commands
const getYoutubeID = require('get-youtube-id'); // To music commands
const youtubeInfo = require('youtube-info'); // To music commands
require('dotenv').config();

let config = require('./settings.json'); // Music commands settings

const youtubeAPIKey = process.env.YOUTUBE_API_KEY; // Youtube api key (Required to music commands
const botMaster = process.env.BOT_MASTER; // Not used yet
const role = process.env.role; // eg. DJ

const discord_token = process.env.TOKEN;
const prefix = process.env.PREFIX;

const newUsers = new Discord.Collection();
var botMembers = 0;

app.get("/", (request, response) => {
  response.sendStatus(200);
});

app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

if (!guilds[message.guild.id]) {
    guilds[message.guild.id] = {
      queue: [],
      queueNames: [],
      isPlaying: false,
      dispatcher: null,
      voiceChannel: null,
      skipReq: 0,
      skippers: [], 
      playedTracks: []
    };
  }

function getDefaultChannel(guild) { 
  if (guild.systemChannelID) 
    if (guild.channels.get(guild.systemChannelID).permissionsFor(guild.client.user).has("SEND_MESSAGES")) return guild.channels.get(guild.systemChannelID)  
  
  if(guild.channels.exists("name", "general"))
    if (guild.channels.find("name", "general").permissionsFor(guild.client.user).has("SEND_MESSAGES")) return guild.channels.find("name", "general")   

  return guild.channels
   .filter(c => c.type === "text" &&
     c.permissionsFor(guild.client.user).has("SEND_MESSAGES"))
   .first();  
}

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  const defaultChannel = getDefaultChannel(guild); 
  newUsers.set(member.id, member.user);



let roleName = '.exe';
let newrole = guild.roles.find(x => x.name == roleName);
if(!newrole) {
guild.createRole({name:".exe", color: "FFFFFF", CREATE_INSTANT_INVITE: true,
  KICK_MEMBERS: false,
  BAN_MEMBERS: false,
  ADMINISTRATOR: false,
  MANAGE_CHANNELS: false,
  MANAGE_GUILD: false,
  ADD_REACTIONS: true,
  READ_MESSAGES: true,
  SEND_MESSAGES: true,
  SEND_TTS_MESSAGES: false,
  MANAGE_MESSAGES: false,
  EMBED_LINKS: true,
  ATTACH_FILES: true,
  READ_MESSAGE_HISTORY: true,
  MENTION_EVERYONE: true,
  EXTERNAL_EMOJIS: false,
  CONNECT: true,
  SPEAK: true,
  MUTE_MEMBERS: false,
  DEAFEN_MEMBERS: false,
  MOVE_MEMBERS: false,
  USE_VAD: false,
  CHANGE_NICKNAME: true,
  MANAGE_NICKNAMES: false,
  MANAGE_ROLES_OR_PERMISSIONS: false,
  MANAGE_WEBHOOKS: false,
  MANAGE_EMOJIS: false});
}
else {
var role = guild.roles.find(role => role.name === ".exe");
member.addRole(role);
}
  
  let embed = new Discord.RichEmbed()
    .setDescription(`**${member.displayName}#${member.user.discriminator}** has joined the server.`)
    .setThumbnail(member.user.displayAvatarURL)
    .setColor("55A202")
    .setTimestamp()
    .setFooter(`Total members: ${member.guild.memberCount}`)    
    
  defaultChannel.send(embed=embed);    
  if (newUsers.size > 5) {
    newUsers.clear();
  }
});

client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  const defaultChannel = getDefaultChannel(guild); 
  newUsers.set(member.id, member.user);

  let embed = new Discord.RichEmbed()
    .setDescription(`**${member.displayName}#${member.user.discriminator}** left the server.`)
    .setThumbnail(member.user.displayAvatarURL)
    .setColor("D0021B")
    .setTimestamp()
    .setFooter(`Total members: ${member.guild.memberCount}`)    
    
  defaultChannel.send(embed=embed);  
  if(newUsers.has(member.id)) newUsers.delete(member.id);
});

setInterval(async () => {
    const statuslist = [
      `${client.guilds.size} servers`,
      `${client.users.size} members`,
      `!majo help`,
    ];
    const random = Math.floor(Math.random() * statuslist.length);

    try {
      await client.user.setPresence({
          game: {
          name: `${statuslist[random]}`,
          type: 'WATCHING'
          
        },
        status: "online"
      });
    } catch (error) {
      console.error(error);
    }
}, 10000);

client.on("message", message => {
  if (message.author.bot) return;
  if (!message.guild) return;
  
  if(message.content.indexOf(prefix) !== 0) return;

  // This is the best way to define args. Trust me.
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // The list of if/else is replaced with those simple 2 lines:
  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, message, args);
  } catch (err) {
    message.channel.send({embed: {
                color: 3447003,
                title: "That command does not exist, Take a look at !majo help!"
            }})
  }
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});

client.on("ready", () => {
  console.log(`Connected! Logged in as ${client.user.tag}!`);
});

/* To music commands */

function isYoutube(str) {
  return str.toLowerCase().indexOf('youtube.com') > -1;
}

function searchVideo(query, callback) {
  request('https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=' +
  encodeURIComponent(query) + '&key=' + youtubeAPIKey,
  function (error, response, body) {
    var json = JSON.parse(body);
    if (!json.items[0]) {
      callback('5FjWe31S_0g');
    } else {
      callback(json.items[0].id.videoId);
    }
  });
}

function getID(str, callback) {
  if (isYoutube(str)) {
    callback(getYoutubeID(str));
  } else {
    searchVideo(str, function (id) {
      callback(id);
    });
  }
}

function addToQueue(strID, message) {
  if (isYoutube(strID)) {
    guilds[message.guild.id].queue.push(getYoutubeID(strID));
  } else {
    guilds[message.guild.id].queue.push(strID);
  }
}

function playMusic(id, message) {
  guilds[message.guild.id].voiceChannel = message.member.voiceChannel;

  guilds[message.guild.id].voiceChannel.join().then(function (connection) {
    stream = ytdl('https://www.youtube.com/watch?v=' + id, {
      filter: 'audioonly',
    });
    guilds[message.guild.id].skipReq = 0;
    guilds[message.guild.id].skippers = [];

    guilds[message.guild.id].dispatcher = connection.playStream(stream);
    guilds[message.guild.id].dispatcher.on('end', function () {
      guilds[message.guild.id].skipReq = 0;
      guilds[message.guild.id].skippers = [];
      guilds[message.guild.id].queue.shift();
      guilds[message.guild.id].queueNames.shift();
      if (guilds[message.guild.id].queue.length === 0) {
        guilds[message.guild.id].queue = [];
        guilds[message.guild.id].queueNames = [];
        guilds[message.guild.id].isPlaying = false;
      } else {
        setTimeout(function () {
          playMusic(guilds[message.guild.id].queue[0], message);
        }, 500);
      }
    });
  });
}

function skipMusic(message) {
  guilds[message.guild.id].dispatcher.end();
}

function addToPlayedTracks(message, videoInfo, user){
  let trackInfo = {
    title: videoInfo.title, 
    url: videoInfo.url, 
    dateVal: Date.now(), 
    username: user.username
  };
  guilds[message.guild.id].playedTracks.push(trackInfo);
  if (guilds[message.guild.id].playedTracks.length > 100){
    guilds[message.guild.id].playedTracks.shift();
  }
}

function getPlayedTracksText(message, trackCount, includeUsers, includeTimes){
  const playedTracks = guilds[message.guild.id].playedTracks;
  if (trackCount == undefined){
    trackCount = playedTracks.length;
  }
  const startIndex = trackCount >= playedTracks.length ? 0 : playedTracks.length - trackCount;
  let tracksText = '';
  for (let i = startIndex; i < playedTracks.length; i++){
    const trackNum = i - startIndex + 1;
    tracksText += `${trackNum}: ${playedTracks[i].title} (<${playedTracks[i].url}>)${(includeUsers ? ' by ' + playedTracks[i].username : '')}${(includeTimes ? ' at ' + formatDate(playedTracks[i].dateVal) : '')}\n`;
  }
  return tracksText.trim();
}

function splitTextByLines(text, maxCharsPerText){
  if (text == undefined || text.length == 0){
    return [];
  }
  if (maxCharsPerText == undefined){
    maxCharsPerText = 2000;
  }
  const lines = text.split('\n');
  let messages = [''];
  let charCount = 0;
  let messageIndex = 0;
  for (let i = 0; i < lines.length; i++){
    const line = lines[i] + '\n';
    charCount += line.length;
    if (charCount <= maxCharsPerText){
      messages[messageIndex] += line;
    } else {
      let lineTextRemaining = line;
      while (charCount > maxCharsPerText){
        let currentLineText = lineTextRemaining.substr(0, maxCharsPerText);
        messages.push(currentLineText);
        messageIndex++;
        charCount -= maxCharsPerText;
        if (charCount > 0){
          let startSplitIndex = maxCharsPerText <= lineTextRemaining.length ? maxCharsPerText : lineTextRemaining.length - 1;
          lineTextRemaining = lineTextRemaining.substring(startSplitIndex, lineTextRemaining.length);
        } else {
          charCount = 0
        }
      }
    }
  }
  for (let i = 0; i < messages.length; i++){
    messages[i] = messages[i].trim();
  }
  return messages;
}

function tryParseInt(arg, defaultVal){
  if (defaultVal == undefined){
    defaultVal = 0;
  }
  try {
    let argNum = parseInt(arg);
    if (!isNaN(argNum)){
      return argNum;
    }
    return defaultVal;
  } catch (parseException){
    return defaultVal;
  }
}

//YYYY-MM-DD hh:mm:ss UTC
function formatDate(dateValue){
  const date = new Date(dateValue);
  return `${date.getUTCFullYear()}-${padTo2DigitInt(date.getUTCMonth() + 1)}-${padTo2DigitInt(date.getUTCDate())} ${padTo2DigitInt(date.getUTCHours())}:${padTo2DigitInt(date.getUTCMinutes())}:${padTo2DigitInt(date.getUTCSeconds())} UTC`;
}

function padTo2DigitInt(intValue){
  return intValue > 9 ? '' + intValue: '0' + intValue;
}

client.login(discord_token);