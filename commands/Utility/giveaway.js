const Discord = require("discord.js");
const ms = require("ms");

module.exports = {
 name: "giveaway",
 aliases: ["gstart", "giveaway-start"],
 description: "Create a giveaway",
 category: "Utility",
 usage: "giveaway <time> <winner count> <channel> <prize>",
 run: async (client, message, args) => {
  try {
   if (!args[0]) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | You did not specify your time!\nCorrect formatting: \`number<d/h/m>\`.\nLegend: \`d\` - Day, \`h\` - Hour/s, \`m\` - Minute/s`,
      footer: {
       text: "Syntax: " + process.env.PREFIX + " giveaway <time> <winner count> <channel> <prize>",
      },
     },
    });
   }
   if (!args[0].endsWith("d") && !args[0].endsWith("h") && !args[0].endsWith("m")) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | You didn't use the correct formatting for the time!\nCorrect formatting: \`number<d/h/m>\`.\nLegend: \`d\` - Day, \`h\` - Hour/s, \`m\` - Minute/s`,
      footer: {
       text: "Syntax: " + process.env.PREFIX + " giveaway <time> <winner count> <channel> <prize>",
      },
     },
    });
   }
   if (!args[1]) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | You didn't enter the winner count. Eg. \`1\``,
      footer: {
       text: "Syntax: " + process.env.PREFIX + " giveaway <time> <winner count> <channel> <prize>",
      },
     },
    });
   }
   if (isNaN(args[1])) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | The winner count must be a number. Eg. \`1\``,
      footer: {
       text: "Syntax: " + process.env.PREFIX + " giveaway <time> <winner count> <channel> <prize>",
      },
     },
    });
   }
   if (isNaN(args[0][0])) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | You didn't specify your time!\nCorrect formatting: \`number<d/h/m>\`.\nLegend: \`d\` - Day, \`h\` - Hour/s, \`m\` - Minute/s`,
      footer: {
       text: "Syntax: " + process.env.PREFIX + " giveaway <time> <winner count> <channel> <prize>",
      },
     },
    });
   }
   let channel = message.mentions.channels.first();
   if (!channel) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | You didn't enter a channel!\nYou must provide a channel in the guild to create giveaway!`,
      footer: {
       text: "Syntax: " + process.env.PREFIX + " giveaway <time> <winner count> <channel> <prize>",
      },
     },
    });
   }
   let prize = args.slice(3).join(" ");
   if (!prize) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | You must enter a prize to start giveaway!`,
      footer: {
       text: "Syntax: " + process.env.PREFIX + " giveaway <time> <winner count> <channel> <prize>",
      },
     },
    });
   }
   client.giveawaysManager.start(channel, {
    time: ms(args[0]),
    winnerCount: parseInt(args[1]),
    prize: args.slice(3).join(" "),
    hostedBy: message.author,
    messages: {
     giveaway: " ",
     giveawayEnded: " ",
     timeRemaining: "Time remaining: **{duration}**",
     inviteToParticipate: `React with ${client.bot_emojis.giveaway} to participate!`,
     winMessage: `${client.bot_emojis.giveaway} | Congratulations, {winners}! You won **{prize}**!\n{messageURL}`,
     embedFooter: client.user.username,
     noWinner: "Giveaway cancelled, no valid participations.",
     hostedBy: "Hosted by: {user}",
     winners: "winner(s)",
     endedAt: "Ended at",
    },
   });
   const success = new Discord.MessageEmbed() // Prettier
    .setColor("RANDOM")
    .setTitle(
     `${client.bot_emojis.success} Success!`,
     message.guild.iconURL({
      dynamic: true,
      format: "png",
     })
    )
    .setDescription(":tada: Giveaway created in " + `${channel}` + "!")
    .setFooter(
     "This message will be deleted after 10 seconds",
     message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    );
   message.lineReply(success).then((m) =>
    m.delete({
     timeout: 10000,
    })
   );
  } catch (err) {
   message.lineReply({
    embed: {
     color: 16734039,
     description: `Something went wrong... ${client.bot_emojis.sadness}`,
    },
   });
  }
 },
};
