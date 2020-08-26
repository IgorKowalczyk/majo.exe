const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const http = require('http');
const db = require("quick.db")
const discord_token = process.env.TOKEN;
const prefix = process.env.PREFIX;
const newUsers = new Discord.Collection();
var botMembers = 0;

/* YOUTUBE SEARCH */
const ytdl = require('ytdl-core');
const search = require('youtube-search');
const queue = new Map();
/* --- */

/* DASHBOARD */
const express = require('express');
const app = express();

const dashboard = process.env.DASHBOARD;

if (dashboard === 'true') {
let port = process.env.PORT || require('./config.json').port || 8000;
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

app.listen(port, () => console.info('Dashboard online on port ' + `${port}`));

app.get("/", (request, response) => {
  response.sendStatus(200);
});
} else {
console.info('Dashboard is now disabled. To enable it change the "DASHBOARD" value in .env file to "true" (Now is set to "' + `${dashboard}` +'").')
}
/* --- */



/* RUN COMMANDS */
client.on("message", message => {
  if (message.author.bot) return;
  if (!message.guild) return;
  
  if(message.content.indexOf(prefix) !== 0) return;
if (message.length >= 1999) {
return message.channel.send({embed: {
                color: 16734039,
                description: "I can't send message longer than 2000 characters :cry:"
            }})
}
  // This is the best way to define args. Trust me.
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // The list of if/else is replaced with those simple 2 lines:
  try {
    let commandFile = require(`./commands/${command}.js`);
	  if(commandFile.length <= 0){
    return console.log("Couldn't find any commands in /commands/ directory!");
	}
    commandFile.run(client, message, args);
  } catch (err) {
	console.log(err);
    message.channel.send({embed: {
                color: 16734039,
                description: "That command does not exist, Take a look at " + `${prefix}` + " help!"
            }})
  }
});

client.on('message', message=> {
     if (message.isMentioned(client.user.id)) {
     if (message.author.bot) return;
     if (!message.guild) return;
	 
    return message.channel.send({embed: {
        color: 16734039,
        description: "Hey! I can only respond to message with my prefix (" + `${prefix}` + ")"
        }})
}
});
/* --- */

/* WELCOME AND BYE MESSAGES */
client.on("guildMemberAdd", (member) => {
	const guild = member.guild;
	let addset = member.guild.channels.find("name", "hello-or-bye")  
    if(addset) {
     const guild = member.guild;
     newUsers.set(member.id, member.user);
     let embed = new Discord.RichEmbed()
      .setDescription(`**${member.displayName}#${member.user.discriminator}** has joined the server.`)
      .setThumbnail(member.user.displayAvatarURL)
      .setColor("RANDOM")
      .setTimestamp()
      .setFooter(`Total members: ${member.guild.memberCount}`)    
    
     addset.send(embed=embed);    
     if (newUsers.size > 5) {
                }
	} else {
	 const guild = member.guild;
     newUsers.set(member.id, member.user);
	 let chx = db.get(`welchannel_${member.guild.id}`);
  
     if(chx === null) {
      return;
     }

     let embed = new Discord.RichEmbed()
      .setDescription(`**${member.displayName}#${member.user.discriminator}** has joined the server.`)
      .setThumbnail(member.user.displayAvatarURL)
      .setColor("RANDOM")
      .setTimestamp()
      .setFooter(`Total members: ${member.guild.memberCount}`)    
  
     client.channels.get(chx).send(embed=embed);
  
     if (newUsers.size > 5) {
       newUsers.clear();
     }
	}
});

client.on("guildMemberRemove", (member) => {
	const guild = member.guild;
	let addset = member.guild.channels.find("name", "hello-or-bye")  
    if(addset) {
     const guild = member.guild;
     newUsers.set(member.id, member.user);
     let embed = new Discord.RichEmbed()
      .setDescription(`**${member.displayName}#${member.user.discriminator}** left the server.`)
      .setThumbnail(member.user.displayAvatarURL)
      .setColor("RANDOM")
      .setTimestamp()
      .setFooter(`Total members: ${member.guild.memberCount}`)    
    
     addset.send(embed=embed);    
     if (newUsers.size > 5) {
                }
	} else {
	 const guild = member.guild;
     newUsers.set(member.id, member.user);
	 let chx2 = db.get(`byechannel_${member.guild.id}`);
  
     if(chx2 === null) {
      return;
     }

     let embed = new Discord.RichEmbed()
      .setDescription(`**${member.displayName}#${member.user.discriminator}** left the server.`)
      .setThumbnail(member.user.displayAvatarURL)
      .setColor("RANDOM")
      .setTimestamp()
      .setFooter(`Total members: ${member.guild.memberCount}`)    
  
     client.channels.get(chx2).send(embed=embed);
  
     if(newUsers.has(member.id)) newUsers.delete(member.id);
	}
});
/* --- */



