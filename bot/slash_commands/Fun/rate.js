const { MessageEmbed } = require("discord.js");

module.exports = {
 name: "rate",
 description: "💯 Let me rate anything you want (0-100%)",
 usage: "/rate <query>",
 category: "Fun",
 options: [
  {
   name: "query",
   description: "What do you want me to rate?",
   required: true,
   type: 3,
  },
 ],
 run: async (client, interaction, args) => {
  const rate = args.toString();
  if (!rate) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | Please enter a text!`);
  }
  if (args.toString().length > client.max_input) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | Question can't be longer than \`${client.max_input}\` characters!`);
  }
  let result = Math.floor(Math.random() * 100 + 0);
  const happyrate = new MessageEmbed() // Prettier
   .setDescription(`${client.bot_emojis.sparkles} | I would rate **${rate}** \`${result}/100\` ?`)
   .setColor("GREEN")
   .setFooter({
    text: `Requested by ${interaction.user.username}`,
    iconURL: interaction.user.displayAvatarURL({
     dynamic: true,
     format: "png",
     size: 2048,
    }),
   })
   .setTimestamp();
  const sadembed = new MessageEmbed() // Prettier
   .setDescription(`${client.bot_emojis.sparkles} | I would rate **${rate}** \`${result}/100\` ??`)
   .setColor("RED")
   .setFooter({
    text: `Requested by ${interaction.user.username}`,
    iconURL: interaction.user.displayAvatarURL({
     dynamic: true,
     format: "png",
     size: 2048,
    }),
   })
   .setTimestamp();
  const idkembed = new MessageEmbed() // Prettier
   .setDescription(`${client.bot_emojis.sparkles} | I would rate **${rate}** \`${result}/100\` ??`)
   .setColor("YELLOW")
   .setFooter({
    text: `Requested by ${interaction.user.username}`,
    iconURL: interaction.user.displayAvatarURL({
     dynamic: true,
     format: "png",
     size: 2048,
    }),
   })
   .setTimestamp();
  const shrugembed = new MessageEmbed() // Prettier
   .setDescription(`${client.bot_emojis.sparkles} | I would rate **${rate}** \`${result}/100\` ??`)
   .setColor("YELLOW")
   .setFooter({
    text: `Requested by ${interaction.user.username}`,
    iconURL: interaction.user.displayAvatarURL({
     dynamic: true,
     format: "png",
     size: 2048,
    }),
   })
   .setTimestamp();
  const okembed = new MessageEmbed() // Prettier
   .setDescription(`${client.bot_emojis.sparkles} | I would rate **${rate}** \`${result}/100\` ??`)
   .setColor("GREEN")
   .setFooter({
    text: `Requested by ${interaction.user.username}`,
    iconURL: interaction.user.displayAvatarURL({
     dynamic: true,
     format: "png",
     size: 2048,
    }),
   })
   .setTimestamp();
  const thumbupembed = new MessageEmbed() // Prettier
   .setDescription(`${client.bot_emojis.sparkles} | I would rate **${rate}** \`${result}/100\` ??`)
   .setColor("GREEN")
   .setFooter({
    text: `Requested by ${interaction.user.username}`,
    iconURL: interaction.user.displayAvatarURL({
     dynamic: true,
     format: "png",
     size: 2048,
    }),
   })
   .setTimestamp();
  const eyesembed = new MessageEmbed() // Prettier
   .setDescription(`${client.bot_emojis.sparkles} | I would rate **${rate}** \`${result}/100\` ??`)
   .setColor("GREEN")
   .setFooter({
    text: `Requested by ${interaction.user.username}`,
    iconURL: interaction.user.displayAvatarURL({
     dynamic: true,
     format: "png",
     size: 2048,
    }),
   })
   .setTimestamp();
  if (result > 90) return interaction.followUp({ embeds: [happyrate] });
  if (result < 30) return interaction.followUp({ embeds: [sadembed] });
  if (result > 40) return interaction.followUp({ embeds: [idkembed] });
  if (result > 50) return interaction.followUp({ embeds: [shrugembed] });
  if (result > 60) return interaction.followUp({ embeds: [okembed] });
  if (result > 70) return interaction.followUp({ embeds: [thumbupembed] });
  if (result > 80) return interaction.followUp({ embeds: [eyesembed] });
 },
};
