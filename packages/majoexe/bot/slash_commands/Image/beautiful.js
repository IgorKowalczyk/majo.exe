const { MessageEmbed, MessageAttachment } = require("discord.js");
const canvacord = require("canvacord");

module.exports = {
 name: "beautiful",
 description: "🖼️ Oh this? This is beautiful!",
 usage: "/beautiful [user]",
 category: "Image",
 options: [
  {
   name: "user",
   description: "User whose avatar will be used",
   required: false,
   type: 6,
  },
 ],
 run: async (client, interaction, args) => {
  try {
   const member = interaction.guild.members.cache.get(args[0]) || interaction.member;
   if (!member) {
    return client.createSlashError(interaction, `${client.bot_emojis.error} | Invaild user!`);
   }
   const wait = new MessageEmbed() // Prettier
    .setColor("#5865f2")
    .setDescription(`${client.bot_emojis.loading} | Please wait... I'm generating your image`);
   interaction.followUp({ embeds: [wait] }).then((msg) => {
    (async () => {
     const beautiful = await canvacord.Canvas.beautiful(
      member.user.displayAvatarURL({
       dynamic: false,
       format: "png",
       size: 2048,
      })
     );
     const attachment = new MessageAttachment(beautiful, "beautiful.png");
     msg.edit({ embeds: [], files: [attachment] });
    })();
   });
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
