const { MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = {
 name: "user-info",
 aliases: ["userinfo"],
 description: "Display info about user",
 category: "Utility",
 usage: "user-info [user mention, user id, user name]",
 run: async (client, message, args) => {
  try {
   const mention = (await message.mentions.members.first()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.guild.members.cache.find((r) => r.displayName.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.member;
   const user = await message.guild.members.fetch(mention.id);
   var flags = {
    "": "None!",
    DISCORD_EMPLOYEE: client.bot_emojis.discord_employee,
    DISCORD_PARTNER: client.bot_emojis.discord_partner,
    BUGHUNTER_LEVEL_1: client.bot_emojis.bug_hunter_1,
    BUGHUNTER_LEVEL_2: client.bot_emojis.bug_hunter_2,
    HYPESQUAD_EVENTS: client.bot_emojis.hypesquad,
    HOUSE_BRILLIANCE: client.bot_emojis.hypesquad_brilliance,
    HOUSE_BRAVERY: client.bot_emojis.hypesquad_bravery,
    HOUSE_BALANCE: client.bot_emojis.hypesquad_balance,
    EARLY_SUPPORTER: client.bot_emojis.early_supporter,
    TEAM_USER: "Team User (?)",
    VERIFIED_BOT: `${client.bot_emojis.bot_badge_part_1}${client.bot_emojis.bot_badge_part_2}`,
    EARLY_VERIFIED_DEVELOPER: client.bot_emojis.verified_bot_developer,
   };
   const embed = new MessageEmbed() // Prettier
    .setColor("#4f545c")
    .setAuthor({ name: "User information", iconURL: user.user.displayAvatarURL() })
    .setThumbnail(
     user.user.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    )
    .setTimestamp()
    .setFooter({
     text: `Requested by ${message.author.username}`,
     iconURL: message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    });
   embed.addField(`${client.bot_emojis.role} ID`, `> \`${user.user.id}\``, true);
   embed.addField(`${client.bot_emojis.channel} Discriminator`, `> \`#${user.user.discriminator}\``, true);
   if (user.nickname) embed.addField(`${client.bot_emojis.member} Nickname`, `> \`${user.nickname}\``);
   embed.addField(`${client.bot_emojis.stopwatch} Joined server at`, `> <t:${parseInt(user.joinedTimestamp / 1000)}> (<t:${parseInt(user.joinedTimestamp / 1000)}:R>)`);
   embed.addField(`${client.bot_emojis.stopwatch} Account created at`, `> <t:${parseInt(user.user.createdAt / 1000)}> (<t:${parseInt(user.user.createdAt / 1000)}:R>)`);
   embed.addField(`${client.bot_emojis.role} Highest role`, `> ${user.roles.highest}`, true);
   embed.addField(`${client.bot_emojis.discord_badges} Badges`, `> ${flags[mention.user.flags.toArray().join(", ")]}`, true);
   embed.addField(`${client.bot_emojis.member} Account banned?`, `> ${user.deleted ? "Yes, account banned!" : "No, account still available"}`);
   embed.setTitle(`${user.user.tag} ${user.user.bot ? `${client.bot_emojis.bot_badge_part_1}${client.bot_emojis.bot_badge_part_2}` : ""}`);
   message.reply({ embeds: [embed] });
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
