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
   const images = [
    ["Yes.", "https://c.tenor.com/TFhmPga4xEwAAAAC/magic8ball-yes.gif"],
    ["It is certain", "https://c.tenor.com/eyI116E3kWYAAAAC/yoda-8ball.gif"],
    ["Without a doubt", "https://c.tenor.com/-0tatbxLQVQAAAAC/yoda-8ball.gif"],
    ["Yes definelty", "https://c.tenor.com/fc7fywg2oQQAAAAC/yoda-8ball.gif"],
    ["You may rely on it", "https://c.tenor.com/8J1uZFp8xMUAAAAC/yoda-8ball.gif"],
    ["As I see it, yes", "https://c.tenor.com/EIAYng3CUf0AAAAC/yoda-8ball.gif"],
    ["Most likely", "https://c.tenor.com/EIAYng3CUf0AAAAC/yoda-8ball.gif"],
    ["Outlook not so good", "https://c.tenor.com/Ji3GcuKvu1cAAAAC/magic8ball-simpsons.gif"],
    ["Signs point to yes", "https://c.tenor.com/mrN4WoxyRE8AAAAC/shaking8ball-stranger-things4.gif"],
    ["Reply hazy, try again", "https://c.tenor.com/BokmYoZhr1AAAAAC/yoda-8ball.gif"],
    ["Ask again later", "https://c.tenor.com/Voqiq18wUFIAAAAC/yoda-8ball.gif"],
    ["Better not tell you now...", "https://c.tenor.com/Voqiq18wUFIAAAAC/yoda-8ball.gif"],
    ["Cannot predict now", "https://c.tenor.com/fs_hXVg58LkAAAAC/yoda-8ball.gif"],
    ["Concentrate and ask again", "https://c.tenor.com/Voqiq18wUFIAAAAC/yoda-8ball.gif"],
    ["Don't count on it", "https://c.tenor.com/cw2aa9cnQ6QAAAAC/magic-eight.gif"],
    ["My reply is no", "https://c.tenor.com/rJ1ioW_FkhUAAAAC/yoda-8ball.gif"],
   ];
   const json = JSON.stringify(images);
   const parsed = JSON.parse(json);
   const random = Math.floor(Math.random() * parsed.length);
   const embed = new MessageEmbed() // Prettier
    .setDescription(`>>> **Q:** ${args} \n**A:** ${parsed[random][0]}`)
    .setImage(parsed[random][1])
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
   return interaction.followUp({ embeds: [embed] });
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