/* MESSAGES ON CLIENT (BOT) JOIN OR LEAVE */
client.on("guildCreate", guild => {
  const defaultChannel = getDefaultChannel(guild); 
  let embed = new Discord.RichEmbed()
    .setTitle(`Hi!`)
	.setDescription(`Thank you for adding me to the server!`)
    .setColor("RANDOM")
    .setTimestamp()
    
  defaultChannel.send(embed=embed);  
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});
/* --- */



/* LOGS (IN #LOGS CHANNEL) */
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

client.on('messageDelete', message => {  
try {
    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;  
    if(!message.guild.member(client.user).hasPermission('EMBED_LINKS')) return;  
    if(!message.guild.member(client.user).hasPermission('MANAGE_MESSAGES')) return;  
 
    var logChannel = message.guild.channels.find(c => c.name === 'log');  
    if(!logChannel) return;  
 
    let messageDelete = new Discord.RichEmbed()  
    .setTitle('**MESSAGE DELETE**')  
    .setColor('RANDOM')  
    .setThumbnail(message.author.avatarURL)  
    .setDescription(`**\n**:wastebasket: Successfully \`\`DELETE\`\` **MESSAGE** In ${message.channel}\n\n**Channel:** \`\`${message.channel.name}\`\` (ID: ${message.channel.id})\n**Message ID:** ${message.id}\n**Sent By:** <@${message.author.id}> (ID: ${message.author.id})\n**Message:**\n\`\`\`${message}\`\`\``)
    .setTimestamp()  
    .setFooter(message.guild.name, message.guild.iconURL)  
 
    logChannel.send(messageDelete);
} catch (err) {
         let embed = new Discord.RichEmbed()
            .setColor("#FF0000")
            .setTitle("Error!")
            .setDescription("**Error Code:** *" + err + "*")
            .setTimestamp()
            return logChannel.send(embed);
}
});

client.on('messageUpdate', (oldMessage, newMessage) => {  
try {
    if(oldMessage.author.bot) return;
    if(!oldMessage.channel.type === 'dm') return;
    if(!oldMessage.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!oldMessage.guild.member(client.user).hasPermission('MANAGE_MESSAGES')) return;
 
    var logChannel = oldMessage.guild.channels.find(c => c.name === 'log');
    if(!logChannel) return;
 
    if(oldMessage.content.startsWith('https://')) return;  
 
    let messageUpdate = new Discord.RichEmbed()
    .setTitle('**MESSAGE EDIT**')
    .setThumbnail(oldMessage.author.avatarURL)
    .setColor('RANDOM') 
    .setDescription(`**\n**:wrench: Successfully \`\`EDIT\`\` **MESSAGE** In ${oldMessage.channel}\n\n**Channel:** \`\`${oldMessage.channel.name}\`\` (ID: ${oldMessage.channel.id})\n**Message ID:** ${oldMessage.id}\n**Sent By:** <@${oldMessage.author.id}> (ID: ${oldMessage.author.id})\n\n**Old Message:**\`\`\`${oldMessage}\`\`\`\n**New Message:**\`\`\`${newMessage}\`\`\``)
    .setTimestamp()
    .setFooter(oldMessage.guild.name, oldMessage.guild.iconURL)
 
    logChannel.send(messageUpdate);
} catch (err) {
         let embed = new Discord.RichEmbed()
            .setColor("#FF0000")
            .setTitle("Error!")
            .setDescription("**Error Code:** *" + err + "*")
            .setTimestamp()
            return logChannel.send(embed);
}
});

