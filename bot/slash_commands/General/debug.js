const { MessageEmbed } = require("discord.js");

module.exports = {
 name: "debug",
 description: "Debug bot in this server",
 options: [
  {
   name: "query",
   required: true,
   description: "Debug what?",
   type:	3,
   choices: [
    {
     name: "Debug bot",
     value: "bot",
    },
    {
     name: "Debug dependencies",
     value: "dependencies",
    },
   ]
  },

 ],
 run: async (client, interaction, args) => {
  console.log(args)
  try {
   if(args[0] == "bot") {
   const embed = new MessageEmbed()
    .setTitle(`${client.bot_emojis.discord_logo} ${client.user.username} Debug`)
    .setDescription(
     `These are the bot premissions on this server. If <@${client.user.id}> misses them some commands & functions will be disabled!
     • \`ADMINISTRATOR\`: ${interaction.guild.me.permissions.has("ADMINISTRATOR") ? `${client.bot_emojis.success}` : `${client.bot_emojis.error}`}\n
     • \`MANAGE_MESSAGES\`: ${interaction.guild.me.permissions.has("MANAGE_MESSAGES") ? `${client.bot_emojis.success} Passed!` : `${client.bot_emojis.error} Error!`}
     • \`MANAGE_CHANNELS\`: ${interaction.guild.me.permissions.has("MANAGE_CHANNELS") ? `${client.bot_emojis.success} Passed!` : `${client.bot_emojis.error} Error!`}
     • \`MANAGE_ROLES\`: ${interaction.guild.me.permissions.has("MANAGE_ROLES") ? `${client.bot_emojis.success} Passed!` : `${client.bot_emojis.error} Error!`}
     • \`KICK_MEMBERS\`: ${interaction.guild.me.permissions.has("KICK_MEMBERS") ? `${client.bot_emojis.success} Passed!` : `${client.bot_emojis.error} Error!`}
     • \`BAN_MEMBERS\`: ${interaction.guild.me.permissions.has("BAN_MEMBERS") ? `${client.bot_emojis.success} Passed!` : `${client.bot_emojis.error} Error!`}
     • \`ADD_REACTIONS\`: ${interaction.guild.me.permissions.has("ADD_REACTIONS") ? `${client.bot_emojis.success} Passed!` : `${client.bot_emojis.error} Error!`}
     • \`MANAGE_EMOJIS_AND_STICKERS\`: ${interaction.guild.me.permissions.has("MANAGE_EMOJIS_AND_STICKERS") ? `${client.bot_emojis.success} Passed!` : `${client.bot_emojis.error} Error!`}
     • \`VIEW_AUDIT_LOG\`: ${interaction.guild.me.permissions.has("VIEW_AUDIT_LOG") ? `${client.bot_emojis.success} Passed!` : `${client.bot_emojis.error} Error!`}
     • \`SEND_MESSAGES\`: ${interaction.guild.me.permissions.has("SEND_MESSAGES") ? `${client.bot_emojis.success} Passed!` : `${client.bot_emojis.error} Error!`}
     • \`MANAGE_MESSAGES\`: ${interaction.guild.me.permissions.has("MANAGE_MESSAGES") ? `${client.bot_emojis.success} Passed!` : `${client.bot_emojis.error} Error!`}
     • \`EMBED_LINKS\`: ${interaction.guild.me.permissions.has("EMBED_LINKS") ? `${client.bot_emojis.success} Passed!` : `${client.bot_emojis.error} Error!`}
     • \`ATTACH_FILES\`: ${interaction.guild.me.permissions.has("ATTACH_FILES") ? `${client.bot_emojis.success} Passed!` : `${client.bot_emojis.error} Error!`}
     • \`USE_EXTERNAL_EMOJIS\`: ${interaction.guild.me.permissions.has("USE_EXTERNAL_EMOJIS") ? `${client.bot_emojis.success} Passed!` : `${client.bot_emojis.error} Error!`}
     > ${client.bot_emojis.stopwatch} Ping: ${Math.round(client.ws.ping)}ms`
    )
    .setTimestamp()
    .setColor("#4f545c")
    .setFooter({
     text: `Requested by ${interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    });
   interaction.followUp({ embeds: [embed] });
   } else if(args[0] == "dependencies") {
    const embed = new MessageEmbed() // Prettier
    .setTitle(`${client.bot_emojis.package} Dependencies`)
    .setDescription(`> <@${client.user.id}> runs on ${Object.keys(require("../../../package").dependencies).length} [NPM packages](https://www.npmjs.com) (Javascript power ${client.bot_emojis.muscule}!)`)
    .setTimestamp()
    .setImage("https://i.redd.it/tfugj4n3l6ez.png")
    .setColor("#5865F2")
    .setFooter({
     text: `Requested by ${interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    });
   interaction.followUp({ embeds: [embed] });
   }
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
