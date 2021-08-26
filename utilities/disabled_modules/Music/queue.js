const Discord = require("discord.js");

module.exports = {
 name: "queue",
 aliases: ["q"],
 description: "Displays the server queue",
 category: "Music",
 usage: "queue",
 run: async (client, message, args) => {
  try {
   if (!message.guild) return;
   const queue = message.client.queue.get(message.guild.id);
   if (!queue) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | This is nothing playing right now`,
     },
    });
   }
   let description = "";
   for (let i = 1; i < queue.songs.length; i++) {
    description += `**${i}.** [${queue.songs[i].title.substring(0, 40)}](${queue.songs[i].url}) | \`${queue.songs[i].duration}\`\n`;
   }
   if (description.length == 0) {
    description = "There is nothing in the queue!";
   }
   const queueembed = new Discord.MessageEmbed() // Prettier
    .setTitle(
     `${client.bot_emojis.optical_disk} Music Queue`,
     message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    )
    .setDescription(description)
    .setColor("RANDOM")
    .setFooter(
     `Requested by ${message.author.username}`,
     message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    );
   const splitDescription = Discord.splitMessage(description, {
    maxLength: 2048,
    char: "\n",
    prepend: "",
    append: "",
   });
   splitDescription.forEach(async (m) => {
    queueembed.setDescription(m);
    message.lineReply(queueembed);
   });
  } catch (err) {
   return message.lineReply({
    embed: {
     color: 16734039,
     description: `Something went wrong... ${client.bot_emojis.sadness}`,
    },
   });
  }
 },
};
