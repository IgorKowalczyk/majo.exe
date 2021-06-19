const Discord = require("discord.js");
const ms = require("ms");
const config = require("../../config");
const prefix = process.env.PREFIX;
const Timeout = new Map();

module.exports = async (client, message) => {
 try {
  if (message.author.bot) return;
  if (!message.guild) {
   try {
    const embed = new Discord.MessageEmbed() // Prettier()
     .setTitle(
      `:thinking: Hmm?`,
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     )
     .setColor("RANDOM")
     .setDescription(`Why are you DMing me? I can only respond to commands on servers.\n [Maybe you want to invite me?](https://discord.com/oauth2/authorize/?permissions=${config.premissions}&scope=${config.scopes}&client_id=${client.user.id})`)
     .setTimestamp()
     .setFooter(
      `~${client.user.username} created by ${config.author}`,
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     );
    return message.author.send(embed);
   } catch (err) {
    return;
   }
  }
  if (message.content === `<@${client.user.id}>` || message.content === `<@!${client.user.id}>`) {
   const embed = new Discord.MessageEmbed() // Prettier()
    .setTitle(`<a:sucess:759354039242063903> Hi!`, message.guild.iconURL())
    .setColor("RANDOM")
    .setDescription("I was pinged by you, here I am - " + client.user.username + "! My prefix is `" + prefix + "` To see all  my commands please type `" + prefix + " help`")
    .setTimestamp()
    .setFooter(
     "Requested by " + `${message.author.username}`,
     message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    );
   return message.lineReply(embed);
  }

  if (!message.content.startsWith(prefix)) return;
  if (!message.member) message.member = await message.guild.fetchMember(message);
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd.length === 0) return;
  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  if (!command) {
   return message.lineReply({
    embed: {
     color: 16734039,
     description: "❌ | That command does not exist, Take a look at `" + `${prefix}` + " help`!",
    },
   });
  }
  if (message.content.toLowerCase().includes("process.env")) {
   console.log("[Security Log]: " + message.author.tag + ` (ID: ` + message.author.id + ") used process.env in the " + command.name + " command.");
   return message.lineReply({
    embed: {
     color: 16734039,
     description: "❌ | Majo: The command cannot contain the `process.env` string for safetly reasons. We are sorry...",
    },
   });
  }
  if (command) {
   const timeout = command.timeout || 5000;
   const key = message.author.id + command.name;
   const found = Timeout.get(key);
   if (found) {
    const timePassed = Date.now() - found;
    const timeLeft = timeout - timePassed;
    return message.lineReply({
     embed: {
      color: 16734039,
      description: ` ❌ | ${message.author} slow down! You have to wait \`${ms(timeLeft)}\` before you can use this command again!`,
     },
    });
   } else {
    command.run(client, message, args);
    Timeout.set(key, Date.now());
    setTimeout(() => {
     Timeout.delete(key);
    }, timeout);
   }
  }
 } catch (err) {
  console.log(err);
  message.lineReply({
   embed: {
    color: 16734039,
    description: "❌ | Something went wrong while running this command! Please try again later",
   },
  });
 }
};
