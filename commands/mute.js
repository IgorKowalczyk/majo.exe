const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
    if (message.member.hasPermission("MANAGE_MESSAGES")) {
        const member = await message.mentions.members.first() || message.guild.members.get(args[0]);

        if(member) {
          if (!message.guild.roles.find("name", "Muted")) {
            let role;
            try {
              role = await message.guild.createRole({
                name: "Muted",
                color: "#ff0000",
                permissions: []              
              });

              message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(role, {
                  CREATE_INSTANT_INVITE: false,
                  KICK_MEMBERS: false,
                  BAN_MEMBERS: false,
                  ADMINISTRATOR: false,
                  MANAGE_CHANNELS: false,
                  MANAGE_GUILD: false,
                  ADD_REACTIONS: false,
                  READ_MESSAGES: false,
                  SEND_MESSAGES: false,
                  SEND_TTS_MESSAGES: false,
                  MANAGE_MESSAGES: false,
                  EMBED_LINKS: false,
                  ATTACH_FILES: false,
                  READ_MESSAGE_HISTORY: false,
                  MENTION_EVERYONE: false,
                  EXTERNAL_EMOJIS: false,
                  CONNECT: false,
                  SPEAK: false,
                  MUTE_MEMBERS: false,
                  DEAFEN_MEMBERS: false,
                  MOVE_MEMBERS: false,
                  USE_VAD: false,
                  CHANGE_NICKNAME: true,
                  MANAGE_NICKNAMES: false,
                  MANAGE_ROLES_OR_PERMISSIONS: false,
                  MANAGE_WEBHOOKS: false,
                  MANAGE_EMOJIS: false
                });
              });
              
            } catch (err) {
              console.error(err);  
            }
          } else {
            var role = message.guild.roles.find("name", "Muted");
          }
          
          if (member.roles.has(role.id)) {
            return message.channel.send("This user is already muted!")
          }
          
          await member.addRole(role);
          message.channel.send(member + " has been Muted!");
          
        } else {
          await message.channel.send("Specify a valid user!");
        }
    }
}

module.exports.help = {
    name: "mute",
    description: "Mutes a user",
    usage: "mute <mention> or <id>",
    type: "Moderation"  
}