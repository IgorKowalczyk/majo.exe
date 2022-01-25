const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const axios = require("axios");

module.exports = {
 name: "server-avatar",
 aliases: ["user-server-avatar"],
 description: "Get user avatar on current server",
 category: "Utility",
 usage: "noping",
 run: async (client, message, args) => {
  try {
   const member = (await message.mentions.members.first()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.guild.members.cache.find((r) => r.displayName.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.member;
   const data = await axios
    .get(`https://discord.com/api/guilds/${message.guild.id}/members/${member.id}`, {
     headers: {
      Authorization: `Bot ${client.token}`,
     },
    })
    .then((d) => d.data);
   if (data.avatar && data.avatar != member.avatar) {
    let url = data.avatar.startsWith("a_") ? ".gif?size=4096" : ".png?size=4096";
    url = `https://cdn.discordapp.com/guilds/${message.guild.id}/users/${member.id}/avatars/${data.avatar}${url}`;
    const row = new MessageActionRow().addComponents(
     // Prettier
     new MessageButton() // Prettier
      .setLabel("Avatar Link")
      .setStyle("LINK")
      .setURL(url)
    );
    const embed = new MessageEmbed()
     .setColor("RANDOM")
     .setImage(url)
     .setAuthor({ name: `${member.user.username} server avatar`, iconURL: url })
     .setDescription(`> ${client.bot_emojis.link} [Avatar link](${url})`)
     .setTimestamp()
     .setFooter({
      text: `Requested by ${message.author.username}`,
      iconURL: message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     });
    message.reply({ embeds: [embed], components: [row] });
   } else {
    return client.createError(message, `${client.bot_emojis.error} | User has no custom avatar!`);
   }
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
