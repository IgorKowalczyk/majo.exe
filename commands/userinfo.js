const Discord = module.require("discord.js");
const dateFormat = require('dateformat');
dateFormat('dddd, mmmm dS, yyyy, h:MM:ss TT');

const status = {
    online: "Online",
    idle: "Idle",
    dnd: "Do Not Disturb",
    offline: "Offline/Invisible"
  };

module.exports.run = async (client, message, args) => {
    let member = await message.mentions.members.first();

    if (!member) {
      message.delete();
        return await message.channel.send({embed: {
            color: 3447003,
            description: "Mention a valid member!"
        }}).then(msg => msg.delete(2000));
    }

    //How long ago the account was created
    const millisCreated = new Date().getTime() - member.user.createdAt.getTime();
    const daysCreated = millisCreated / 1000 / 60 / 60 / 24;

    //How long about the user joined the server
    const millisJoined = new Date().getTime() - member.joinedAt.getTime();
    const daysJoined = millisJoined / 1000 / 60 / 60 / 24;

    // Slice off the first item (the @everyone)
    let roles = member.roles.array().slice(1).sort((a, b) => a.comparePositionTo(b)).reverse().map(role => role.name);
    if (roles.length < 1) roles = ['None'];

    await message.channel.send({embed: {
        color: 3447003,
        author: {
            name: member.displayName,
            icon_url: member.user.displayAvatarURL
        },
        thumbnail: {
            url: member.user.displayAvatarURL
        },
        fields: [{
            name: "Status",
            value: `${status[member.user.presence.status]}`
          },
          {
            name: 'Game',
            value: `${(member.user.presence.game && member.user.presence.game && member.user.presence.game.name) || 'Not playing a game'}`,
          },          
          {
            name: "Roles",
            value: `${member.roles.filter(r => r.id !== message.guild.id).map(roles => roles.name).join(", ") || "No Roles"}`
          },
          {
            name: "Joined On",
            value: `${dateFormat(member.joinedAt)}`
          },
          {
            name: "Created On",
            value: `${dateFormat(member.user.createdAt)}`
          }
        ],
        timestamp: new Date(),
      }
    });
}

module.exports.help = {
    name: "userinfo",
    description: "Gets userinfo from a mention or id",
    usage: "userinfo <mention> or <id>",
    type: "Utility" 
}