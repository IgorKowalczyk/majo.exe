const { MessageEmbed } = require("discord.js");
const sql = require("../../../utilities/database");
const prefix = process.env.PREFIX;
const Timeout = new Map();
const ms = require("ms");
const timeout = 10800000;

module.exports = {
 name: "reputation",
 aliases: ["rep"],
 timeout: "250",
 description: "Adds, checks or removes reputation for a user",
 category: "Utility",
 usage: "reputation [+ / add or - / remove] <user>",
 run: async (client, message, args) => {
  try {
   const member = (await message.mentions.members.first()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.guild.members.cache.find((r) => r.displayName.toLowerCase().includes() === args.join(" ").toLocaleLowerCase());
   if (!member) {
    return client.createError(message, `${client.bot_emojis.error} | You must mention vaild member!\n\n**Usage:** \`${client.prefix} reputation [+ / add or - / remove] <user>\``);
   }
   if (args[0] === "+") {
    // Add reputation
    if (member == message.author || member.id == message.author.id) {
     return client.createError(message, `${client.bot_emojis.error} | You can't assign reputation point to yourself!\n\n**Usage:** \`${client.prefix} reputation [+ / add or - / remove] <user>\``);
    }
    const key = message.author.id + "420$%@&$&@!$!@$@";
    const found = Timeout.get(key);
    if (found) {
     const timePassed = Date.now() - found;
     const timeLeft = timeout - timePassed;
     return client.createError(message, `${client.bot_emojis.error} | ${message.author} You have to wait \`${ms(timeLeft)}\` before you can add reputaton again!`);
    }
    const sqlquery = "SELECT reputation AS res FROM users WHERE user_id = " + member.id;
    sql.query(sqlquery, function (error, results, fields) {
     if (error) return console.log(error);
     if (results[0]) {
      const sum = parseInt(Object.values(JSON.parse(JSON.stringify(results[0])))) + 1;
      const update = "UPDATE users SET reputation = " + sum + " WHERE user_id = " + member.id;
      sql.query(update, function (error, results2, fields) {
       if (error) console.log(error);
       return client.createError(message, `${client.bot_emojis.success} | Success! Reputation added! ${member} now has \`${sum}\` reputation points!`, "GREEN");
      });
     } else {
      const insert = "INSERT INTO `users` (`user_id`, `reputation`) VALUES (" + member.id + "," + 1 + ");";
      sql.query(insert, function (error, results3, fields) {
       if (error) console.log(error);
       return client.createError(message, `${client.bot_emojis.success} | Success! Reputation added! ${member} now has \`1\` reputation points!`, "GREEN");
      });
     }
    });
    Timeout.set(key, Date.now());
    setTimeout(() => {
     Timeout.delete(key);
    }, timeout);
   } else if (args[0] === "-") {
    // Remove reputation
    if (member == message.author || member.id == message.author.id) {
     return client.createError(message, `${client.bot_emojis.error} | You can't assign reputation point to yourself!\n\n**Usage:** \`${client.prefix} reputation [+ / add or - / remove] <user>\``);
    }
    const key = message.author.id + "420$%@&$&@!$!@$@";
    const found = Timeout.get(key);
    if (found) {
     const timePassed = Date.now() - found;
     const timeLeft = timeout - timePassed;
     return client.createError(message, `${client.bot_emojis.error} | ${message.author} You have to wait \`${ms(timeLeft)}\` before you can remove reputaton again!`);
    }
    const sqlquery = "SELECT reputation AS res FROM users WHERE user_id = " + member.id;
    sql.query(sqlquery, function (error, results, fields) {
     if (error) return console.log(error);
     if (results[0]) {
      const sum = parseInt(Object.values(JSON.parse(JSON.stringify(results[0])))) - 1;
      const update = "UPDATE users SET reputation = " + sum + " WHERE user_id = " + member.id;
      sql.query(update, function (error, results2, fields) {
       if (error) console.log(error);
       return client.createError(message, `${client.bot_emojis.success} | Success! Reputation removed! ${member} now has \`${sum}\` reputation points!`, "GREEN");
      });
     } else {
      const insert = "INSERT INTO `users` (`user_id`, `reputation`) VALUES (" + member.id + "," + "-1" + ");";
      sql.query(insert, function (error, results3, fields) {
       if (error) console.log(error);
       return client.createError(message, `${client.bot_emojis.success} | Success! Reputation removed! ${member} now has \`-1\` reputation points!`);
      });
     }
    });
    Timeout.set(key, Date.now());
    setTimeout(() => {
     Timeout.delete(key);
    }, timeout);
   } else {
    // Check reputation
    const sqlquery = "SELECT reputation AS res FROM `users` WHERE user_id = " + member.id;
    sql.query(sqlquery, function (error, results, fields) {
     if (error) return console.log(error);
     const embed = new MessageEmbed()
      .setTitle(`${client.bot_emojis.clap} ${member.user.username} Reputation`)
      .setDescription(`${client.bot_emojis.sparkles} ${member} reputation: \`${results[0] ? Object.values(JSON.parse(JSON.stringify(results[0]))) : (rep = 0)}\`\n\n${client.bot_emojis.light_bulb} You can add or remove user reputation by using: \`${prefix} reputation [+/-] <member>\``)
      .setTimestamp()
      .setThumbnail(member.user.displayAvatarURL())
      .setColor("RANDOM")
      .setFooter({
       text: `Requested by ${message.author.username}`,
       iconURL: message.author.displayAvatarURL({
        dynamic: true,
        format: "png",
        size: 2048,
       }),
      });
     message.reply({ embeds: [embed] });
    });
   }
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
