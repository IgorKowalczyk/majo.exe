const Discord = require("discord.js");
const Canvas = require("canvas");
const moment = require("moment");
const sql = require("../../utilities/database");

module.exports = async (client, member) => {
 try {
  const image = `./lib/img/welcome-gray.png`;
  const sqlquery = "SELECT channelid AS res FROM `leave` WHERE guildid = " + member.guild.id;
  sql.query(sqlquery, function (error, results, fields) {
   if (error) console.log(error);
   if (!results || results.length == 0) {
    return;
   }
   (async () => {
    lsetup = await results[0].res;
    const channel = await member.guild.channels.cache.find((c) => c.id == lsetup && c.type == "text");
    if (!channel) return;
    function checkdays(date) {
     let now = new Date();
     let diff = now.getTime() - date.getTime();
     let days = Math.floor(diff / 86400000);
     return days + (days == 1 ? " day" : " days") + " ago";
    }
    Canvas.registerFont("./lib/fonts/quicksand-light.ttf", {
     family: "Quicksand",
    });
    const canvas = Canvas.createCanvas(1772, 633);
    const ctx = canvas.getContext("2d");
    const background = await Canvas.loadImage(image);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#f2f2f2";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    var textString3 = `${member.user.username}`;
    if (textString3.length >= 14) {
     ctx.font = 'bold 150px "Quicksand"';
     ctx.fillStyle = "#f2f2f2";
     ctx.fillText(textString3, 720, canvas.height / 2 + 20); // User Name
    } else {
     ctx.font = 'bold 200px "Quicksand"';
     ctx.fillStyle = "#f2f2f2";
     ctx.fillText(textString3, 720, canvas.height / 2 + 25); // User Name
    }
    var textString2 = `#${member.user.discriminator}`;
    ctx.font = 'bold 40px "Quicksand"';
    ctx.fillStyle = "#f2f2f2";
    ctx.fillText(textString2, 730, canvas.height / 2 + 62); // User Tag
    var textString4 = `Member #${member.guild.memberCount}`;
    ctx.font = 'bold 60px "Quicksand"';
    ctx.fillStyle = "#f2f2f2";
    ctx.fillText(textString4, 720, canvas.height / 2 + 120); // Member Count
    var textString4 = `${member.guild.name}`;
    ctx.font = 'bold 70px "Quicksand"';
    ctx.fillStyle = "#f2f2f2";
    ctx.fillText(textString4, 720, canvas.height / 2 - 140); // Member Guild Name
    ctx.beginPath();
    ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    const avatar = await Canvas.loadImage(
     member.user.displayAvatarURL({
      format: "jpg",
      size: 2048,
     })
    );
    ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500);
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome-image.png");
    console.log(member.user.joinedAt);
    const embed = await new Discord.MessageEmbed() // Prettier
     .setColor("RANDOM")
     .setTimestamp()
     .setFooter(
      `${member.guild.name}`,
      member.user.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     )
     .setTitle(
      `**${member.user.username} left the server!**`,
      member.guild.iconURL({
       dynamic: true,
       format: "png",
      })
     )
     .setDescription(":calendar_spiral: **User joined server at:** `" + moment(member.user.joinedAt).format("MMMM Do YYYY, h:mm:ss") + "` (" + moment(member.user.joinedAt).fromNow() + ")")
     .setImage("attachment://welcome-image.png")
     .attachFiles(attachment);
    await channel.send(embed);
   })();
  });
 } catch (err) {
  console.log(err);
 }
};
