const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const http = require('http');

const express = require('express');
const app = express();

const dashboard = process.env.DASHBOARD;

if (dashboard === 'true') {
let port = require('./config.json').port || 8000;
app.set('port', port);

const session = require('express-session');

app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use(session({
    secret: '48738924783748273742398747238',
    resave: false,
    saveUninitialized: false,
    expires: 604800000,
}));
require('./router')(app);

app.listen(port, () => console.info('Dashboard online on port ${port}'));
} else {
console.info('Dashboard is now disabled. To enable it change the "DASHBOARD" value in .env file to "true" (Now is set to "false").')
}

//const adTimeout = new Set();

const discord_token = process.env.TOKEN;
const prefix = process.env.PREFIX;

const newUsers = new Discord.Collection();
var botMembers = 0;

const Timeout = new Set();

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
  
  let embed = new Discord.RichEmbed()
    .setDescription(`**${member.displayName}#${member.user.discriminator}** has joined the server.`)
    .setThumbnail(member.user.displayAvatarURL)
    .setColor("RANDOM")
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
    .setColor("RANDOM")
    .setTimestamp()
    .setFooter(`Total members: ${member.guild.memberCount}`)    
    
  defaultChannel.send(embed=embed);  
  if(newUsers.has(member.id)) newUsers.delete(member.id);
});

client.on('message', message=> {
     if (message.isMentioned(client.user.id)) {
     if (message.author.bot) return;
     if (!message.guild) return;
	 
    return message.channel.send({embed: {
        color: 16734039,
        title: "Hey! I can only respond to message with my prefix (" + `${prefix}` + ")"
        }})
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


if (message.length >= 2000) {
return message.channel.send({embed: {
                color: 16734039,
                title: "I can't send message longer than 2000 characters :cry:"
            }})
}
client.on("message", message => {
  if (message.author.bot) return;
  if (!message.guild) return;
  
  if(message.content.indexOf(prefix) !== 0) return;

  // This is the best way to define args. Trust me.
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // The list of if/else is replaced with those simple 2 lines:
  try {
	/*if (adTimeout.has(message.author.id)) {
     msg.channel.send("Wait 10 seconds before getting typing this again. - " + msg.author);
    } else {*/
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, message, args);
	
			/*adTimeout.add(message.author.id);
			setTimeout(() => {
				adTimeout.delete(message.author.id);
			}, 10800000);
	}*/
  } catch (err) {
    message.channel.send({embed: {
                color: 16734039,
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