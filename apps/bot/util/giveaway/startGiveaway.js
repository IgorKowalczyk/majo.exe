import { EmbedBuilder } from "discord.js";
import ms from "ms";

/**
 * @param client Discord Client
 * @param interaction Discord Interaction
 * @param color Embed color
 * @returns {Promise<void>}
 * */
export async function StartGiveaway(client, interaction, color) {
 try {
  await interaction.deferReply({ ephemeral: true });
  const channel = interaction.options.getChannel("channel");

  await client.giveawaysManager.start(channel, {
   duration: ms(interaction.options.getString("time")),
   guildId: interaction.guild.id,
   winnerCount: parseInt(interaction.options.getInteger("winners")),
   prize: `${client.config.emojis.giveaway} Giveaway: ${interaction.options.getString("prize")}`,
   hostedBy: interaction.user,
   thumbnail: client.user.displayAvatarURL(),
   embedColor: parseInt(color.replace("#", ""), 16),
   embedColorEnd: parseInt(color.replace("#", ""), 16),
   messages: {
    giveaway: null,
    giveawayEnded: null,
    inviteToParticipate: `> **React with ${client.config.emojis.giveaway} to participate!**`,
    winMessage: {
     replyToGiveaway: true,
     embed: new EmbedBuilder() // Prettier
      .setColor(color)
      .setTimestamp()
      .setDescription(`>>> **Congratulations {winners}!**\n**You won: \`${interaction.options.getString("prize")}\`**\n\n[${client.config.emojis.link} Link to giveaway]({this.messageURL})`),
    },
    embedFooter: { text: "{this.winnerCount} winner(s)", iconURL: client.user.displayAvatarURL() },
    noWinner: `> **${client.config.emojis.error} Giveaway cancelled, no valid participations!**\n`,
    drawing: `\n• ${client.config.emojis.stopwatch} Drawing winner {timestamp}`,
    hostedBy: `• ${client.config.emojis.member} Hosted by ${interaction.user}`,
    winners: "Winner(s): ",
    endedAt: "Ended at",
   },
  });

  const success = new EmbedBuilder() // prettier
   .setColor(color)
   .setTitle(`${client.config.emojis.success} Success!`)
   .setDescription("> :tada: Giveaway created in " + `${channel}` + "!")
   .setFooter({
    text: `Requested by ${interaction.member?.user?.username}`,
    iconURL: interaction.member?.user?.displayAvatarURL({
     dynamic: true,
     format: "png",
     size: 2048,
    }),
   })
   .setTimestamp();

  await interaction.followUp({ embeds: [success], ephermal: true });
 } catch (err) {
  client.errorMessages.generateErrorMessage(interaction, err);
 }
}

/**
 * @param client Discord Client
 * @param interaction Discord Interaction
 * @param color Embed color
 * @returns {Promise<void>}
 * */
export async function StartDropGiveaway(client, interaction, color) {
 try {
  await interaction.deferReply({ ephemeral: true });
  const channel = interaction.options.getChannel("channel");

  try {
   await client.giveawaysManager.start(channel, {
    isDrop: true,
    winnerCount: parseInt(interaction.options.getInteger("winners")),
    prize: `${client.config.emojis.giveaway} Drop: ${interaction.options.getString("prize")}`,
    hostedBy: interaction.user,
    thumbnail: client.user.displayAvatarURL(),
    embedColor: parseInt(color.replace("#", ""), 16),
    embedColorEnd: parseInt(color.replace("#", ""), 16),
    messages: {
     giveaway: null,
     giveawayEnded: null,
     winMessage: {
      replyToGiveaway: true,
      embed: new EmbedBuilder() // Prettier
       .setColor(color)
       .setTimestamp()
       .setDescription(`>>> **Congratulations {winners}!**\n**You won: \`${interaction.options.getString("prize")}\`**\n\n[${client.config.emojis.link} Link to giveaway]({this.messageURL})`)
       .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
       .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() }),
     },
     dropMessage: `> **Be the first to react with ${client.config.emojis.giveaway}!**`,
     embedFooter: { text: "{this.winnerCount} winner(s)", iconURL: client.user.displayAvatarURL() },
     noWinner: `> **${client.config.emojis.error} Giveaway cancelled, no valid participations!**\n`,
     hostedBy: `• ${client.config.emojis.member} Hosted by ${interaction.user}`,
     drawing: `\n• ${client.config.emojis.stopwatch} Drawing winner {timestamp}`,
     winners: "> Winner(s): ",
    },
   });
  } catch (err) {
   const embed = new EmbedBuilder()
    .setColor("#EF4444")
    .setTimestamp()
    .setTitle("❌ Error")
    .setDescription(`> ${err}`)
    .setFooter({
     text: `Requested by ${interaction.member?.user?.username}`,
     iconURL: interaction.member?.user?.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    });
   return interaction.followUp({ ephemeral: true, embeds: [embed] });
  }

  const success = new EmbedBuilder() // Prettier
   .setColor(color)
   .setTitle(`${client.config.emojis.success} Success!`)
   .setDescription("> :tada: Drop giveaway created in " + `${channel}` + "!")
   .setFooter({
    text: "Requested by " + `${interaction.user.username}`,
    iconURL: interaction.user.displayAvatarURL({
     dynamic: true,
     format: "png",
     size: 2048,
    }),
   });
  await interaction.followUp({ embeds: [success], ephermal: true });
 } catch (err) {
  client.errorMessages.generateErrorMessage(interaction, err);
 }
}
