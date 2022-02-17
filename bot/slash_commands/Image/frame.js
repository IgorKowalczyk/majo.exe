const { MessageEmbed, MessageAttachment } = require("discord.js");
const AmeClient = require("amethyste-api");
const AmeAPI = new AmeClient(process.env.AMEAPI);

module.exports = {
 name: "frame",
 description: "🖼️ Place user avatar in a frame",
 category: "Image",
 usage: "/frame",
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
     const buffer = await AmeAPI.generate("frame", {
      url: member.user.displayAvatarURL({
       format: "png",
       size: 2048,
      }),
     });
     const attachment = new MessageAttachment(buffer, "frame.png");
     msg.edit({ embeds: [], files: [attachment] });
    })();
   });
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
