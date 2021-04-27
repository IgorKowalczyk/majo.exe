const Discord = require("discord.js");
const config = require("../config");

module.exports = {
 name: "queue",
 aliases: ["q"],
 description: "Displays the server queue",
 category: "Music",
 usage: "queue",
 run: async (client, message, args) => {
  try {
   if(!message.guild) return;
   const queue = message.client.queue.get(message.guild.id);
   if (!queue) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "This is nothing playing right now",
    }})
   }
   let description = "";
   for(let i = 1; i < queue.songs.length; i++){
     description += `**${i}.** [${queue.songs[i].title.substring(1,40)}](${queue.songs[i].url}) | \`${queue.songs[i].duration}\`\n`
   }
   let queue = new Discord.MessageEmbed()
    .setTitle("💿 Music Queue", message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
    .setDescription(description)
    .setColor("RANDOM")
    .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
   const splitDescription = Discord.splitMessage(description, {
    maxLength: 2048,
    char: "\n",
    prepend: "",
    append: ""
   });
   splitDescription.forEach(async (m) => {
     queue.setDescription(m);
     message.react("✅")
     message.channel.send(queue);
   })
  } catch (err) {
   console.log(err);
   return message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:",
   }})
  }
 }
}
