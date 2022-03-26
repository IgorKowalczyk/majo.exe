const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "repo",
 aliases: ["open-source", "code", "github-repo"],
 description: "Provide link to the github project",
 category: "General",
 usage: "repo",
 run: async (client, message, args) => {
  try {
   if (!client.config.github && !client.config.github_repo) {
    return client.createError(message, `${client.bot_emojis.error} | This project is close-source!`);
   }
   (async () => {
    const response = await fetch(`https://api.github.com/repos/${client.config.github}/${client.config.github_repo}/commits`);
    const body = await response.json();
    const embed = new MessageEmbed() // Prettier
     .setTitle(`${client.bot_emojis.octo} ${client.user.username.capitalize()} Github Repo`)
     .setDescription(`• This project is open source: [@${client.config.github}/${client.config.github_repo}](https://github.com/${client.config.github}/${client.config.github_repo})\n\`\`\` \`\`\``)
     .addField(`${client.bot_emojis.book} Latest commit [${body[0].commit.committer.date}]`, `SHA: \`${body[0].sha}\`\n[${body[0].html_url.slice(0, 55)}...](${body[0].html_url})`)
     .setFooter({ text: `Requested by ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }) })
     .setColor("RANDOM")
     .setTimestamp();
    const row = new MessageActionRow()
     .addComponents(
      new MessageButton() // Prettier
       .setURL(`https://github.com/${client.config.github}/${client.config.github_repo}`)
       .setLabel("Github repo")
       .setStyle("LINK")
     )
     .addComponents(
      new MessageButton() // Prettier
       .setURL(body[0].html_url)
       .setLabel("Latest commit")
       .setStyle("LINK")
     );
    message.reply({ embeds: [embed], components: [row] });
   })();
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
