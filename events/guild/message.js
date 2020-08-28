const Discord = require('discord.js');
const prefix = process.env.PREFIX;

module.exports = async (client, message) => {
 try {
  if (message.author.bot) return;
  if (!message.guild) return;

  if (message.content === `<@${client.user.id}>` || message.content === `<@!${client.user.id}>`) {
    const embed = new Discord.MessageEmbed()
   .setTitle(`Hi!`, message.guild.iconURL())
   .setColor('RANDOM')
   .setDescription("I'm a " + client.user.username + "! My prefix is \`" + prefix + "\` To see all commands please type \`" + prefix + " help\`")
   .setTimestamp()
 message.channel.send(embed);
  }

  if (!message.content.startsWith(prefix)) return;

  if (!message.member) message.member = await message.guild.fetchMember(message);

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  if (!command) {
    message.channel.send({
      embed: {
        color: 16734039,
        description:
          "That command does not exist, Take a look at " + `${prefix}` + " help!"
      }
    });
  }
  if (command) {
    command.run(client, message, args);
  }
} catch (err) {
    console.log(err);
    message.channel.send({
      embed: {
        color: 16734039,
        description:
          "That command does not exist, Take a look at " + `${prefix}` + " help!"
      }
    });
  }
};
