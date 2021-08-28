const Discord = require("discord.js");
const ytsr = require("youtube-sr").default;
const { play } = require("../../utilities/play");

module.exports = {
 name: "search",
 aliases: ["music-search", "s"],
 description: "Search and select videos to play",
 category: "Music",
 usage: "search <term>",
 run: async (client, message, args, silient) => {
  try {
   if (!message.guild) return;
   const { channel } = message.member.voice;
   const serverQueue = message.client.queue.get(message.guild.id);
   if (message.channel.activeCollector) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | There is a search active!`,
     },
    });
   }
   if (!message.member.voice.channel) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | Please join a voice channel first!`,
     },
    });
   }
   if (serverQueue && channel !== message.guild.me.voice.channel) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | You must be in the same voice channel as me!`,
     },
    });
   }
   const search = args.join(" ");
   if (!search) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | You must enter a song for search!`,
     },
    });
   }
   const first = new Discord.MessageEmbed() // Prettier
    .setAuthor("Searching...")
    .setColor("RANDOM")
    .setFooter(
     `Requested by ${message.author.username}`,
     message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    );
   const resultsEmbed = new Discord.MessageEmbed() // Prettier
    .setTitle("Results for ")
    .setDescription(`\`${search}\``)
    .setColor("RANDOM")
    .setAuthor(
     "Search results",
     message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    )
    .setFooter(
     "Response with your favorite number | Requested by " + `${message.author.username}`,
     message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    );
   const results = await ytsr.search(search, {
    limit: 5,
   });
   results.map((video, index) => resultsEmbed.addField(video.url, `${index + 1}. ${video.title}`));
   const resultsMessage = await message.lineReply(first);
   await resultsMessage.react("1️⃣");
   await resultsMessage.react("2️⃣");
   await resultsMessage.react("3️⃣");
   await resultsMessage.react("4️⃣");
   await resultsMessage.react("5️⃣");
   await resultsMessage.edit(resultsEmbed);
   message.channel.activeCollector = true;
   let response;
   await resultsMessage
    .awaitReactions((reaction, user) => user.id == message.author.id, {
     max: 1,
     time: 60000,
     errors: ["time"],
    })
    .then((collected) => {
     if (collected.first().emoji.name == "1️⃣") {
      return (response = 1);
     }
     if (collected.first().emoji.name == "2️⃣") {
      return (response = 2);
     }
     if (collected.first().emoji.name == "3️⃣") {
      return (response = 3);
     }
     if (collected.first().emoji.name == "4️⃣") {
      return (response = 4);
     }
     if (collected.first().emoji.name == "5️⃣") {
      return (response = 5);
     } else {
      response = "error";
     }
    });
   if (response === "error") {
    message.channel.activeCollector = false;
    message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | An error occurred`,
     },
    });
    return resultsMessage.delete();
   }
   const choice = resultsEmbed.fields[parseInt(response) - 1].name;
   message.channel.activeCollector = false;
   client.commands.get("play").run(client, message, [choice]);
   //play(choice, message, client, silient);
   resultsMessage.delete();
  } catch (err) {
   console.log(err);
   resultsMessage.delete();
   message.channel.activeCollector = false;
   return message.lineReply({
    embed: {
     color: 16734039,
     description: `Something went wrong... ${client.bot_emojis.sadness}`,
    },
   });
  }
 },
};