client.on('roleCreate', role => {
try {
    if(!role.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!role.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
 
    var logChannel = role.guild.channels.find(c => c.name === 'log');
    if(!logChannel) return;
 
    role.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
        let roleCreate = new Discord.RichEmbed()
        .setTitle('**ROLE CREATE**')
        .setThumbnail(userAvatar)  
        .setDescription(`**\n**:white_check_mark: Successfully \`\`CREATE\`\` Role.\n\n**Role Name:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
        .setColor('RANDOM') 
        .setTimestamp()
        .setFooter(role.guild.name, role.guild.iconURL)  
   
        logChannel.send(roleCreate);
    })
} catch (err) {
         let embed = new Discord.RichEmbed()
            .setColor("#FF0000")
            .setTitle("Error!")
            .setDescription("**Error Code:** *" + err + "*")
            .setTimestamp()
            return logChannel.send(embed);
}
});

client.on('roleDelete', role => {  
try {
    if(!role.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!role.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
 
    var logChannel = role.guild.channels.find(c => c.name === 'log');
    if(!logChannel) return;
 
    role.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
        let roleDelete = new Discord.RichEmbed()
        .setTitle('**ROLE DELETE**')
        .setThumbnail(userAvatar)  
        .setDescription(`**\n**:white_check_mark: Successfully \`\`DELETE\`\` Role.\n\n**Role Name:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
        .setColor('RANDOM')
        .setTimestamp()  
        .setFooter(role.guild.name, role.guild.iconURL)
 
        logChannel.send(roleDelete);  
    })
} catch (err) {
         let embed = new Discord.RichEmbed()
            .setColor("#FF0000")
            .setTitle("Error!")
            .setDescription("**Error Code:** *" + err + "*")
            .setTimestamp()
            return logChannel.send(embed);
}
});

client.on('roleUpdate', (oldRole, newRole) => {
try {
    if(!oldRole.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!oldRole.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
 
    var logChannel = oldRole.guild.channels.find(c => c.name === 'log');
    if(!logChannel) return;
   
    oldRole.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
   
        if(oldRole.name !== newRole.name) {
            let roleUpdateName = new Discord.RichEmbed()
            .setTitle('**ROLE NAME UPDATE**')  
            .setThumbnail(userAvatar)  
            .setColor('RANDOM') 
            .setDescription(`**\n**:white_check_mark: Successfully \`\`EDITED\`\` Role Name.\n\n**Old Name:** \`\`${oldRole.name}\`\`\n**New Name:** \`\`${newRole.name}\`\`\n**Role ID:** ${oldRole.id}\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(oldRole.guild.name, oldRole.guild.iconURL)
 
            logChannel.send(roleUpdateName);  
        }
        if(oldRole.hexColor !== newRole.hexColor) {  
            if(oldRole.hexColor === '#000000') {  
                var oldColor = '`Default`';  
            }else {
                var oldColor = oldRole.hexColor;
            }    
            if(newRole.hexColor === '#000000') {  
                var newColor = '`Default`';  
            }else {
                var newColor = newRole.hexColor;  
            }  
            let roleUpdateColor = new Discord.RichEmbed()  
            .setTitle('**ROLE COLOR UPDATE**')  
            .setThumbnail(userAvatar)  
            .setColor('RANDOM') 
            .setDescription(`**\n**:white_check_mark: Successfully \`\`EDITED\`\` **${oldRole.name}** Role Color.\n\n**Old Color:** ${oldColor}\n**New Color:** ${newColor}\n**Role ID:** ${oldRole.id}\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()  
            .setFooter(oldRole.guild.name, oldRole.guild.iconURL)
   
            logChannel.send(roleUpdateColor);
        }
        if(oldRole.permissions !== newRole.permissions) {  
            let roleUpdate = new Discord.RichEmbed()  
            .setTitle('**UPDATE ROLE PERMISSIONS**')  
            .setThumbnail(userAvatar)  
            .setColor('RANDOM') 
            .setDescription(`**\n**:first_place: Successfully \`\`CHANGED\`\` **${oldRole.name}** Permissions!\n\n**Old Permissions:** \`\`${oldRole.permissions}\`\`\n**New Permissions:** \`\`${newRole.permissions}\`\`\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(oldRole.guild.name, oldRole.guild.iconURL)
           
            logChannel.send(roleUpdate) 
        }
    })
} catch (err) {
         let embed = new Discord.RichEmbed()
            .setColor("#FF0000")
            .setTitle("Error!")
            .setDescription("**Error Code:** *" + err + "*")
            .setTimestamp()
            return logChannel.send(embed);
}
});

client.on('channelCreate', channel => {
try {
    if(!channel.guild) return;
    if(!channel.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!channel.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
 
    var logChannel = channel.guild.channels.find(c => c.name === 'log');
    if(!logChannel) return;
 
    if(channel.type === 'text') {
        var roomType = 'Text';
    }else
    if(channel.type === 'voice') { 
        var roomType = 'Voice';
    }else
    if(channel.type === 'category') { 
        var roomType = 'Category';
    }
 
    channel.guild.fetchAuditLogs().then(logs => { 
        var userID = logs.entries.first().executor.id; 
        var userAvatar = logs.entries.first().executor.avatarURL;
   
        let channelCreate = new Discord.RichEmbed() 
        .setTitle('**CHANNEL CREATE**') 
        .setThumbnail(userAvatar)
        .setDescription(`**\n**:white_check_mark: Successfully \`\`CREATE\`\` **${roomType}** channel.\n\n**Channel Name:** \`\`${channel.name}\`\` (ID: ${channel.id})\n**By:** <@${userID}> (ID: ${userID})`)
        .setColor('RANDOM') 
        .setTimestamp()
        .setFooter(channel.guild.name, channel.guild.iconURL)
 
        logChannel.send(channelCreate);
    })
} catch (err) {
         let embed = new Discord.RichEmbed()
            .setColor("#FF0000")
            .setTitle("Error!")
            .setDescription("**Error Code:** *" + err + "*")
            .setTimestamp()
            return logChannel.send(embed);
}
}); 

