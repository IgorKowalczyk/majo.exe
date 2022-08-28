const { MessageEmbed } = require("discord.js");

module.exports = {
 name: "pp",
 description: "👌 Show the size of your PP",
 usage: "/pp <user>",
 category: "Fun",
 options: [
  {
   name: "user",
   description: "User to check PP size (8===D)",
   required: true,
   type: 6,
  },
 ],
 run: async (client, interaction, args) => {
  try {
   const user = interaction.guild.members.cache.get(args[0]);
   const pepe = "8" + "=".repeat(Math.floor(Math.random() * 15)) + "D";
   const embed = new MessageEmbed() // Prettier
    .setTitle(`Pe-pe :smirk:`)
    .setDescription(`${client.bot_emojis.flushed} | ${user}, you're pepe is **${pepe}** long!`)
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter({
     text: `Requested by ${interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    });
   interaction.followUp({ embeds: [embed] });
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
