const { MessageEmbed, MessageAttachment } = require("discord.js");
const AmeClient = require("amethyste-api");
const AmeAPI = new AmeClient(process.env.AMEAPI);

module.exports = {
 name: "distort",
 description: "😵‍💫 Add distort effect to user avatar",
 category: "Image",
 usage: "/distort [user]",
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
   const wait = new MessageEmbed() // Prettier
    .setColor("#5865f2")
    .setDescription(`${client.bot_emojis.loading} | Please wait... I'm generating your image`);
   interaction.followUp({ embeds: [wait] }).then((msg) => {
    (async () => {
     const buffer = await AmeAPI.generate("distort", {
      url: member.user.displayAvatarURL({
       format: "png",
       size: 2048,
      }),
     });
     const attachment = new MessageAttachment(buffer, "distort.png");
     msg.edit({ embeds: [], files: [attachment] });
    })();
   });
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
