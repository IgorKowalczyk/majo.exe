const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const http = require('http');
const express = require('express');
const app = express();

const discord_token = process.env.TOKEN;
const prefix = process.env.PREFIX;

const newUsers = new Discord.Collection();
var botMembers = 0;


/*const cnf = require('../config.json');

client.music = require("discord.js-musicbot-addon");
client.music.start(client, {
    youtubeKey: cnf.api,
    anyoneCanSkip: true,
    ownerOverMember: true,
    inlineEmbeds: true,
    musicPresence: false,
    clearPresence: true,
    defVolume: cnf.defaultvolume,
    botPrefix: prefix,
    djRole: cnf.musicrole,
    embedColor: cnf.colour,
    ownerID: cnf.ownerid,
    cooldown: {
      enabled: false,
      timer: 1000,
      exclude: ["volume","queue","pause","resume","np"]
    }
  });
*/

app.get("/", (request, response) => {
  response.sendStatus(200);
});

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

client.on('message', message=> {
     if (message.isMentioned(client.user.id)) {
     if (message.author.bot) return;
     if (!message.guild) return;
    message.channel.send({embed: {
            color: 3447003,
            title: "Hey! I can only respond to message with my prefix (" + `${prefix}` + ")"
        }})
	return;
}
});

setInterval(async () => {
    const statuslist = [
      `${client.guilds.size} servers`,
      `${client.users.size} members`,
      `${prefix} help`,
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
                title: "That command does not exist, Take a look at " + `${prefix}` + " help!"
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

client.login(discord_token);