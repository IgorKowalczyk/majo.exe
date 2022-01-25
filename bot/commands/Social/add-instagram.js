const { MessageEmbed } = require("discord.js");

module.exports = {
 name: "add-instagram",
 aliases: [],
 description: "Add/Remove your Instagram from social profile",
 category: "Social",
 usage: "add-instagram [Instagram username]",
 run: async (client, message, args) => {
  try {
   const embed = new MessageEmbed().setTitle("Soon!").setColor("GREEN").setDescription("> WIP").setImage("https://media4.giphy.com/media/MHVc6pPqfiUnK/giphy.gif").setTimestamp();
   message.reply({ embeds: [embed] });
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
