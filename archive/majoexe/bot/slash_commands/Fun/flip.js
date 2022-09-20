const { MessageEmbed } = require("discord.js");
const flip = require("flip-text");

module.exports = {
 name: "flip",
 description: "🔁 Flip coin/text",
 usage: "/flip coin | /flip text <text>",
 category: "Fun",
 container: true,
 options: [
  {
   name: "coin",
   description: "🪙 Flip coin (heads or tails)",
   type: 1,
   usage: `/flip coin`,
   category: "Fun",
   orgin: "flip",
  },
  {
   name: "text",
   description: "🔁 Flip text (upside down)",
   type: 1,
   usage: `/flip text`,
   category: "Fun",
   orgin: "flip",
   options: [
    {
     name: "text",
     description: "Text to flip",
     required: true,
     type: 3,
    },
   ],
  },
 ],
 run: async (client, interaction, args) => {
  try {
   if (args[0] == "coin") {
    const answers = ["Heads", "Tails"];
    const answer = answers[Math.floor(Math.random() * answers.length)];
    const embed = new MessageEmbed() // Prettier
     .setColor("#4f545c")
     .setThumbnail(`https://i.pinimg.com/originals/d7/49/06/d74906d39a1964e7d07555e7601b06ad.gif`)
     .setDescription(`> **I drew: ${client.bot_emojis.coin} ${answer}**`)
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
   } else {
    if (args.toString().length > client.max_input) {
     return client.createSlashError(interaction, `${client.bot_emojis.error} | The text can't be longer than \`${client.max_input}\` characters!`);
    }
    let flipped = [];
    args.slice(1).forEach((arg) => {
     flipped.push(flip(arg));
    });
    const embed = new MessageEmbed() // Prettier
     .setColor("#4f545c")
     .addField(`${client.bot_emojis.reverse_motherfucker} | Flipped text`, "```" + flipped.join(" ") + "```")
     .setFooter({
      text: `Requested by ${interaction.user.username}`,
      iconURL: interaction.user.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     })
     .setTimestamp();
    await interaction.followUp({ embeds: [embed] });
   }
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
