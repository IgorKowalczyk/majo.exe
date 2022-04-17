const { MessageEmbed } = require("discord.js");

module.exports = async (client, interaction, args) => {
 try {
  if (!interaction.guild.me.permissions.has("MANAGE_EMOJIS_AND_STICKERS")) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | I don't have premission to manage emojis!`);
  }
  if (!interaction.member.permissions.has("MANAGE_EMOJIS_AND_STICKERS")) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | You don't have premission to manage emojis!`);
  }
  if (!args[1]) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | You must provide a vaild emoji!`);
  }
  if (!isNaN(args[1])) {
   try {
   const emoji = await interaction.guild.emojis.fetch(args[1]);
   if (!emoji) {
    return client.createSlashError(interaction, `${client.bot_emojis.error} | The emoji ID is incorrect!`);
   }
     emoji
      .delete(`Removed by ${interaction.member.tag}`)
      .then((emoji) => {
       const embed = new MessageEmbed()
        .setColor("#5865F2")
        .setTitle(`${client.bot_emojis.success} Emoji successfully deleted!`)
        .addField(`${client.bot_emojis.edit} Emoji name`, `\`\`\`${emoji.name}\`\`\``, true)
        .addField(`${client.bot_emojis.screw_that} Emoji ID`, `\`\`\`${emoji.id}\`\`\``, true)
        .addField(`${client.bot_emojis.link} Emoji URL`, `> <${emoji.url}>`)
        .setFooter({
         text: `Requested by ${interaction.user.username}`,
         iconURL: interaction.user.displayAvatarURL({
          dynamic: true,
          format: "png",
          size: 2048,
         }),
        });
       return interaction.followUp({ embeds: [embed] });
      })
      .catch((err) => {
       console.log(err)
       client.createSlashError(interaction, `${client.bot_emojis.error} | ${err}`);
      });
    } catch(err) {
     return client.createSlashError(interaction, `${client.bot_emojis.error} | The emoji ID is incorrect!`);
    }
  } else {
   try {
   const emoji = interaction.guild.emojis.cache.find((emoji) => emoji.name === args[1])
     if (!emoji) {
      return client.createSlashError(interaction, `${client.bot_emojis.error} | The emoji name is incorrect!`);
     }
     emoji
      .delete(`Removed by ${interaction.member.tag}`)
      .then((emoji) => {
       const embed = new MessageEmbed()
        .setColor("#5865F2")
        .setTitle(`${client.bot_emojis.success} Emoji successfully deleted!`)
        .addField(`${client.bot_emojis.edit} Emoji name`, `\`\`\`${emoji.name}\`\`\``, true)
        .addField(`${client.bot_emojis.screw_that} Emoji ID`, `\`\`\`${emoji.id}\`\`\``, true)
        .addField(`${client.bot_emojis.link} Emoji URL`, `> <${emoji.url}>`)
        .setFooter({
         text: `Requested by ${interaction.user.username}`,
         iconURL: interaction.user.displayAvatarURL({
          dynamic: true,
          format: "png",
          size: 2048,
         }),
        });
       return interaction.followUp({ embeds: [embed] });
      })
     } catch (err) {
      client.createSlashError(interaction, `${client.bot_emojis.error} | The emoji name is incorrect!`);
 
    }
    };
 } catch (err) {
  console.log(err)
  return client.createSlashError(interaction, `${client.bot_emojis.error} | ${err}`);
 }
};
