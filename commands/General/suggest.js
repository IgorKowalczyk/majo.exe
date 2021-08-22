const Discord = require("discord.js");
const config = require("../../config");

module.exports = {
 name: "suggest",
 aliases: [],
 description: "Suggest feature in bot",
 category: "General",
 usage: "suggest <suggestion>",
 run: async (client, message, args) => {
  try {
   const suggestion = args.join(" ");
   if (!suggestion) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | You need to enter a suggestion!`,
     },
    });
   }
   if (suggestion.lenght > 1000) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | Your suggestion can have a maximum of 1000 characters!`,
     },
    });
   }
   const channel = client.channels.cache.get(config.suggestions_channel);
   if (channel) {
    const embed = new Discord.MessageEmbed() // Prettier
     .setAuthor(`${client.bot_emojis.thinking} ${message.author.username} suggestion!`, message.guild.iconURL())
     .setColor("RANDOM")
     .setDescription(suggestion)
     .addField("Reporter", `<@${message.author.id}> (ID: ${message.author.id})`)
     .addField("User guild", `${message.guild.name} (ID: ${message.guild.id})`)
     .setFooter(
      "Majo.exe",
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     )
     .setThumbnail(message.guild.iconURL());
    channel.send(embed);
    const success = new Discord.MessageEmbed() // Prettier
     .setColor("RANDOM")
     .setDescription(`${message.author} your suggestion was send, you can view it in Majo.exe Developers server in <#${config.suggestions_channel}> channel.`)
     .setFooter(
      config.support_server,
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     );
    message.lineReply(success);
   } else {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | I can't find suggestions channel. Mayby the channel didn't exist. If you are the bot developer please configure it in config.`,
     },
    });
   }
  } catch (err) {
   message.lineReply({
    embed: {
     color: 16734039,
     description: `Something went wrong... ${client.bot_emojis.sadness}`,
    },
   });
  }
 },
};
