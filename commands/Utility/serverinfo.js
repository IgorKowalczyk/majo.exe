const Discord = require("discord.js");
const config = require("../../config");
const prefix = config.prefix;

module.exports = {
 name: "serverinfo",
 aliases: ["sv", "server-info", "server"],
 description: "Exibe informações do servidor.",
 category: "Utilidades",
 usage: "serverinfo",
 run: async (client, message, args) => {
  try {
   var roles = [];
   var e = message.guild.emojis.cache.map(e => e.toString())
   function checkdays(date) {
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    let days = Math.floor(diff / 86400000);
    return days + (days == 1 ? " day" : " days") + " ago";
   }
  let region = {
   "brazil": ":flag_br: Brasil",
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
  }
  if(message.guild.rulesChannel) {
   rules = "<#" + message.guild.rulesChannel + "> (ID: " + message.guild.rulesChannelID + ")";
  } else {
   rules = "Canal de regras não existe";
  }
  if(message.guild.widgetEnabled == "true") {
   widget = "<#" + message.guild.widgetChannel + "> (ID: " + message.guid.widgetChannelID + ")";
  } else {
   widget = "Widget de servidor não habilitado";
  }
  /*if(message.guild.features) {
   features = message.guild.features;
  } else {
   features = "None features enabled";
  }*/
  const embed = new Discord.MessageEmbed()
   .setAuthor(message.guild.name, message.guild.iconURL)
   .setColor("RANDOM")
   .setThumbnail(message.guild.iconURL())
   .addField("Dono do Servidor", "<@" + message.guild.owner + "> (ID: " + message.guild.ownerID + ")", true)
   .addField("ID", message.guild.id, true)
   .addField("Região", region[message.guild.region] || message.guild.region, true)
   .addField("Membros", `${message.guild.memberCount}`, true)
   .addField("Nível de Verificação", message.guild.verificationLevel, true)
   .addField("Canais", message.guild.channels.cache.size, true)
   .addField("Cargos", message.guild.roles.cache.size, true)
   .addField("Banner", `${message.guild.banner || "None"}`, true)
   .addField("Guilda verificada", message.guild.verified, true)
   .addField("Discord partner", message.guild.partnered, true)
   .addField("Boosts", message.guild.premiumSubscriptionCount + " [" + message.guild.premiumTier + " tier]", true)
   .addField("Emojis", message.guild.emojis.cache.size, true)
   .addField("Discovery Splash", `${message.guild.discoverySplash || "None"}`, true)
   .addField("Descrição", `${message.guild.description || "None"}`)
   /*.addField("Guild Features", `${features}`)*/
   .addField("Canal de Regras", rules)
   .addField("Canal do Widget", widget, true)
   .addField("Data de Criação", `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkdays(message.channel.guild.createdAt)})`, true)
   .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
   .setTimestamp()
  message.channel.send(embed);
  } catch(err) {
   console.log(err);
   message.channel.send({embed: {
    color: 16734039,
    description: "Algo deu errado... :cry:"
   }})
  }
 }
}
