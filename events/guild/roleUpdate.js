const Discord = require('discord.js');

module.exports = async (client, oldRole, newRole) => {
try {
    if (oldRole.permissions !== newRole.permissions) {

        const embed = new Discord.MessageEmbed()
            .setAuthor(`Role changed permissions`)
            .setColor("#ffc500")
            .setFooter(`ID: ${newRole.id}`)
            .setTimestamp()

        const oldPerms = oldRole.serialize();
        const newPerms = newRole.serialize();

        const permUpdated = [];

        for (const [key, element] of Object.entries(oldPerms)) {
            if (newPerms[key] !== element) permUpdated.push(key);
        }

        if (oldRole.permissions > newRole.permissions) {
            //Permission lost

            embed.setDescription(`**${newRole.toString()} has lost the ${permUpdated.join(", ")} permission**`)
            logchannel.send(embed).catch()

        } else if (oldRole.permissions < newRole.permissions) {
            //Permission given

            embed.setDescription(`**${newRole.toString()} has been given the ${permUpdated.join(", ")} permission**`)
            logchannel.send(embed).catch()

        }
    }

});
} catch (err) {
 let embed = new Discord.MessageEmbed()
  .setColor("#FF0000")
  .setTitle("Error!")
  .setDescription("**Error Code:** *" + err + "*")
  .setTimestamp();
 return logChannel.send(embed);
}
}
