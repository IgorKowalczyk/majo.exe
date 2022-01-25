const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const fetch = require("node-fetch");
const moment = require("moment");

module.exports = {
 name: "github",
 aliases: [],
 description: "Search for things in github",
 category: "Utility",
 usage: "github (search)",
 run: async (client, message, args) => {
  try {
   if (!args[0]) {
    return client.createError(message, `${client.bot_emojis.error} | Please enter a Github username!`);
   }
   fetch(`https://api.github.com/users/${args.join("-")}`)
    .then((res) => res.json())
    .then((body) => {
     if (body.message) {
      return client.createError(message, `${client.bot_emojis.error} | \`0\` users found, please provide vaild Github username!`);
     }
     let { login, avatar_url, name, id, html_url, company, public_repos, public_gists, twitter_username, email, followers, following, location, created_at, bio } = body;
     const row = new MessageActionRow().addComponents(new MessageButton().setLabel("See profile").setURL(html_url).setStyle("LINK"));
     const embed = new MessageEmbed() // Prettier
      .setAuthor({ name: login, iconURL: avatar_url })
      .setTitle(`${client.bot_emojis.octo} Github Info`)
      .setColor("#4f545c")
      .setThumbnail(avatar_url)
      .addField(`${client.bot_emojis.member} Username`, `[${login}](${html_url})`);
     if (bio) embed.addField(`${client.bot_emojis.edit} Bio`, `>>> ${bio}`);
     embed.addField(`${client.bot_emojis.book} Repositories`, `> \`${public_repos || "0"}\``, true);
     embed.addField(`${client.bot_emojis.book} Public Gists`, `> \`${public_gists || "0"}\``, true);
     embed.addField(`${client.bot_emojis.paper_clips} Followers`, `> \`${followers}\``, true);
     embed.addField(`${client.bot_emojis.paper_clip} Following`, `> \`${following}\``, true);
     embed.addField(`${client.bot_emojis.octo} Github ID`, `> \`${id}\``, true);
     if (location) embed.addField(`${client.bot_emojis.earth} Location`, `>>> \`${location}\``, true);
     if (twitter_username) embed.addField(`${client.bot_emojis.bird} Twitter`, `> https://twitter.com/${twitter_username}`);
     if (company) embed.addField(`${client.bot_emojis.rocket} Company`, `> ${company}`);
     if (email) embed.addField(`${client.bot_emojis.email} E-Mail`, `> \`${email}\``);
     embed.addField(`${client.bot_emojis.stopwatch} Account Created`, `> <t:${moment(created_at).unix()}> (<t:${moment(created_at).unix()}:R>)`);
     embed.setFooter({
      text: `Requested by ${message.author.username}`,
      iconURL: message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     });
     embed.setTimestamp();
     message.reply({ embeds: [embed], components: [row] });
    });
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
