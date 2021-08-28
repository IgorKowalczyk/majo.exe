const Discord = require("discord.js");
const fetch = require("node-fetch");
const moment = require("moment");
const Extra = require("discord-buttons");

module.exports = {
 name: "github",
 aliases: [],
 description: "Search for things in github",
 category: "Utility",
 usage: "github (search)",
 run: async (client, message, args) => {
  try {
   if (!args[0])
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | Please enter a Github username`,
     },
    });
   fetch(`https://api.github.com/users/${args.join("-")}`)
    .then((res) => res.json())
    .then((body) => {
     if (body.message)
      return message.lineReply({
       embed: {
        color: 16734039,
        description: `${client.bot_emojis.error} | \`0\` Users found, please provide vaild username`,
       },
      });
     let { login, avatar_url, name, id, html_url, company, public_repos, public_gists, twitter_username, email, followers, following, location, created_at, bio } = body;
     const button = new Extra.MessageButton() // Prettier
      .setLabel("See profile")
      .setStyle("url")
      .setURL(html_url);
     const embed = new Discord.MessageEmbed() // Prettier
      .setTitle(`${client.bot_emojis.octo} ${login} Github`, avatar_url)
      .setColor("RANDOM")
      .setThumbnail(avatar_url)
      .addField(`${client.bot_emojis.member} Username`, `\`\`\`${login}\`\`\``)
      .addField(`${client.bot_emojis.edit} Bio`, `\`\`\`${bio || `${client.bot_emojis.error} Bio not provided`}\`\`\``)
      .addField(`${client.bot_emojis.book} Public Repositories`, `\`\`\`${public_repos || "0"}\`\`\``, true)
      .addField(`${client.bot_emojis.book} Public Gists`, `\`\`\`${public_gists || "0"}\`\`\``, true)
      .addField(`${client.bot_emojis.paper_clips} Followers`, `\`\`\`${followers}\`\`\``, true)
      .addField(`${client.bot_emojis.paper_clip} Following`, `\`\`\`${following}\`\`\``, true)
      .addField(`${client.bot_emojis.octo} Github ID`, `\`\`\`${id}\`\`\``)
      .addField(`${client.bot_emojis.earth} Location`, `\`\`\`${location || `${client.bot_emojis.error} Unknown location`}\`\`\``)
      .addField(`${client.bot_emojis.email} E-Mail`, `\`\`\`${email || `${client.bot_emojis.error} No public email provided`}\`\`\``)
      .addField(`${client.bot_emojis.bird} Twitter`, `\`\`\`${twitter_username || "None"}\`\`\``)
      .addField(`${client.bot_emojis.rocket} Company`, `\`\`\`${company || `${client.bot_emojis.error} No company`}\`\`\``)
      .addField(`${client.bot_emojis.stopwatch} Account Created`, moment.utc(created_at).format("dddd, MMMM, Do YYYY"))
      .setFooter(
       `Requested by ${message.author.username}`,
       message.author.displayAvatarURL({
        dynamic: true,
        format: "png",
        size: 2048,
       })
      )
      .setTimestamp();
     message.lineReply({
      button: button,
      embed: embed,
     });
    });
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