client.on('channelDelete', channel => {
try {
    if(!channel.guild) return;
    if(!channel.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!channel.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
 
    var logChannel = channel.guild.channels.find(c => c.name === 'log');
    if(!logChannel) return; 
 
    if(channel.type === 'text') { 
        var roomType = 'Text';
    }else
    if(channel.type === 'voice') { 
        var roomType = 'Voice';
    }else
    if(channel.type === 'category') { 
        var roomType = 'Category';
    }
 
    channel.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
        let channelDelete = new Discord.RichEmbed()
        .setTitle('**CHANNEL DELETE**')
        .setThumbnail(userAvatar) 
        .setDescription(`**\n**:white_check_mark: Successfully \`\`DELETE\`\` **${roomType}** channel.\n\n**Channel Name:** \`\`${channel.name}\`\` (ID: ${channel.id})\n**By:** <@${userID}> (ID: ${userID})`)
        .setColor('RANDOM') 
        .setTimestamp()
        .setFooter(channel.guild.name, channel.guild.iconURL)
 
        logChannel.send(channelDelete); 
    })
} catch (err) {
         let embed = new Discord.RichEmbed()
            .setColor("#FF0000")
            .setTitle("Error!")
            .setDescription("**Error Code:** *" + err + "*")
            .setTimestamp()
            return logChannel.send(embed);
}
});

