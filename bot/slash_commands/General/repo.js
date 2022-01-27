const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "repo",
 description: "Provide link to the github project",
 run: async (client, interaction, args) => {
  try {
   if (!client.config.github && !client.config.github_repo) {
    return client.createSlashError(interaction, `${client.bot_emojis.error} | This project is close-source!`);
   }
   function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
   }
   (async () => {
    const response = await fetch(`https://api.github.com/repos/${client.config.github}/${client.config.github_repo}/commits`);
    const body = await response.json();
    const embed = new MessageEmbed() // Prettier
     .setTitle(`${client.bot_emojis.octo} ${capitalize(client.user.username)} Github Repo`)
     .setDescription(`• This project is open source: [@${client.config.github}/${client.config.github_repo}](https://github.com/${client.config.github}/${client.config.github_repo})\n\`\`\` \`\`\``)
     .addField(`${client.bot_emojis.book} Latest commit [${body[0].commit.committer.date}]`, `SHA: \`${body[0].sha}\`\n[${body[0].html_url.slice(0, 55)}...](${body[0].html_url})`)
     .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }) })
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
    interaction.followUp({ embeds: [embed], components: [row] });
   })();
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
