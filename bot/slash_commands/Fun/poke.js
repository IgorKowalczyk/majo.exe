const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "poke",
 description: "👉 Poke someone (without ping of course)",
 usage: "/poke",
 category: "Fun",
 options: [
  {
   name: "user",
   description: "User to poke",
   required: true,
   type: 6,
  },
 ],
 run: async (client, interaction, args) => {
  const member = interaction.guild.members.cache.get(args[0]);
  (async () => {
   try {
    const response = await fetch("https://nekos.life/api/v2/img/poke");
    const body = await response.json();
    const embed = new MessageEmbed() // Prettier
     .setAuthor({
      name: `${member.user.username} just got a poke from ${interaction.user.username}`,
      iconURL: interaction.user.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     })
     .setDescription(`>>> ${member.user} got a poke from ${interaction.user}${Math.floor(Math.random() * 100 + 1) == 1 ? "\n||I want someone I can poke...||" : ""}`)
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
  })();
 },
};
