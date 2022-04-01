const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "cuddle",
 description: `🤗 Cuddle user to make him feel better`,
 usage: "/cuddle <user>",
 category: "Fun",
 options: [
  {
   name: "user",
   description: "User to cuddle",
   required: true,
   type: 6,
  },
 ],
 run: async (client, interaction, args) => {
  try {
   const user = interaction.guild.members.cache.get(args[0]);
   console.log(user);
   if (!user) {
    return client.createSlashError(interaction, `${client.bot_emojis.error} | You must mention user to cuddle!`);
   }
   if (user == interaction.user) {
    return client.createSlashError(interaction, `${client.bot_emojis.grin} | You can't cuddle yourself ;-;`);
   }
   if (user == client.user) {
    return client.createSlashError(interaction, `${client.bot_emojis.grin} | Oh, you tried to hug me but u can't... Im not real...`);
   }
   const response = await fetch("https://nekos.life/api/v2/img/cuddle");
   const body = await response.json();
   const embed = new MessageEmbed() // Prettier
    .setTitle(`${user.user.username} has just been cuddled by ${interaction.user.username}`)
    .setDescription(`> ${user} got a hug from ${interaction.user}${Math.floor(Math.random() * 100 + 1) == 1 ? "\n||I want someone I can hug...||" : ""}`)
    .setImage(body.url)
    .setColor("RANDOM")
    .setFooter({
     text: `Requested by ${interaction.user.username}`,
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
