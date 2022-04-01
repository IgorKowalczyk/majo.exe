const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "joke",
 description: "😆 View random dad joke",
 usage: "/joke",
 category: "Fun",
 run: async (client, interaction, args) => {
  (async () => {
   try {
    const response = await fetch("http://icanhazdadjoke.com/", {
     method: "get",
     headers: {
      Accept: "application/json",
     },
    });
    const body = await response.json();
    const embed = new MessageEmbed() // Prettier
     .setTitle("Random Dad joke")
     .setDescription(`>>> ${body.joke}`)
     .setColor("#1fb56d")
     .setFooter({
      text: `Requested by ${interaction.user.username}`,
      iconURL: interaction.user.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     })
     .setTimestamp();
    interaction.followUp({ embeds: [embed] });
   } catch (err) {
    console.log(err);
    return client.createSlashCommandError(interaction, err);
   }
  })();
 },
};
