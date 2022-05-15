const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
 name: "suggest",
 description: "📤 Suggest a new feature in the bot",
 usage: "/suggest <suggestion>",
 category: "General",
 options: [
  {
   name: "suggestion",
   description: "What you want to tell us",
   type: 3,
   required: true,
  },
 ],
 run: async (client, interaction, args) => {
  try {
   const suggestion = args.join(" ");
   if (!suggestion) {
    return client.createSlashError(interaction, `${client.bot_emojis.error} | You need to enter a suggestion!`);
   }
   if (args.toString().length > client.max_input) {
    return client.createSlashError(interaction, `${client.bot_emojis.error} |  Your suggestion can have a maximum of \`${client.max_input}\` characters!`);
   }
   const channel = client.channels.cache.get(client.config.suggestions_channel);
   if (channel) {
    const embed = new MessageEmbed() // Prettier
     .setAuthor({ name: `${client.bot_emojis.thinking} ${interaction.user.username} suggestion!`, iconURL: interaction.guild.iconURL() })
     .setColor("#5865F2")
     .setDescription(`\`\`\`${suggestion}\`\`\``)
     .addField("Reporter", `<@${interaction.user.id}> (ID: ${interaction.user.id})`)
     .addField("User guild", `${interaction.guild.name} (ID: ${interaction.guild.id})`)
     .setFooter({
      text: client.user.username,
      iconURL: interaction.user.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     })
     .setThumbnail(interaction.guild.iconURL());
    channel.send({ embeds: [embed] });
    const success = new MessageEmbed() // Prettier
     .setColor("RANDOM")
     .setTitle(`${client.bot_emojis.success} Success!`)
     .setDescription(`${interaction.user} your suggestion was send, you can view it in Majo.exe Developers server in <#${client.config.suggestions_channel}> channel.`)
     .setFooter({
      text: client.config.support_server,
      iconURL: interaction.user.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     });
    const row = new MessageActionRow() // Prettier
     .addComponents(
      // Prettier
      new MessageButton() // Prettier
       .setURL(client.config.support_server)
       .setLabel("View suggestion")
       .setStyle("LINK")
     );

    interaction.followUp({ embeds: [embed], components: [row] });
   } else {
    return client.createSlashError(interaction, `${client.bot_emojis.error} | I can't find suggestions channel. Mayby the channel didn't exist. If you are the bot developer please configure it in config.`);
   }
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
