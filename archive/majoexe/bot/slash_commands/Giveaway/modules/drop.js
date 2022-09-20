const { MessageEmbed } = require("discord.js");

module.exports = async (client, interaction, args) => {
 try {
  if (!interaction.member.permissions.has("MANAGE_GUILD")) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | You can't create drop giveaway. Missing permission: \`MANAGE_GUILD\``);
  }
  if (!interaction.member.permissions.has("MANAGE_MESSAGES")) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | You can't create drop giveaway. Missing permission: \`MANAGE_MESSAGES\``);
  }
  if (!args[0]) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | You didn't enter the winner count!`);
  }
  if (isNaN(args[0])) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | The winner count must be a number!`);
  }
  let channel = interaction.guild.channels.cache.get(args[1]);
  if (!channel) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | You didn't enter a channel! You must provide a channel in the guild to create giveaway!`);
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
  let prize = args.slice(2).join(" ");
  if (!prize) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | You must enter a prize to start drop giveaway!`);
  }
  if (prize.length > client.max_input) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | Prize can't be longer than \`${client.max_input}\` characters!`);
  }
  client.giveawaysManager
   .start(channel, {
    isDrop: true,
    winnerCount: parseInt(args[0]),
    prize: `${client.bot_emojis.giveaway} Drop: ${args.slice(2).join(" ")}!`,
    hostedBy: interaction.user,
    thumbnail: client.user.displayAvatarURL(),
    embedColor: 5793266,
    embedColorEnd: 16711680,
    messages: {
     giveaway: null,
     giveawayEnded: null,
     winMessage: {
      replyToGiveaway: true,
      embed: new MessageEmbed() // Prettier
       .setColor(5793266)
       .setTimestamp()
       .setDescription(`>>> **Congratulations {winners}!**\n**You won: \`${args.slice(2).join(" ")}\`**\n\n[${client.bot_emojis.link} Link to giveaway]({this.messageURL})`)
       .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
       .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() }),
     },
     dropMessage: `> **Be the first to react with ${client.bot_emojis.giveaway}!**`,
     embedFooter: { text: `{this.winnerCount} winner(s)`, iconURL: client.user.displayAvatarURL() },
     noWinner: `> **${client.bot_emojis.error} Giveaway cancelled, no valid participations!**\n`,
     hostedBy: `• ${client.bot_emojis.member} Hosted by ${interaction.user}`,
     drawing: `\n• ${client.bot_emojis.stopwatch} Drawing winner {timestamp}`,
     winners: "> Winner(s): ",
    },
   })
   .then((s) => {
    const success = new MessageEmbed() // Prettier
     .setColor("GREEN")
     .setTitle(`${client.bot_emojis.success} Success!`)
     .setDescription("> :tada: Drop giveaway created in " + `${channel}` + "!")
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
