const { MessageEmbed } = require("discord.js");

module.exports = {
 name: "flat-earth",
 description: `🌍 Demonstrates that the earth really is flat`,
 usage: "/flat-earth [user]",
 category: "Fun",
 options: [
  {
   name: "user",
   description: "User to demonstrate",
   required: false,
   type: 6,
  },
 ],
 run: async (client, interaction, args) => {
  try {
   const embed = new MessageEmbed() // Prettier
    .setColor("RANDOM")
    .setImage("https://media1.tenor.com/images/462b6d76beee0f9501d20535dae9c00b/tenor.gif?itemid=13792633")
    .setFooter({
     text: `Requested by ${interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    })
    .setTimestamp();
   if (args) {
    const member = interaction.guild.members.cache.get(args[0]);
    embed.setTitle(`${client.bot_emojis.earth} ${member.user.username} If the earth isn't flat, explain this`);
   } else {
    embed.setTitle(`${client.bot_emojis.earth} If the earth isn't flat, explain this`);
   }
   interaction.followUp({ embeds: [embed] });
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
