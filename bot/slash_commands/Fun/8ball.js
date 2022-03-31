const { MessageEmbed } = require("discord.js");

module.exports = {
 name: "8ball",
 description: `🔮 Tells you a *magic* fortune`,
 usage: "/8ball <question>",
 category: "Fun",
 options: [
  {
   name: "question",
   description: "Question to ask 8ball",
   required: true,
   type: 3,
  },
 ],
 run: async (client, interaction, args) => {
  try {
   if (!args) {
    return client.createSlashError(interaction, `${client.bot_emojis.error} | You need to enter question :/`);
   }
   if (args.toString().length > client.max_input) {
    return client.createSlashError(interaction, `${client.bot_emojis.error} | Question can't be longer than \`${client.max_input}\` characters!`);
   }
   const fortunes = ["Yes.", "It is certain.", "It is decidedly so.", "Without a doubt.", "Yes definelty.", "You may rely on it.", "As I see it, yes.", "Most likely.", "Outlook good.", "Signs point to yes.", "Reply hazy, try again.", "Ask again later.", "Better not tell you now...", "Cannot predict now.", "Concentrate and ask again.", "Don't count on it.", "My reply is no.", "My sources say no.", "Outlook not so good...", "Very doubtful."];
   const embed = new MessageEmbed() // Prettier
    .setDescription(`>>> **Q:** ${args} \n**A:** ${fortunes[Math.floor(Math.random() * fortunes.length)]}`)
    .setTimestamp()
    .setAuthor({ name: `${client.bot_emojis.magic_ball} 8Ball`, iconURL: client.user.displayAvatarURL() })
    .setColor("#00b0f4")
    .setFooter({
     text: `Requested by ${interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    });
   await interaction.followUp({ embeds: [embed] });
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
