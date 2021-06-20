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
   const embed = new Discord.MessageEmbed() // Prettier()
    .setTitle(message.guild.name, message.guild.iconURL)
    .setColor("RANDOM")
    .setThumbnail(message.guild.iconURL())
    .addField("<:owner:856161806199947285> Server Owner", "<@" + message.guild.owner + "> (ID: " + message.guild.ownerID + ")", true)
    .addField("<:discordemotka:849892951127228426> ID", message.guild.id, true)
    .addField("🌐 Region", region[message.guild.region] || message.guild.region, true)
    .addField("<:members:658538493470965787> Members", `${message.guild.memberCount}`, true)
    .addField("🔐 Verification Level", message.guild.verificationLevel, true)
    .addField("<:channel:856161806586085376> Channels", message.guild.channels.cache.size, true)
    .addField("<:role:808826577785716756> Roles", message.guild.roles.cache.size, true)
    .addField("<a:NM_Boost:711146061250428999> Banner", `${message.guild.banner || "None"}`, true)
    .addField("<:verified:856161805981712395> Guild verified", message.guild.verified, true)
    .addField("<:partner:314068430556758017> Discord partner", message.guild.partnered, true)
    .addField("<a:boost:854794292190773308> Boosts", message.guild.premiumSubscriptionCount + " [" + message.guild.premiumTier + " tier]", true)
    .addField("<a:badges_roll:842441895137640478> Emojis", message.guild.emojis.cache.size, true)
    .addField("<a:nitro:842441654484598804> Discovery Splash", `${message.guild.discoverySplash || "None"}`, true)
    .addField("<:stage:856161806048165908> Description", `${message.guild.description || "None"}`)
    .addField("<:rules:781581022059692043> Rules channel", rules)
    .addField("<:channel:856161806586085376> Widget channel", widget, true)
    .addField("⏱️ Creation Date", `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkdays(message.channel.guild.createdAt)})`, true)
    .setFooter(
     "Requested by " + `${message.author.username}`,
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
     description: "Something went wrong... :cry:",
    },
   });
  }
 },
};
