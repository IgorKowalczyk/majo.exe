const { MessageEmbed, MessageAttachment } = require("discord.js");
const AmeClient = require("amethyste-api");
const AmeAPI = new AmeClient(process.env.AMEAPI);

module.exports = {
 name: "blur",
 description: "👁️ Blur user avatar",
 usage: "/blur <user> <blur>",
 category: "Image",
 options: [
  {
   name: "user",
   description: "User whose avatar will be used",
   required: true,
   type: 6,
  },
  {
   name: "blur",
   description: "Number between 1-30",
   required: true,
   type: 4,
   min_value: 1,
   max_value: 30,
  },
 ],
 run: async (client, interaction, args) => {
  try {
   const member = interaction.guild.members.cache.get(args[0]) || interaction.member;
   const blur = parseInt(args[1]);
   if (!member) {
    return client.createSlashError(interaction, `${client.bot_emojis.error} | Invaild user!`);
   }
   const wait = new MessageEmbed() // Prettier
    .setColor("#5865f2")
    .setDescription(`${client.bot_emojis.loading} | Please wait... I'm generating your image`);
   interaction.followUp({ embeds: [wait] }).then((msg) => {
    (async () => {
     const buffer = await AmeAPI.generate("blur", {
      url: member.user.displayAvatarURL({
       format: "png",
       size: 2048,
      }),
      blur: blur,
     });
     const attachment = new MessageAttachment(buffer, "blur.png");
     msg.edit({ embeds: [], files: [attachment] });
    })();
   });
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
