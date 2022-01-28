const { MessageEmbed } = require("discord.js");
const flip = require("flip-text");

module.exports = {
 name: "flip",
 description: "🔁 Flip coin/text",
 options: [
  {
   name: "coin",
   description: "🪙 Flip coin",
   type: 1,
  },
  {
   name: "text",
   description: "🔁 Flip text",
   type: 1,
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
     .setDescription(`${client.bot_emojis.coin} ${answer}`)
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
