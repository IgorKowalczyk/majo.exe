const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
    if (message.member.hasPermission("MANAGE_MESSAGES")) {
        const member = await message.mentions.members.first() || message.guild.members.get(args[0]);

        if(member) {
          let role = message.guild.roles.find("name", "Muted");
          
          if (!member.roles.has(role.id)) {
            return message.channel.send("This user is not muted!")
          }
          
          await member.removeRole(role);
          message.channel.send(member + " has been Unmuted!");
          
        } else {
          await message.channel.send("Specify a valid user!");
        }
    }
}

module.exports.help = {
    name: "unmute",
    description: "Remove a mute from a user",
    usage: "unmute <mention> or <id>",
    type: "Moderation"  
}