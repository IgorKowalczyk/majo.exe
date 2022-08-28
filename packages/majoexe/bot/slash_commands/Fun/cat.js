const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const client = require("nekos.life");
const neko = new client();

module.exports = {
 name: "cat",
 description: "🐱 Something about cats!",
 category: "Image",
 usage: "/cat",
 container: true,
 options: [
  {
   name: "image",
   description: "🐱 Display a random picture of a cute cat",
   type: 1,
   usage: `/cat image`,
   category: "Fun",
   orgin: "cat",
  },
  {
   name: "emoji",
   description: "🐱 Get a random cat emoji because cats are cute",
   type: 1,
   usage: `/cat emoji`,
   category: "Fun",
   orgin: "cat",
  },
 ],
 run: async (client, interaction, args) => {
  try {
   if (args[0] === "image") {
    const response = await fetch("https://nekos.life/api/v2/img/meow");
    const body = await response.json();
    const embed = new MessageEmbed() // Prettier
     .setTitle(
      `${client.bot_emojis.cat} Random Cat`,
      interaction.guild.iconURL({
       dynamic: true,
       format: "png",
      })
     )
     .setImage(body.url)
     .setColor("RANDOM")
     .setFooter({
      text: "Requested by " + `${interaction.user.username}` + " • (Aww cute =＾´• ⋏ •`＾=)",
      iconURL: interaction.user.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     })
     .setTimestamp()
     .setURL(body.url);
    interaction.followUp({ embeds: [embed] });
   } else if (args[0] === "emoji") {
    let text = await neko.sfw.catText();
    const embed = new MessageEmbed()
     .setColor("RANDOM")
     .setDescription(`>>> \`${text.cat}\``)
     .setFooter({
      text: `Requested by ${interaction.user.username}`,
      iconURL: interaction.user.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     });
    interaction.followUp({ embeds: [embed] });
   }
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
