const { MessageEmbed } = require("discord.js");

module.exports = {
 name: "drop-giveaway",
 aliases: [],
 description: "Create a drop giveaway",
 category: "Giveaway",
 usage: "drop-giveaway <winner count> <channel> <prize>",
 run: async (client, message, args) => {
  try {
   if (!args[0]) {
    return client.createError(message, `${client.bot_emojis.error} | You didn't enter the winner count!\n\n**Usage:** \`${client.prefix} giveaway <winner count> <channel> <prize>\``);
   }
   if (isNaN(args[0])) {
    return client.createError(message, `${client.bot_emojis.error} | The winner count must be a number!\n\n**Usage:** \`${client.prefix} giveaway <winner count> <channel> <prize>\``);
   }
   let channel = message.mentions.channels.first();
   if (!channel) {
    return client.createError(message, `${client.bot_emojis.error} | You didn't enter a channel! You must provide a channel in the guild to create giveaway!\n\n**Usage:** \`${client.prefix} giveaway <winner count> <channel> <prize>\``);
   }
   let prize = args.slice(2).join(" ");
   if (!prize) {
    return client.createError(message, `${client.bot_emojis.error} | You must enter a prize to start drop giveaway!\n\n**Usage:** \`${client.prefix} giveaway <winner count> <channel> <prize>\``);
   }
   if (prize.length > client.max_input) {
    return client.createError(message, `${client.bot_emojis.error} | Prize can't be longer than \`${client.max_input}\` characters!\n\n**Usage:** \`${client.prefix} giveaway <winner count> <channel> <prize>\``);
   }
   const success = new MessageEmbed() // Prettier
    .setColor("RANDOM")
    .setTitle(
     `${client.bot_emojis.success} Success!`,
     message.guild.iconURL({
      dynamic: true,
      format: "png",
     })
    )
    .setDescription(":tada: Drop giveaway created in " + `${channel}` + "!")
    .setFooter(
     "This message will be deleted after 10 seconds",
     message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    );
   message.reply({ embeds: [success] }).then((m) =>
    setTimeout(() => {
     if (!m.deleted) m.delete();
    }, 10000)
   );
   client.giveawaysManager.start(channel, {
    isDrop: true,
    winnerCount: parseInt(args[0]),
    prize: `${client.bot_emojis.giveaway} Drop: ${args.slice(2).join(" ")}!`,
    hostedBy: message.author,
    thumbnail: client.user.displayAvatarURL(),
    embedColor: 5793266,
    embedColorEnd: 16711680,
    messages: {
     giveaway: " ",
     giveawayEnded: " ",
     winMessage: { content: "", embed: new MessageEmbed() },
     dropMessage: `> **Be the first to react with ${client.bot_emojis.giveaway}!**`,
     embedFooter: { text: `{this.winnerCount} winner(s)`, iconURL: client.user.displayAvatarURL() },
     noWinner: `> **${client.bot_emojis.error} Giveaway cancelled, no valid participations!**\n`,
     hostedBy: `• ${client.bot_emojis.member} Hosted by ${message.author}`,
     drawing: `\n• ${client.bot_emojis.stopwatch} Drawing winner {timestamp}`,
     winners: "winner(s)",
    },
   });
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
