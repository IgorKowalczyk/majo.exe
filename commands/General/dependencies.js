const { MessageEmbed } = require("discord.js");

module.exports = {
 name: "dependencies",
 aliases: ["packages", "pkgs"],
 description: "Returns the amount of dependencies that I use",
 category: "General",
 usage: "dependencies",
 run: async (client, message, args) => {
  try {
   const embed = new MessageEmbed() // Prettier
    .setTitle(`${client.bot_emojis.package} Dependencies`)
    .setDescription(`> <@${client.user.id}> runs on ${Object.keys(require("../../package").dependencies).length} [NPM packages](https://www.npmjs.com) (Javascript power ${client.bot_emojis.muscule}!)`)
    .setTimestamp()
    .setImage("https://i.redd.it/tfugj4n3l6ez.png")
    .setColor("#5865F2")
    .setFooter({
     text: `Requested by ${message.author.username}`,
     iconURL: message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    });
   message.reply({ embeds: [embed] });
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
