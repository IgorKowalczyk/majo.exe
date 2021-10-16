const { MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = {
 name: "start-giveaway",
 aliases: ["giveaway", "gstart", "giveaway-start"],
 description: "Create a giveaway",
 category: "Giveaway",
 usage: "start-start-giveaway <time> <winner count> <channel> <prize>",
 run: async (client, message, args) => {
  try {
   if (!args[0]) {
    return client.createError(message, `${client.bot_emojis.error} | You did not specify your time!\n\n**Correct formatting:** \`number<d/h/m>\`.\n**Legend:** \`d\` - Day, \`h\` - Hour/s, \`m\` - Minute/s\n**Usage:** \`${client.prefix} start-giveaway <time> <winner count> <channel> <prize>\``);
   }
   if (!args[0].endsWith("d") && !args[0].endsWith("h") && !args[0].endsWith("m")) {
    return client.createError(message, `${client.bot_emojis.error} | You didn't use the correct formatting for the time!\n\n**Correct formatting:** \`number<d/h/m>\`.\n**Legend:** \`d\` - Day, \`h\` - Hour/s, \`m\` - Minute/s\n**Usage:** \`${client.prefix} start-giveaway <time> <winner count> <channel> <prize>\``);
   }
   if (!args[1]) {
    return client.createError(message, `${client.bot_emojis.error} | You didn't enter the winner count!\n\n**Usage:** \`${client.prefix} start-giveaway <time> <winner count> <channel> <prize>\``);
   }
   if (isNaN(args[1])) {
    return client.createError(message, `${client.bot_emojis.error} | The winner count must be a number!\n\n**Usage:** \`${client.prefix} start-giveaway <time> <winner count> <channel> <prize>\``);
   }
   if (isNaN(args[0][0])) {
    return client.createError(message, `${client.bot_emojis.error} | You didn't specify your time!\n\n**Legend:** \`d\` - Day, \`h\` - Hour/s, \`m\` - Minute/s\n**Usage:** \`${client.prefix} start-giveaway <time> <winner count> <channel> <prize>\``);
   }
   let channel = message.mentions.channels.first();
   if (!channel) {
    return client.createError(message, `${client.bot_emojis.error} | You didn't enter a channel! You must provide a channel in the guild to create giveaway!\n\n**Usage:** \`${client.prefix} start-giveaway <time> <winner count> <channel> <prize>\``);
   }
   let prize = args.slice(3).join(" ");
   if (!prize) {
    return client.createError(message, `${client.bot_emojis.error} | You must enter a prize to start giveaway!\n\n**Usage:** \`${client.prefix} start-giveaway <time> <winner count> <channel> <prize>\``);
   }
   const success = new MessageEmbed() // Prettier
    .setColor("GREEN")
    .setDescription(`> ${client.bot_emojis.giveaway} Giveaway created in ${channel}!`)
    .setFooter(
     `This message will be deleted in 10s • Requested by ${message.author.username}`,
     message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    )
   message.reply({ embeds: [success] }).then((m) =>
    setTimeout(() => {
     if (!m.deleted) m.delete();
    }, 10000)
   );
   client.giveawaysManager.start(channel, {
    duration: ms(args[0]),
    guildId: message.guild.id,
    winnerCount: parseInt(args[1]),
    prize: `${client.bot_emojis.giveaway} Giveaway: ${args.slice(3).join(" ")}!`,
    hostedBy: message.author,
    thumbnail: client.user.displayAvatarURL(),
    embedColor: 5793266,
    embedColorEnd: 16711680,
    messages: {
     giveaway: " ",
     giveawayEnded: " ",
     inviteToParticipate: `> **React with ${client.bot_emojis.giveaway} to participate!**`,
     winMessage: { content: "", embed: new MessageEmbed().setColor("GREEN").setDescription(`${client.bot_emojis.giveaway} Congratulations, {winners}! You won **{this.prize}**!\n[Jump to giveaway!]({this.messageURL})`) },
     embedFooter: { text: `{this.winnerCount} winner(s)`, iconURL: client.user.displayAvatarURL() },
     noWinner: `> **${client.bot_emojis.error} Giveaway cancelled, no valid participations!**\n`,
     drawing: `\n• ${client.bot_emojis.stopwatch} Drawing winner {timestamp}`,
     hostedBy: `• ${client.bot_emojis.member} Hosted by ${message.author}`,
     winners: "winner(s)",
     endedAt: "Ended at",
    },
   });
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