client.on('channelUpdate', (oldChannel, newChannel) => {
try {
    if(!oldChannel.guild) return;
 
    var logChannel = oldChannel.guild.channels.find(c => c.name === 'log');
    if(!logChannel) return;
 
    if(oldChannel.type === 'text') {
        var channelType = 'Text';
    }else
    if(oldChannel.type === 'voice') {
        var channelType = 'Voice';
    }else
    if(oldChannel.type === 'category') {
        var channelType = 'Category';
    }
   
    oldChannel.guild.fetchAuditLogs().then(logs => { 
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;

        if(oldChannel.name !== newChannel.name) {
            let newName = new Discord.RichEmbed()
            .setTitle('**CHANNEL EDIT**')
            .setThumbnail(userAvatar)
            .setColor('RANDOM') 
            .setDescription(`**\n**:wrench: Successfully Edited **${channelType}** Channel Name\n\n**Old Name:** \`\`${oldChannel.name}\`\`\n**New Name:** \`\`${newChannel.name}\`\`\n**Channel ID:** ${oldChannel.id}\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp() 
            .setFooter(oldChannel.guild.name, oldChannel.guild.iconURL) 
 
            logChannel.send(newName); 
        }
        if(oldChannel.topic !== newChannel.topic) { 
            let newTopic = new Discord.RichEmbed() 
            .setTitle('**CHANNEL EDIT**') 
            .setThumbnail(userAvatar)
            .setColor('RANDOM') 
            .setDescription(`**\n**:wrench: Successfully Edited **${channelType}** Channel Topic\n\n**Old Topic:**\n\`\`\`${oldChannel.topic || '(Not set)'}\`\`\`\n**New Topic:**\n\`\`\`${newChannel.topic || '(Not set)'}\`\`\`\n**Channel:** ${oldChannel} (ID: ${oldChannel.id})\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(oldChannel.guild.name, oldChannel.guild.iconURL)
 
            logChannel.send(newTopic);
        }
    })
} catch (err) {
         let embed = new Discord.RichEmbed()
            .setColor("#FF0000")
            .setTitle("Error!")
            .setDescription("**Error Code:** *" + err + "*")
            .setTimestamp()
            return logChannel.send(embed);
}
});

client.on('guildBanAdd', (guild, user) => {
try {
    if(!guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
 
    var logChannel = guild.channels.find(c => c.name === 'log'); 
    if(!logChannel) return; 
 
    guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
        if(userID === client.user.id) return;
 
        let banInfo = new Discord.RichEmbed()
        .setTitle('**BAN**')
        .setThumbnail(userAvatar)
        .setColor('RANDOM') 
        .setDescription(`**\n**:airplane: Successfully \`\`BANNED\`\` **${user.username}** From the server!\n\n**User:** <@${user.id}> (ID: ${user.id})\n**By:** <@${userID}> (ID: ${userID})`)
        .setTimestamp()
        .setFooter(guild.name, guild.iconURL)
 
        logChannel.send(banInfo);
    })
} catch (err) {
         let embed = new Discord.RichEmbed()
            .setColor("#FF0000")
            .setTitle("Error!")
            .setDescription("**Error Code:** *" + err + "*")
            .setTimestamp()
            return logChannel.send(embed);
}
});

client.on('guildBanRemove', (guild, user) => {
try {
    if(!guild.member(client.user).hasPermission('EMBED_LINKS')) return; 
    if(!guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
 
    var logChannel = guild.channels.find(c => c.name === 'log'); 
    if(!logChannel) return;
 
    guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
        let unBanInfo = new Discord.RichEmbed()
        .setTitle('**UNBAN**')
        .setThumbnail(userAvatar)
        .setColor('RANDOM') 
        .setDescription(`**\n**:unlock: Successfully \`\`UNBANNED\`\` **${user.username}** From the server\n\n**User:** <@${user.id}> (ID: ${user.id})\n**By:** <@${userID}> (ID: ${userID})`)
        .setTimestamp()
        .setFooter(guild.name, guild.iconURL)
 
        logChannel.send(unBanInfo);
    })
} catch (err) {
         let embed = new Discord.RichEmbed()
            .setColor("#FF0000")
            .setTitle("Error!")
            .setDescription("**Error Code:** *" + err + "*")
            .setTimestamp()
            return logChannel.send(embed);
}
});

