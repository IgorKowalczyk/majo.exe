const { MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = async (client, interaction, args) => {
 try {
  if (!interaction.member.permissions.has("MANAGE_GUILD")) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | You can't create giveaway. Missing permission: \`MANAGE_GUILD\``);
  }
  if (!interaction.member.permissions.has("MANAGE_MESSAGES")) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | You can't create giveaway. Missing permission: \`MANAGE_MESSAGES\``);
  }
  if (!args[0]) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | You did not specify your time!\n\n**Correct formatting:** \`number<d/h/m>\`.\n**Legend:** \`d\` - Day, \`h\` - Hour/s, \`m\` - Minute/s`);
  }
  if (!args[0].endsWith("d") && !args[0].endsWith("h") && !args[0].endsWith("m")) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | You didn't use the correct formatting for the time!\n\n**Correct formatting:** \`number<d/h/m>\`.\n**Legend:** \`d\` - Day, \`h\` - Hour/s, \`m\` - Minute/s`);
  }
  if (!args[1]) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | You didn't enter the winner count!`);
  }
  if (isNaN(args[1])) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | The winner count must be a number!`);
  }
  if (isNaN(args[0][0])) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | You didn't specify time!`);
  }
  let channel = interaction.guild.channels.cache.get(args[2]);
  if (!channel) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | You didn't enter a channel! You must provide a channel in the guild to create giveaway!\n\n**Usage:** \`/start-giveaway <time> <winner count> <channel> <prize>\``);
  }
  if (!interaction.guild.me.permissionsIn(channel).has("VIEW_CHANNEL")) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | You can't create giveaway in this channel! I'm missing permission \`VIEW_CHANNEL\``);
  }
  if (!interaction.guild.me.permissionsIn(channel).has("SEND_MESSAGES")) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | You can't create giveaway in this channel! I'm missing permission \`SEND_MESSAGES\``);
  }
  if (!interaction.guild.me.permissionsIn(channel).has("ADD_REACTIONS")) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | You can't create giveaway in this channel! I'm missing permission \`ADD_REACTIONS\``);
  }
  if (!interaction.guild.me.permissionsIn(channel).has("USE_EXTERNAL_EMOJIS")) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | You can't create giveaway in this channel! I'm missing permission \`USE_EXTERNAL_EMOJIS\``);
  }
  if (!interaction.guild.me.permissionsIn(channel).has("EMBED_LINKS")) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | You can't create giveaway in this channel! I'm missing permission \`EMBED_LINKS\``);
  }
  if (!interaction.member.permissionsIn(channel).has("VIEW_CHANNEL")) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | You can't create giveaway in this channel! You are missing permission \`VIEW_CHANNEL\``);
  }
  if (!interaction.member.permissionsIn(channel).has("SEND_MESSAGES")) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | You can't create giveaway in this channel! You are missing permission \`SEND_MESSAGES\``);
  }
  if (!interaction.member.permissionsIn(channel).has("ADD_REACTIONS")) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | You can't create giveaway in this channel! You are missing permission \`ADD_REACTIONS\``);
  }
  if (!interaction.member.permissionsIn(channel).has("USE_EXTERNAL_EMOJIS")) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | You can't create giveaway in this channel! You are missing permission \`USE_EXTERNAL_EMOJIS\``);
  }
  if (!interaction.member.permissionsIn(channel).has("EMBED_LINKS")) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | You can't create giveaway in this channel! You are missing permission \`EMBED_LINKS\``);
  }
  let prize = args.slice(3).join(" ");
  if (!prize) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | You must enter a prize to start giveaway!\n\n**Usage:** \`/start-giveaway <time> <winner count> <channel> <prize>\``);
  }
  if (prize.length > client.max_input) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | Prize can't be longer than \`${client.max_input}\` characters!`);
  }
  client.giveawaysManager
   .start(channel, {
    duration: ms(args[0]),
    guildId: interaction.guild.id,
    winnerCount: parseInt(args[1]),
    prize: `${client.bot_emojis.giveaway} Giveaway: ${args.slice(3).join(" ")}!`,
    hostedBy: interaction.user,
    thumbnail: client.user.displayAvatarURL(),
    embedColor: 5793266,
    embedColorEnd: 16711680,
    messages: {
     giveaway: null,
     giveawayEnded: null,
     inviteToParticipate: `> **React with ${client.bot_emojis.giveaway} to participate!**`,
     winMessage: {
      replyToGiveaway: true,
      embed: new MessageEmbed() // Prettier
       .setColor(5793266)
       .setTimestamp()
       .setDescription(`>>> **Congratulations {winners}!**\n**You won: \`${args.slice(3).join(" ")}\`**\n\n[${client.bot_emojis.link} Link to giveaway]({this.messageURL})`)
       .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
       .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() }),
     },
     embedFooter: { text: `{this.winnerCount} winner(s)`, iconURL: client.user.displayAvatarURL() },
     noWinner: `> **${client.bot_emojis.error} Giveaway cancelled, no valid participations!**\n`,
     drawing: `\n• ${client.bot_emojis.stopwatch} Drawing winner {timestamp}`,
     hostedBy: `• ${client.bot_emojis.member} Hosted by ${interaction.user}`,
     winners: "Winner(s): ",
     endedAt: "Ended at",
    },
   })
   .then((s) => {
    const success = new MessageEmbed() // Prettier
     .setColor("GREEN")
     .setTitle(`${client.bot_emojis.success} Success!`)
     .setDescription("> :tada: Giveaway created in " + `${channel}` + "!")
     .setFooter({
      text: "This message will be deleted after 10 seconds!",
      iconURL: interaction.user.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     });
    interaction.followUp({ embeds: [success], ephermal: true }).then((m) =>
     setTimeout(() => {
      if (m.deletable) m.delete();
     }, 10000)
    );
   });
 } catch (err) {
  console.log(err);
  return client.createSlashCommandError(interaction, err);
 }
};
