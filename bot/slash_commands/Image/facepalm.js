const { MessageEmbed, MessageAttachment } = require("discord.js");
const canvacord = require("canvacord");

module.exports = {
 name: "facepalm",
 aliases: [],
 description: "🤦 Creates facepalm image",
 category: "Image",
 usage: "facepalm [user]",
 run: async (client, interaction, args) => {
  try {
   const member = interaction.guild.members.cache.get(args[0]) || interaction.member;
   const wait = new MessageEmbed() // Prettier
    .setColor("#5865f2")
    .setDescription(`${client.bot_emojis.loading} | Please wait... I'm generating your image`);
   interaction.followUp({ embeds: [wait] }).then((msg) => {
    (async () => {
     const facepalm = await canvacord.Canvas.facepalm(
      member.user.displayAvatarURL({
       dynamic: false,
       format: "png",
       size: 2048,
      })
     );
     const attachment = new MessageAttachment(facepalm, "facepalm.png");
     msg.edit({ embeds: [], files: [attachment] });
    })();
   });
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