client.on('guildMemberUpdate', (oldMember, newMember) => { 
try {
    var logChannel = oldMember.guild.channels.find(c => c.name === 'log'); 
    if(!logChannel) return;
 
    oldMember.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id; 
        var userAvatar = logs.entries.first().executor.avatarURL;
        var userTag = logs.entries.first().executor.tag;
 
        if(oldMember.nickname !== newMember.nickname) {
            if(oldMember.nickname === null) {
                var oldNM = '\`\`???? ??????\`\`';
            }else {
                var oldNM = oldMember.nickname;
            }
            if(newMember.nickname === null) {
                var newNM = '\`\`???? ??????\`\`'; 
            }else {
                var newNM = newMember.nickname;
            }
 
            let updateNickname = new Discord.RichEmbed()
            .setTitle('**UPDATE MEMBER NICKNAME**')
            .setThumbnail(userAvatar)
            .setColor('RANDOM') 
            .setDescription(`**\n**:spy: Successfully \`\`CHANGE\`\` Member Nickname.\n\n**User:** ${oldMember} (ID: ${oldMember.id})\n**Old Nickname:** ${oldNM}\n**New Nickname:** ${newNM}\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(oldMember.guild.name, oldMember.guild.iconURL)
  
            logChannel.send(updateNickname);
        }
        if(oldMember.roles.size < newMember.roles.size) {
            let role = newMember.roles.filter(r => !oldMember.roles.has(r.id)).first();
 
            let roleAdded = new Discord.RichEmbed()
            .setTitle('**ADDED ROLE TO MEMBER**') 
            .setThumbnail(oldMember.guild.iconURL)
            .setColor('RANDOM') 
            .setDescription(`**\n**:white_check_mark: Successfully \`\`ADDED\`\` Role to **${oldMember.user.username}**\n\n**User:** <@${oldMember.id}> (ID: ${oldMember.user.id})\n**Role:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(userTag, userAvatar) 
 
            logChannel.send(roleAdded);
        }
        if(oldMember.roles.size > newMember.roles.size) {
            let role = oldMember.roles.filter(r => !newMember.roles.has(r.id)).first();
 
            let roleRemoved = new Discord.RichEmbed()
            .setTitle('**REMOVED ROLE FROM MEMBER**')
            .setThumbnail(oldMember.guild.iconURL)
            .setColor('RANDOM') 
            .setDescription(`**\n**:negative_squared_cross_mark: Successfully \`\`REMOVED\`\` Role from **${oldMember.user.username}**\n\n**User:** <@${oldMember.user.id}> (ID: ${oldMember.id})\n**Role:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(userTag, userAvatar) 
 
            logChannel.send(roleRemoved);
        }
    })
    if(oldMember.guild.owner.user.id !== newMember.guild.owner.user.id) {
        let newOwner = new Discord.RichEmbed()
        .setTitle('**UPDATE GUILD OWNER**')
        .setThumbnail(oldMember.guild.iconURL)
        .setColor('RANDOM') 
        .setDescription(`**\n**:white_check_mark: Successfully \`\`TRANSFER\`\` The Owner Ship.\n\n**Old Owner:** <@${oldMember.user.id}> (ID: ${oldMember.user.id})\n**New Owner:** <@${newMember.user.id}> (ID: ${newMember.user.id})`)
        .setTimestamp()
        .setFooter(oldMember.guild.name, oldMember.guild.iconURL)
 
        logChannel.send(newOwner);
    }
} catch (err) {
         let embed = new Discord.RichEmbed()
            .setColor("#FF0000")
            .setTitle("Error!")
            .setDescription("**Error Code:** *" + err + "*")
            .setTimestamp()
            return logChannel.send(embed);
}
});

client.on('guildMemberAdd', member => {
try {
  var logChannel = member.guild.channels.find(c => c.name === 'log'); 
  if(!logChannel) return;
  
  let newMember = new Discord.RichEmbed()
  .setTitle('**NEW MEMBER JOINED**') 
  .setThumbnail(member.user.avatarURL)
  .setColor('RANDOM') 
  .setDescription(`**\n**:arrow_lower_right: **${member.user.username}** Has joined the server!\n\n**User:** <@${member.user.id}> (ID: ${member.user.id})\n**Days In Discord:** ${Days(member.user.createdAt)}`)
  .setTimestamp()
  .setFooter(member.user.tag, member.user.avatarURL)
 
  logChannel.send(newMember);
} catch (err) {
         let embed = new Discord.RichEmbed()
            .setColor("#FF0000")
            .setTitle("Error!")
            .setDescription("**Error Code:** *" + err + "*")
            .setTimestamp()
            return logChannel.send(embed);
}
});

