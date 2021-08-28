const Discord = require("discord.js");
const moment = require("moment");

module.exports = {
 name: "userinfo",
 aliases: ["uf", "user-info"],
 description: "Get a info about user",
 category: "Utility",
 usage: "userinfo [user]",
 run: async (client, message, args) => {
  try {
   const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.guild.members.cache.find((r) => r.displayName.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.member;
   let stat = {
    online: client.bot_emojis.status_online,
    idle: client.bot_emojis.status_idle,
    dnd: client.bot_emojis.status_dnd,
    offline: client.bot_emojis.status_offline,
   };
   function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
   }
   let badges = await user.user.flags;
   badges = await badges.toArray();
   let newbadges = [];
   badges.forEach((m) => {
    newbadges.push(m.replace("_", " "));
   });
   const embed = new Discord.MessageEmbed() // Prettier
    .setThumbnail(user.user.displayAvatarURL({ dynamic: true }));
   let array = [];
   if (user.user.presence.activities.length) {
    let data = user.user.presence.activities;
    for (let i = 0; i < data.length; i++) {
     let name = data[i].name || "None";
     let xname = data[i].details || "None";
     let zname = data[i].state || "None";
     let type = data[i].type;
     //array.push(capitalize(type.toLowerCase()) + `: \`${name} : ${xname} : ${zname}\``);
     array.push(`${client.bot_emojis.game_controller} ` + capitalize(type.toLowerCase()) + `: \`${name}\``);
     if (data[i].name === "Spotify") {
      embed.setThumbnail(`https://i.scdn.co/image/${data[i].assets.largeImage.replace("spotify:", "")}`);
     }
     embed.setDescription(array.join("\n"));
    }
   }
   if (user.user.bot == true) {
    var isbot = " <:botpart1:853243093485748254><:botpart2:853243092597604362>";
   } else {
    var isbot = ""; // This exists because user.user.bot sometimes return nothing not boolean
   }
   embed.setColor("RANDOM");
   embed.setTitle(
    user.user.tag + isbot,
    user.user.displayAvatarURL({
     dynamic: true,
    })
   );
   if (user.username) embed.addField("${client.bot_emojis.Nickname", user.username);
   embed.addField(`${client.bot_emojis.role} ID`, `\`${user.user.id}\``);
   embed.addField(`${client.bot_emojis.channel} Discriminator`, `\`#${user.user.discriminator}\``, true);
   embed.addField(`${client.bot_emojis.stopwatch} Joined server at`, `\`${moment(user.user.joinedAt).format("LLLL")}\``);
   embed.addField(`${client.bot_emojis.stopwatch} Account created at`, `\`${moment(user.user.createdAt).format("LLLL")}\``);
   embed.addField(`${client.bot_emojis.wastebasket} Account Deleted?`, `\`${capitalize(user.deleted)}\``, true);
   embed.addField(`${client.bot_emojis.discord_badges} Badges`, newbadges.join(", ").toLowerCase() || "None");
   embed.addField(`Status`, `${stat[user.user.presence.status]} ${capitalize(user.user.presence.status)}`);
   embed.setFooter(
    `Requested by ${message.author.username}`,
    message.author.displayAvatarURL({
     dynamic: true,
     format: "png",
     size: 2048,
    })
   );
   message.lineReply(embed);
  } catch (err) {
   console.log(err);
   message.lineReply({
    embed: {
     color: 16734039,
     description: `Something went wrong... ${client.bot_emojis.sadness}`,
    },
   });
  }
 },
};
