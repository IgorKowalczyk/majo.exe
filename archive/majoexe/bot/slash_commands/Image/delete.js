const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "delete",
 description: "🗑️ Delete a image (even from memory)",
 category: "Image",
 usage: "/delete <user>",
 options: [
  {
   name: "user",
   description: "User whose avatar will be used",
   required: true,
   type: 6,
  },
 ],
 run: async (client, interaction, args) => {
  try {
   const member = interaction.guild.members.cache.get(args[0]);
   if (!member) {
    return client.createSlashError(interaction, `${client.bot_emojis.error} | Invaild user!`);
   }
   const image = member.user.displayAvatarURL({ format: "png" });
   const response = await fetch(`https://api.no-api-key.com/api/v2/delete?image=${image.toString()}`);
   if (response.status !== 200) {
    return client.createSlashError(interaction, `${client.bot_emojis.error} | Error while generating image!`);
   }
   const embed = new MessageEmbed() // Prettier
    .setTitle(`${client.bot_emojis.trash} Delete this!`)
    .setColor("RANDOM")
    .setImage(response.url)
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
 },
};