function Days(date) {
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    let days = Math.floor(diff / 86400000);
    return days + (days == 1 ? " day" : " days") + " ago";
}
client.on('guildMemberRemove', member => { 
try {
  var logChannel = member.guild.channels.find(c => c.name === 'log'); 
  if(!logChannel) return; 
 
  let leaveMember = new Discord.RichEmbed()
  .setTitle('**USER LEFT**')
  .setThumbnail(member.user.avatarURL)
  .setColor('RANDOM') 
  .setDescription(`**\n**:arrow_upper_left: **${member.user.username}** Left the server.\n\n**User:** <@${member.user.id}> (ID: ${member.user.id})`)  
  .setTimestamp() 
  .setFooter(member.user.tag, member.user.avatarURL)
  
  logChannel.send(leaveMember);
} catch (err) {
         let embed = new Discord.RichEmbed()
            .setColor("#FF0000")
            .setTitle("Error!")
            .setDescription("**Error Code:** *" + err + "*")
            .setTimestamp()
            return logChannel.send(embed);
}
});

client.on('voiceStateUpdate', (voiceOld, voiceNew) => {
 try {
    if(!voiceOld.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!voiceOld.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
 
    var logChannel = voiceOld.guild.channels.find(c => c.name === 'log');
    if(!logChannel) return;
 
    voiceOld.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userTag = logs.entries.first().executor.tag;
        var userAvatar = logs.entries.first().executor.avatarURL;
 

        if(voiceOld.serverMute === false && voiceNew.serverMute === true) {
            let serverMutev = new Discord.RichEmbed()
            .setTitle('**VOICE MUTE**')
            .setThumbnail('https://images-ext-1.discordapp.net/external/pWQaw076OHwVIFZyeFoLXvweo0T_fDz6U5C9RBlw_fQ/https/cdn.pg.sa/UosmjqDNgS.png')
            .setColor('RANDOM') 
            .setDescription(`**User:** <@${voiceOld.user.id}> (ID: ${voiceOld.user.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`)
            .setTimestamp()
            .setFooter(userTag, userAvatar)
 
            logChannel.send(serverMutev);
        }

        if(voiceOld.serverMute === true && voiceNew.serverMute === false) {
            let serverUnmutev = new Discord.RichEmbed()
            .setTitle('**VOICE UNMUTE**')
            .setThumbnail('https://images-ext-1.discordapp.net/external/u2JNOTOc1IVJGEb1uCKRdQHXIj5-r8aHa3tSap6SjqM/https/cdn.pg.sa/Iy4t8H4T7n.png')
            .setColor('RANDOM') 
            .setDescription(`**User:** <@${voiceOld.user.id}> (ID: ${voiceOld.user.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`)
            .setTimestamp()
            .setFooter(userTag, userAvatar)
 
            logChannel.send(serverUnmutev);
        }

        if(voiceOld.serverDeaf === false && voiceNew.serverDeaf === true) {
            let serverDeafv = new Discord.RichEmbed()
            .setTitle('**VOICE DEAFEN**')
            .setThumbnail('https://images-ext-1.discordapp.net/external/7ENt2ldbD-3L3wRoDBhKHb9FfImkjFxYR6DbLYRjhjA/https/cdn.pg.sa/auWd5b95AV.png')
            .setColor('RANDOM') 
            .setDescription(`**User:** <@${voiceOld.user.id}> (ID: ${voiceOld.user.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`)
            .setTimestamp()
            .setFooter(userTag, userAvatar)
 
            logChannel.send(serverDeafv);
        }

        if(voiceOld.serverDeaf === true && voiceNew.serverDeaf === false) {
            let serverUndeafv = new Discord.RichEmbed() 
            .setTitle('**VOICE UNDEAFEN**')
            .setThumbnail('https://images-ext-2.discordapp.net/external/s_abcfAlNdxl3uYVXnA2evSKBTpU6Ou3oimkejx3fiQ/https/cdn.pg.sa/i7fC8qnbRF.png')
            .setColor('RANDOM') 
            .setDescription(`**User:** <@${voiceOld.user.id}> (ID: ${voiceOld.user.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`)
            .setTimestamp()
            .setFooter(userTag, userAvatar)
 
            logChannel.send(serverUndeafv); 
        }
    })

    if(voiceOld.voiceChannelID !== voiceNew.voiceChannelID && !voiceOld.voiceChannel) {
        let voiceJoin = new Discord.RichEmbed()
        .setTitle('**JOIN VOICE ROOM**')
        .setColor('RANDOM') 
        .setThumbnail(voiceOld.user.avatarURL)
        .setDescription(`**\n**:arrow_lower_right: Successfully \`\`JOIN\`\` To Voice Channel.\n\n**Channel:** \`\`${voiceNew.voiceChannel.name}\`\` (ID: ${voiceNew.voiceChannelID})\n**User:** ${voiceOld} (ID: ${voiceOld.id})`)
        .setTimestamp()
        .setFooter(voiceOld.user.tag, voiceOld.user.avatarURL)
 
        logChannel.send(voiceJoin);
    }

    if(voiceOld.voiceChannelID !== voiceNew.voiceChannelID && !voiceNew.voiceChannel) {
        let voiceLeave = new Discord.RichEmbed()
        .setTitle('**LEAVE VOICE ROOM**')
        .setColor('RANDOM') 
        .setThumbnail(voiceOld.user.avatarURL)
        .setDescription(`**\n**:arrow_upper_left: Successfully \`\`LEAVE\`\` From Voice Channel.\n\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannelID})\n**User:** ${voiceOld} (ID: ${voiceOld.id})`)
        .setTimestamp()
        .setFooter(voiceOld.user.tag, voiceOld.user.avatarURL)
 
        logChannel.send(voiceLeave); 
    }

    if(voiceOld.voiceChannelID !== voiceNew.voiceChannelID && voiceNew.voiceChannel && voiceOld.voiceChannel != null) {
        let voiceLeave = new Discord.RichEmbed()
        .setTitle('**CHANGED VOICE ROOM**')
        .setColor('RANDOM') 
        .setThumbnail(voiceOld.user.avatarURL)
        .setDescription(`**\n**:repeat: Successfully \`\`CHANGED\`\` The Voice Channel.\n\n**From:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannelID})\n**To:** \`\`${voiceNew.voiceChannel.name}\`\` (ID: ${voiceNew.voiceChannelID})\n**User:** ${voiceOld} (ID: ${voiceOld.id})`)
        .setTimestamp()
        .setFooter(voiceOld.user.tag, voiceOld.user.avatarURL)
 
        logChannel.send(voiceLeave);
    }
} catch (err) {
         let embed = new Discord.RichEmbed()
            .setColor("#FF0000")
            .setTitle("Error!")
            .setDescription("**Error Code:** *" + err + "*")
            .setTimestamp()
            return logChannel.send(embed);
}
}); 
/* --- */



