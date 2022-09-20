const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "tickle",
 description: "😳 Tickle someone for fun",
 usage: "/tickle <user>",
 category: "Fun",
 options: [
  {
   name: "user",
   description: "User to tickle",
   required: true,
   type: 6,
  },
 ],
 run: async (client, interaction, args) => {
  try {
   const user = interaction.guild.members.cache.get(args[0]);
   console.log(user);
   if (!user) {
    return client.createSlashError(interaction, `${client.bot_emojis.error} | You must mention user to tickle!`);
   }
   if (user == interaction.user) {
    return client.createSlashError(interaction, `${client.bot_emojis.grin} | You can't tickle yourself ;-;`);
   }
   const response = await fetch("https://nekos.life/api/v2/img/tickle");
   const body = await response.json();
   const embed = new MessageEmbed() // Prettier
    .setTitle(`${user.user.username} just got tickled by ${interaction.user.username}`)
    .setImage(body.url)
    .setColor("RANDOM")
    .setFooter({
     text: `Requested by ${interaction.user.username} • ._.`,
     iconURL: interaction.user.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    })
    .setTimestamp()
    .setURL(body.url);
   interaction.followUp({ embeds: [embed] });
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
