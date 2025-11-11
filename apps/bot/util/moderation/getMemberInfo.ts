import { ChatInputCommandInteraction, EmbedBuilder, GuildMember, type ColorResolvable } from "discord.js";
import type { Majobot } from "@/index";

export function getMemberInfo(client: Majobot, interaction: ChatInputCommandInteraction, color: ColorResolvable) {
  try {
    const user = interaction.options.getMember("user") as GuildMember;

    if (!user || !user.user) {
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
      VerifiedBot: `${client.config.emojis.bot_badge_part_1}${client.config.emojis.bot_badge_part_2}`,
      VerifiedDeveloper: client.config.emojis.verified_bot_developer,
    };

    type UserFlags = keyof typeof flags;

    const userFlags = [];
    user.user.flags?.toArray().map((flag) => {
      return flags[flag as UserFlags] ? userFlags.push(flags[flag as UserFlags]) : null;
    });

    if (userFlags.length === 0) {
      userFlags.push("None!");
    }

    const embed = new EmbedBuilder()
      .setColor(color)
      .setTimestamp()
      .setThumbnail(user.user.displayAvatarURL({ size: 256 }))
      .setTitle(`${user.user.globalName || user.user.username} ${user.user.bot ? client.config.emojis.bot_badge_part_1 + client.config.emojis.bot_badge_part_2 : ""}`)
      .setFooter({
        text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL({
          size: 256,
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
        value: `> \`${user.user.username} ${user.user.globalName ? `(@${user.user.globalName})` : ""}\``,
        inline: true,
      },
      {
        name: `${client.config.emojis.stopwatch} Joined server at`,
        value: user.joinedTimestamp ? `><t:${parseInt((user.joinedTimestamp / 1000).toString())}> (<t:${parseInt((user.joinedTimestamp / 1000).toString())}:R>)` : "Unknown",
        inline: false,
      },
      {
        name: `${client.config.emojis.stopwatch} Account created at`,
        value: `> <t:${parseInt((user.user.createdAt.getTime() / 1000).toString())}> (<t:${parseInt((user.user.createdAt.getTime() / 1000).toString())}:R>)`,
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

    if (user.nickname) {
      fields.push({
        name: `${client.config.emojis.nickname} Nickname`,
        value: `> ${user.nickname}`,
        inline: false,
      });
    }

    embed.addFields(fields);

    return interaction.followUp({ embeds: [embed] });
  } catch (err) {
    client.errorMessages.internalError(interaction, err);
  }
}
