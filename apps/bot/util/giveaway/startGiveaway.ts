import { type ChatInputCommandInteraction, EmbedBuilder, type Message, PermissionsBitField, User, type ColorResolvable, ChannelType } from "discord.js";
import ms from "ms";
import type { Majobot } from "@/index";
import { createLog } from "@majoexe/util/database";
import { GuildLogType } from "@majoexe/database";

export async function StartGiveaway(client: Majobot, interaction: ChatInputCommandInteraction, color: ColorResolvable): Promise<Message | void> {
 try {
  await interaction.deferReply({ ephemeral: true });
  if (!interaction.guild || !interaction.guild.available) return client.errorMessages.createSlashError(interaction, "❌ This command can only be used in a server!");
  if (!interaction.member) return client.errorMessages.createSlashError(interaction, "❌ This command can only be used by a member!");
  if (!client.user) return client.errorMessages.createSlashError(interaction, "❌ The bot is not available!");

  const userPermissions = interaction.memberPermissions || new PermissionsBitField();

  if (!userPermissions.has(PermissionsBitField.Flags.ManageGuild)) return client.errorMessages.createSlashError(interaction, "❌ You do not have permission to create giveaways! You need `MANAGE_GUILD` permission.");

  const channel = interaction.options.getChannel("channel", true, [ChannelType.GuildText]);
  if (!channel) return client.errorMessages.createSlashError(interaction, "❌ You need to provide a channel!");

  const time = interaction.options.getString("time");
  if (!time) return client.errorMessages.createSlashError(interaction, "❌ You need to provide a time!");

  const winners = interaction.options.getInteger("winners", true);
  if (!winners) return client.errorMessages.createSlashError(interaction, "❌ You need to provide a number of winners!");

  const prize = interaction.options.getString("prize");
  if (!prize) return client.errorMessages.createSlashError(interaction, "❌ You need to provide a prize!");

  try {
   await client.giveawaysManager.start(channel, {
    duration: parseInt(ms(parseInt(time))),
    extraData: {
     guildId: interaction.guild.id,
     channelId: channel.id,
    },
    winnerCount: winners,
    prize: `${client.config.emojis.giveaway} Giveaway: ${prize}`,
    hostedBy: interaction.member.user as User,
    thumbnail: client.user.displayAvatarURL(),
    embedColor: color,
    embedColorEnd: color,
    messages: {
     giveaway: "",
     giveawayEnded: "",
     inviteToParticipate: `> **React with ${client.config.emojis.giveaway} to participate!**`,
     winMessage: {
      replyToGiveaway: true,
      embed: new EmbedBuilder() // Prettier
       .setColor(color)
       .setTimestamp()
       .setDescription(`>>> **Congratulations {winners}!**\n**You won: \`${prize}\`**\n\n[${client.config.emojis.link} Link to giveaway]({this.messageURL})`),
     },
     embedFooter: { text: `{this.winnerCount} winner${winners > 1 ? "s" : ""}`, iconURL: client.user.displayAvatarURL() },
     noWinner: `> **${client.config.emojis.error} Giveaway cancelled, no valid participations!**\n`,
     drawing: `\n• ${client.config.emojis.stopwatch} Drawing winner {timestamp}`,
     hostedBy: `• ${client.config.emojis.member} Hosted by ${interaction.member.user}`,
     winners: `Winner${winners > 1 ? "s" : ""}: `,
     endedAt: "Ended at",
    },
   });
  } catch (_err) {
   return client.errorMessages.createSlashError(interaction, "❌ Something went wrong while creating the giveaway!");
  }

  const success = new EmbedBuilder() // prettier
   .setColor(color)
   .setTitle(`${client.config.emojis.success} Success!`)
   .setDescription("> :tada: Giveaway created in " + `${channel}` + "!")
   .setFooter({
    text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
    iconURL: interaction.user.displayAvatarURL({
     size: 256,
    }),
   })
   .setTimestamp();

  await interaction.followUp({ embeds: [success] });
 } catch (err: unknown) {
  client.errorMessages.internalError(interaction, err);
 }
}

export async function StartDropGiveaway(client: Majobot, interaction: ChatInputCommandInteraction, color: ColorResolvable): Promise<Message | void> {
 try {
  await interaction.deferReply({ ephemeral: true });
  if (!interaction.guild || !interaction.guild.available) return client.errorMessages.createSlashError(interaction, "❌ This command can only be used in a server!");
  if (!interaction.member) return client.errorMessages.createSlashError(interaction, "❌ This command can only be used by a member!");
  if (!client.user) return client.errorMessages.createSlashError(interaction, "❌ The bot is not available!");

  const userPermissions = interaction.memberPermissions || new PermissionsBitField();

  if (!userPermissions.has(PermissionsBitField.Flags.ManageGuild)) return client.errorMessages.createSlashError(interaction, "❌ You do not have permission to create giveaways! You need `MANAGE_GUILD` permission.");

  const channel = interaction.options.getChannel("channel", true, [ChannelType.GuildText]);
  if (!channel) return client.errorMessages.createSlashError(interaction, "❌ You need to provide a channel!");

  const winners = interaction.options.getInteger("winners", true);
  if (!winners) return client.errorMessages.createSlashError(interaction, "❌ You need to provide a number of winners!");

  const prize = interaction.options.getString("prize");
  if (!prize) return client.errorMessages.createSlashError(interaction, "❌ You need to provide a prize!");

  try {
   await client.giveawaysManager.start(channel, {
    isDrop: true,
    extraData: {
     guildId: interaction.guild.id,
     channelId: channel.id,
    },
    winnerCount: winners,
    prize: `${client.config.emojis.giveaway} Drop: ${prize}`,
    hostedBy: interaction.member.user as User,
    thumbnail: client.user.displayAvatarURL(),
    embedColor: color,
    embedColorEnd: color,
    messages: {
     giveaway: "",
     giveawayEnded: "",
     winMessage: {
      replyToGiveaway: true,
      embed: new EmbedBuilder() // Prettier
       .setColor(color)
       .setTimestamp()
       .setDescription(`>>> **Congratulations {winners}!**\n**You won: \`${prize}\`**\n\n[${client.config.emojis.link} Link to giveaway]({this.messageURL})`)
       .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
       .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() }),
     },
     dropMessage: `> **Be the first to react with ${client.config.emojis.giveaway}!**`,
     embedFooter: { text: "{this.winnerCount} winner(s)", iconURL: client.user.displayAvatarURL() },
     noWinner: `> **${client.config.emojis.error} Giveaway cancelled, no valid participations!**\n`,
     hostedBy: `• ${client.config.emojis.member} Hosted by ${interaction.member.user}`,
     drawing: `\n• ${client.config.emojis.stopwatch} Drawing winner {timestamp}`,
     winners: "> Winner(s): ",
    },
   });
  } catch (_err) {
   return client.errorMessages.createSlashError(interaction, "❌ Something went wrong while creating the giveaway!");
  }

  await createLog(interaction.guild.id, interaction.user.id, {
   content: `Started a drop giveaway in ${channel} with ${winners} winner(s) and prize: ${prize}`,
   type: GuildLogType.GiveawayCreate,
  });

  const success = new EmbedBuilder() // Prettier
   .setColor(color)
   .setTitle(`${client.config.emojis.success} Success!`)
   .setDescription("> :tada: Drop giveaway created in " + `${channel}` + "!")
   .setFooter({
    text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
    iconURL: interaction.user.displayAvatarURL({
     size: 256,
    }),
   });
  await interaction.followUp({ embeds: [success] });
 } catch (err: unknown) {
  client.errorMessages.internalError(interaction, err);
 }
}
