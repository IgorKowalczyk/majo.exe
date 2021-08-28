const Discord = require("discord.js");

module.exports = {
 name: "serverinfo",
 aliases: ["sv", "server-info", "server"],
 description: "Display server info",
 category: "Utility",
 usage: "serverinfo",
 run: async (client, message, args) => {
  try {
   var roles = [];
   var e = message.guild.emojis.cache.map((e) => e.toString());
   function checkdays(date) {
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    let days = Math.floor(diff / 86400000);
    return days + (days == 1 ? " day" : " days") + " ago";
   }
   let region = {
    brazil: ":flag_br: Brazil",
    "eu-central": ":flag_eu: Central Europe",
    singapore: ":flag_sg: Singapore",
    "us-central": ":flag_us: U.S. Central",
    sydney: ":flag_au: Sydney",
    "us-east": ":flag_us: U.S. East",
    "us-south": ":flag_us: U.S. South",
    "us-west": ":flag_us: U.S. West",
    "eu-west": ":flag_eu: Western Europe",
    "vip-us-east": ":flag_us: VIP U.S. East",
    london: ":flag_gb: London",
    europe: ":flag_eu: Europe",
    india: ":flag_in: India",
    amsterdam: ":flag_nl: Amsterdam",
    hongkong: ":flag_hk: Hong Kong",
    russia: ":flag_ru: Russia",
    southafrica: ":flag_za:  South Africa",
   };
   if (message.guild.rulesChannel) {
    rules = "<#" + message.guild.rulesChannel + "> (ID: " + message.guild.rulesChannelID + ")";
   } else {
    rules = "Rules channel not exists";
   }
   if (message.guild.widgetEnabled == "true") {
    widget = "<#" + message.guild.widgetChannel + "> (ID: " + message.guid.widgetChannelID + ")";
   } else {
    widget = "Server widget not enabled";
   }
   const embed = new Discord.MessageEmbed() // Prettier
    .setTitle(message.guild.name, message.guild.iconURL)
    .setColor("RANDOM")
    .setThumbnail(message.guild.iconURL())
    .addField(`${client.bot_emojis.owner_crown} Owner`, "<@" + message.guild.owner + "> (ID: " + message.guild.ownerID + ")", true)
    .addField(`${client.bot_emojis.discord_logo} ID`, "`" + message.guild.id + "`", true)
    .addField(`${client.bot_emojis.earth} Region`, region[message.guild.region] || message.guild.region, true)
    .addField(`${client.bot_emojis.member} Members`, `${message.guild.memberCount}`, true)
    .addField(`${client.bot_emojis.channel} Channels`, message.guild.channels.cache.size, true)
    .addField(`${client.bot_emojis.role} Roles`, message.guild.roles.cache.size, true)
    .addField(`${client.bot_emojis.discord_badges} Emojis`, message.guild.emojis.cache.size, true)
    .addField(`${client.bot_emojis.boosts_animated} Boosts`, message.guild.premiumSubscriptionCount + " [*" + message.guild.premiumTier + "* tier]", true)
    .addField(`${client.bot_emojis.lock} Members verification`, message.guild.verificationLevel.toLowerCase(), true)
    .addField(`${client.bot_emojis.stopwatch} Creation Date`, `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkdays(message.channel.guild.createdAt)})`, true)
    .addField(`${client.bot_emojis.verified_badge} Guild verified`, message.guild.verified, true)
    .addField(`${client.bot_emojis.discord_partner} Discord partner`, message.guild.partnered, true)
    .addField(`${client.bot_emojis.picture_frame} Banner`, `${message.guild.banner ? `[https://cdn.discordapp.com/banners/${message.guild.id}/${message.guid.banner}](Click to see banner!)` : "Not set"}`)
    .addField(`${client.bot_emojis.picture_frame} Discovery Splash`, `${message.guild.discoverySplash || "Not set"}`)
    .addField(`${client.bot_emojis.stage_channel} Description`, `${message.guild.description || "Not set"}`)
    .addField(`${client.bot_emojis.rules_channel} Rules channel`, rules)
    .addField(`${client.bot_emojis.channel} Widget channel`, widget, true)
    .setFooter(
     `Requested by ${message.author.username}`,
     message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    )
    .setTimestamp();
   message.lineReply(embed);
  } catch (err) {
   console.log(err);
   message.lineReply({
    embed: {
     color: 16734039,
     description: `Something went wrong... ${client.bot_emojis.sadness}`,
    },
   });
  }
 },
};
