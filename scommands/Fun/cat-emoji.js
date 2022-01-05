const { MessageEmbed } = require("discord.js");
const client = require("nekos.life");
const neko = new client();

module.exports = {
 name: "cat-emoji",
 description: "Cats are cute",
 run: async (client, interaction, args) => {
  (async () => {
   try {
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
   } catch (err) {
    console.log(err);
    return client.createSlashCommandError(interaction, err);
   }
  })();
 },
};
