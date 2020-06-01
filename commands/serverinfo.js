const Discord = module.require("discord.js");
const fs = require("fs");

module.exports.run = async (client, message, args) => {
  let serverowner = message.guild.member(message.guild.ownerID);
  var roles = [];
  
  var e = message.guild.emojis.map(e => e.toString())

    function checkDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? " day" : " days") + " ago";
    };
    let verifLevels = ["None", "Low", "Medium", "(╯°□°）╯︵  ┻━┻ (High)", "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻ (Highest)"];
    let region = {
        "brazil": ":flag_br: Brazil",
        "eu-central": ":flag_eu: Central Europe",
        "singapore": ":flag_sg: Singapore",
        "us-central": ":flag_us: U.S. Central",
        "sydney": ":flag_au: Sydney",
        "us-east": ":flag_us: U.S. East",
        "us-south": ":flag_us: U.S. South",
        "us-west": ":flag_us: U.S. West",
        "eu-west": ":flag_eu: Western Europe",
        "vip-us-east": ":flag_us: VIP U.S. East",
        "london": ":flag_gb: London",
		"europe": ":flag_eu: Europe",
		"india": ":flag_in: India",
        "amsterdam": ":flag_nl: Amsterdam",
        "hongkong": ":flag_hk: Hong Kong",
        "russia": ":flag_ru: Russia",
        "southafrica": ":flag_za:  South Africa"
    };
    let embed = new Discord.RichEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL)
    .setColor("RANDOM")
    .setThumbnail(message.guild.iconURL)
    .addField("Server Owner", serverowner.user.username + "#" + serverowner.user.discriminator, true)
	.addField("ID", message.guild.id, true)
    .addField("Region", region[message.guild.region] || message.guild.region, true)
    .addField("Members", message.guild.memberCount, true)
    .addField("Verification Level", verifLevels[message.guild.verificationLevel], true)
    .addField("Channels", message.guild.channels.size, true)
    .addField("Roles [" + `${message.guild.roles.size}` + "]", message.guild.roles.filter(r => r.id !== message.guild.id).map(roles => roles.name).join(", ") || "No Roles", true)
	.addField("Emojis [" + `${message.guild.emojis.size}` + "]", e.join(", ") || "No Emojis", true)
    .addField("Creation Date", `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`, true)
	.setTimestamp()
  
  message.channel.send(embed);
}

module.exports.help = {
    name: "serverinfo",
    description: "Grabs the server info",
    usage: "serverinfo",
    type: "Utility"
}
