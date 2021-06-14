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
      description: "❌ | You did not specify your time!\nCorrect formatting: `number<d/h/m>`.\nLegend: `d` - Day, `h` - Hour/s, `m` - Minute/s",
     },
    });
   }
   if (!args[0].endsWith("d") && !args[0].endsWith("h") && !args[0].endsWith("m")) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: "❌ | You didn't use the correct formatting for the time!\nCorrect formatting: `number<d/h/m>`.\nLegend: `d` - Day, `h` - Hour/s, `m` - Minute/s",
     },
    });
   }
   if (!args[1]) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: "❌ | You didn't enter the winner count. Eg. `1`",
     },
    });
   }
   if (isNaN(args[1])) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: "❌ | The winner count must be a number. Eg. `1`",
     },
    });
   }
   if (isNaN(args[0][0])) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: "❌ | You didn't specify your time!\nCorrect formatting: `number<d/h/m>`.\nLegend: `d` - Day, `h` - Hour/s, `m` - Minute/s",
     },
    });
   }
   let channel = message.mentions.channels.first();
   if (!channel) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: "❌ | You didn't enter a channel!\nYou must provide a channel in the guild to create giveaway!",
     },
    });
   }
   let prize = args.slice(3).join(" ");
   if (!prize) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: "❌ | You must enter a prize to start giveaway!",
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
     inviteToParticipate: "React with <a:giveaway:843845378352873492> to participate!",
     winMessage: "Congratulations, {winners}! You won **{prize}**!\n{messageURL}",
     embedFooter: "Majo.exe",
     noWinner: "Giveaway cancelled, no valid participations.",
     hostedBy: "Hosted by: {user}",
     winners: "winner(s)",
     endedAt: "Ended at",
    },
   });
   const success = new Discord.MessageEmbed() // Prettier()
    .setColor("RANDOM")
    .setTitle(
     ":white_check_mark: Success!",
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
     description: "Something went wrong... :cry:",
    },
   });
  }
 },
};
