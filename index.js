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

const CONFIG = require('./config');

app.get("/", (request, response) => {
  response.sendStatus(200);
});

app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

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
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("ready", () => {
  console.log(`Connected! Logged in as ${client.user.tag}!`);
});



// If there isn't a reaction for every role, alert the user
if (CONFIG.roles.length !== CONFIG.reactions.length)
    throw "Roles list and reactions list are not the same length! Please double check this in the config.js file";

// Function to generate the role messages, based on your settings
function generateMessages() {
    return CONFIG.roles.map((r, e) => {
        return {
            role: r,
            message: `React below to get the **"${r}"** role!`, //DONT CHANGE THIS,
            emoji: CONFIG.reactions[e]
        };
    });
}

// Function to generate the embed fields, based on your settings and if you set "const embed = true;"
function generateEmbedFields() {
    return CONFIG.roles.map((r, e) => {
        return {
            emoji: CONFIG.reactions[e],
            role: r
        };
    });
}


// Handles the creation of the role reactions. Will either send the role messages separately or in an embed
client.on("message", message => {
    // Make sure bots can't run this command
    if (message.author.bot) return;

    // Make sure the command can only be ran in a server
    if (!message.guild) return;

    // We don't want the bot to do anything further if it can't send messages in the channel
    if (message.guild && !message.channel.permissionsFor(message.guild.me).missing('SEND_MESSAGES')) return;

    if ((message.author.id !== CONFIG.yourID) && (message.content.toLowerCase() !== CONFIG.setupCMD)) return;

    if (CONFIG.deleteSetupCMD) {
        const missing = message.channel.permissionsFor(message.guild.me).missing('MANAGE_MESSAGES');
        // Here we check if the bot can actually delete messages in the channel the command is being ran in
        if (missing.includes('MANAGE_MESSAGES'))
            throw new Error("I need permission to delete your command message! Please assign the 'Manage Messages' permission to me in this channel!");
        message.delete().catch(O_o=>{});
    }

    const missing = message.channel.permissionsFor(message.guild.me).missing('MANAGE_MESSAGES');
    // Here we check if the bot can actually add recations in the channel the command is being ran in
    if (missing.includes('ADD_REACTIONS'))
        throw new Error("I need permission to add reactions to these messages! Please assign the 'Add Reactions' permission to me in this channel!");

    if (!CONFIG.embed) {
        if (!CONFIG.initialMessage || (CONFIG.initialMessage === '')) 
            throw "The 'initialMessage' property is not set in the config.js file. Please do this!";

        message.channel.send(CONFIG.initialMessage);

        const messages = generateMessages();
        for (const { role, message: msg, emoji } of messages) {
            if (!message.guild.roles.find(r => r.name === role))
                throw `The role '${role}' does not exist!`;

            message.channel.send(msg).then(async m => {
                const customCheck = message.guild.emojis.find(e => e.name === emoji);
                if (!customCheck) await m.react(emoji);
                else await m.react(customCheck.id);
            }).catch(console.error);
        }
    } else {
        if (!CONFIG.embedMessage || (CONFIG.embedMessage === ''))
            throw "The 'embedMessage' property is not set in the config.js file. Please do this!";
        if (!CONFIG.embedFooter || (CONFIG.embedMessage === ''))
            throw "The 'embedFooter' property is not set in the config.js file. Please do this!";

        const roleEmbed = new RichEmbed()
            .setDescription(CONFIG.embedMessage)
            .setFooter(CONFIG.embedFooter);

        if (CONFIG.embedColor) roleEmbed.setColor(CONFIG.embedColor);

        if (CONFIG.embedThumbnail && (CONFIG.embedThumbnailLink !== '')) 
            roleEmbed.setThumbnail(CONFIG.embedThumbnailLink);
        else if (CONFIG.embedThumbnail && message.guild.icon)
            roleEmbed.setThumbnail(message.guild.iconURL);

        const fields = generateEmbedFields();
        if (fields.length > 25) throw "That maximum roles that can be set for an embed is 25!";

        for (const { emoji, role } of fields) {
            if (!message.guild.roles.find(r => r.name === role))
                throw `The role '${role}' does not exist!`;

            const customEmote = client.emojis.find(e => e.name === emoji);
            
            if (!customEmote) roleEmbed.addField(emoji, role, true);
            else roleEmbed.addField(customEmote, role, true);
        }

        message.channel.send(roleEmbed).then(async m => {
            for (const r of CONFIG.reactions) {
                const emoji = r;
                const customCheck = client.emojis.find(e => e.name === emoji);
                
                if (!customCheck) await m.react(emoji);
                else await m.react(customCheck.id);
            }
        });
    }
});

// This makes the events used a bit more readable
const events = {
	MESSAGE_REACTION_ADD: 'messageReactionAdd',
	MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
};

// This event handles adding/removing users from the role(s) they chose based on message reactions
client.on('raw', async event => {
    if (!events.hasOwnProperty(event.t)) return;

    const { d: data } = event;
    const user = client.users.get(data.user_id);
    const channel = client.channels.get(data.channel_id);

    const message = await channel.fetchMessage(data.message_id);
    const member = message.guild.members.get(user.id);

    const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
    let reaction = message.reactions.get(emojiKey);

    if (!reaction) {
        // Create an object that can be passed through the event like normal
        const emoji = new Emoji(client.guilds.get(data.guild_id), data.emoji);
        reaction = new MessageReaction(message, emoji, 1, data.user_id === client.user.id);
    }

    let embedFooterText;
    if (message.embeds[0]) embedFooterText = message.embeds[0].footer.text;

    if (
        (message.author.id === client.user.id) && (message.content !== CONFIG.initialMessage || 
        (message.embeds[0] && (embedFooterText !== CONFIG.embedFooter)))
    ) {

        if (!CONFIG.embed && (message.embeds.length < 1)) {
            const re = `\\*\\*"(.+)?(?="\\*\\*)`;
            const role = message.content.match(re)[1];

            if (member.id !== client.user.id) {
                const guildRole = message.guild.roles.find(r => r.name === role);
                if (event.t === "MESSAGE_REACTION_ADD") member.addRole(guildRole.id);
                else if (event.t === "MESSAGE_REACTION_REMOVE") member.removeRole(guildRole.id);
            }
        } else if (CONFIG.embed && (message.embeds.length >= 1)) {
            const fields = message.embeds[0].fields;

            for (const { name, value } of fields) {
                if (member.id !== client.user.id) {
                    const guildRole = message.guild.roles.find(r => r.name === value);
                    if ((name === reaction.emoji.name) || (name === reaction.emoji.toString())) {
                        if (event.t === "MESSAGE_REACTION_ADD") member.addRole(guildRole.id);
                        else if (event.t === "MESSAGE_REACTION_REMOVE") member.removeRole(guildRole.id);
                    }
                }
            }
        }
    }
});


client.login(discord_token);