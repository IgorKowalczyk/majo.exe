import { EmbedBuilder } from "discord.js";

export async function getMemberInfo(client, interaction, color) {
 try {
  const user = interaction.options.getMember("user");

  if (!user) {
   return client.errorMessages.createSlashError(interaction, "❌ You need to provide a user to check info");
  }

  const flags = {
   "": "None!",
   Staff: client.config.emojis.discord_employee,
   Partner: client.config.emojis.discord_partner,
   BugHunterLevel1: client.config.emojis.bug_hunter_1,
   BugHunterLevel2: client.config.emojis.bug_hunter_2,
   HypesquadEvents: client.config.emojis.hypesquad,
   HypeSquadOnlineHouse1: client.config.emojis.hypesquad_brilliance,
   HypeSquadOnlineHouse2: client.config.emojis.hypesquad_bravery,
   HypeSquadOnlineHouse3: client.config.emojis.hypesquad_balance,
   PremiumEarlySupporter: client.config.emojis.early_supporter,
   TeamPseudoUser: "Team User",
   erifiedBot: `${client.config.emojis.bot_badge_part_1}${client.config.emojis.bot_badge_part_2}`,
   VerifiedDeveloper: client.config.emojis.verified_bot_developer,
  };

  const userFlags = [];
  user.user.flags.toArray().map((flag) => {
   flags[flag.toString()] ? userFlags.push(flags[flag.toString()]) : null;
  });

  if (userFlags.length === 0) {
   userFlags.push("None!");
  }

  const embed = new EmbedBuilder()
   .setColor(color)
   .setTimestamp()
   .setThumbnail(user.user.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }))
   .setTitle(`${user.user.username} ${user.user.bot ? client.config.emojis.bot_badge_part_1 + client.config.emojis.bot_badge_part_2 : ""}`)
   .setFooter({
    text: `Requested by ${interaction.member?.user?.username}`,
    iconURL: interaction.member?.user?.displayAvatarURL({
     dynamic: true,
     format: "png",
     size: 2048,
    }),
   });

  const fields = [
   {
    name: `${client.config.emojis.role} ID`,
    value: `> \`${user.user.id}\``,
    inline: true,
   },
   {
    name: `${client.config.emojis.role} Username`,
    value: `> \`${user.user.username}\``,
    inline: true,
   },
   {
    name: `${client.config.emojis.stopwatch} Joined server at`,
    value: `> <t:${parseInt(user.joinedTimestamp / 1000)}> (<t:${parseInt(user.joinedTimestamp / 1000)}:R>)`,
    inline: false,
   },
   {
    name: `${client.config.emojis.stopwatch} Account created at`,
    value: `> <t:${parseInt(user.user.createdAt / 1000)}> (<t:${parseInt(user.user.createdAt / 1000)}:R>)`,
    inline: false,
   },
   {
    name: `${client.config.emojis.role} Highest role`,
    value: `> ${user.roles.highest || "None"}`,
    inline: true,
   },
   {
    name: `${client.config.emojis.discord_badges} Badges`,
    value: `> ${userFlags || "None"}`,
    inline: true,
   },
  ];

  if (user.user.nickname) {
   fields.push({
    name: `${client.config.emojis.nickname} Nickname`,
    value: `> ${user.user.nickname}`,
    inline: false,
   });
  }

  embed.addFields(fields);

  return interaction.followUp({ embeds: [embed] });
 } catch (err) {
  client.errorMessages.internalError(interaction, err);
 }
}