/* LOGIN AND STATUS */

/* Login */
if (discord_token) {
client.login(discord_token);

client.on("ready", () => {
  console.log(`Connected! Logged in as ${client.user.tag}!`);
});
/* / */
/* Status */
var date = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
const enddate = (new Date().getFullYear()) + "/06/13";
const enddateEEP = (new Date().getFullYear()) + "/04/18";

setInterval(async () => {
    try {
        const statuslist = [

        ];

        if (date == enddate) {
            statuslist.push(
                `🎉 ${client.guilds.size} servers 🎉`,
                `🎉 ${client.users.size} members 🎉`,
                `🎉 ${prefix} help 🎉`,
                `🎉 Happy Birthday Discord! 🎉`
            )
        } else if (date == enddateEEP) {
            statuslist.push(
                `🔥 ${client.guilds.size} servers 🔥`,
                `🔥 ${client.users.size} members 🔥`,
                `🔥 ${prefix} help 🔥`,
                `🔥 EEP 4 LIFE (04/18)! 🔥`
            )
        } else {
            statuslist.push(
                `${client.guilds.size} servers`,
                `${client.users.size} members`,
                `${prefix} help`
            )
        }

        const random = Math.floor(Math.random() * statuslist.length);

        await client.user.setPresence({
            game: {
                name: `${statuslist[random]}`,
                type: 'WATCHING'

            },
            status: "online"
        });

    } catch (err) {
        return console.log(err);
    }
}, 10000);
/* - */
} else {
console.error("Majo.exe Error: Bot token is not provided!! To give your bot life, you need to enter token value in the `.env` file - `TOKEN=Your_Token`. [Token is super-secret - do not share it with anyone!]")
}
/* --- */

// ---------
//    END (of index.js)
// ---------
