const { MessageEmbed } = require("discord.js");

module.exports = {
 name: "iq",
 description: "🧠 Display user's IQ (or your own)",
 usage: "/iq [user]",
 category: "Fun",
 options: [
  {
   name: "user",
   description: "User to get IQ",
   required: false,
   type: 6,
  },
 ],
 run: async (client, interaction, args) => {
  try {
   const iq = Math.floor(Math.random() * 226);
   const embed = new MessageEmbed() // Prettier
    .setTitle(`${client.bot_emojis.brain} IQ Test:`)
    .setColor("#4f545c")
    .setTimestamp()
    .setFooter({
     text: `Requested by ${interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    });
   if (args[0]) {
    const member = interaction.guild.members.cache.get(args[0]);
    embed.setDescription(`${client.bot_emojis.light_bulb} ${member.user.username} IQ: \`${iq}\``);
   } else {
    embed.setDescription(`${client.bot_emojis.light_bulb} ${interaction.user.username} IQ: \`${iq}\``);
   }
   interaction.followUp({ embeds: [embed] });
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
