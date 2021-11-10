const { MessageEmbed } = require("discord.js");

module.exports = {
 name: "profile",
 aliases: ["user-profile", "check-profile"],
 description: "Create & share your social profile with Steam, Facebook etc links!",
 category: "Social",
 usage: "profile [user]",
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
