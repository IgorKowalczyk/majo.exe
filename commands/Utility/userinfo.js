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
   const user = message.mentions.members.first() || message.author;
   let stat = {
    online: "https://emoji.gg/assets/emoji/9166_online.png",
    idle: "https://emoji.gg/assets/emoji/3929_idle.png",
    dnd: "https://emoji.gg/assets/emoji/2531_dnd.png",
    offline: "https://emoji.gg/assets/emoji/7445_status_offline.png"
   }
   let badges = await user.user.flags
   badges = await badges.toArray();
   let newbadges = [];
   badges.forEach(m => {
    newbadges.push(m.replace("_", " "))
   })
   const embed = new MessageEmbed()
   .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
   let array = []
   if (user.user.presence.activities.length) {
    let data = user.user.presence.activities;
    for (let i = 0; i < data.length; i++) {
     let name = data[i].name || "None"
     let xname = data[i].details || "None"
     let zname = data[i].state || "None"
     let type = data[i].type
     array.push(`**${type}** : \`${name} : ${xname} : ${zname}\``)
     if (data[i].name === "Spotify") {
      embed.setThumbnail(`https://i.scdn.co/image/${data[i].assets.largeImage.replace("spotify:", "")}`)
     }
     embed.setDescription(array.join("\n"))
    }
   }
   embed.setColor(user.displayHexColor === "#000000" ? "#ffffff" : user.displayHexColor)
   embed.setAuthor(user.user.tag, user.user.displayAvatarURL({ dynamic: true }))
   if (user.nickname !== null) embed.addField("Nickname", user.nickname)
   embed.addField("Joined At", moment(user.user.joinedAt).format("LLLL"))
    .addField("Account Created At", moment(user.user.createdAt).format("LLLL"))
    .addField("Common Information", `ID: \`${user.user.id}\`\nDiscriminator: ${user.user.discriminator}\nBot: ${user.user.bot}\nDeleted User: ${user.deleted}`)
    .addField("Badges", newbadges.join(", ").toLowerCase() || "None")
    .setFooter(user.user.presence.status, stat[user.user.presence.status])
   message.lineReply(embed);
  } catch(err) {
   console.log(err);
   message.lineReply({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
 