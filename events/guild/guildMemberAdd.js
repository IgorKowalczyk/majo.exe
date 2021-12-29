const { MessageEmbed, MessageAttachment } = require("discord.js");
const Canvas = require("canvas");
const moment = require("moment");
const sql = require("../../utilities/database");

module.exports = async (client, member) => {
 try {
  const image = `./src/img/welcome.png`;
  const sqlquery = "SELECT channelid AS res FROM welcome WHERE guildid = " + member.guild.id;
  sql.query(sqlquery, function (error, results, fields) {
   if (error) console.log(error);
   if (!results || results.length == 0) {
    return;
   }
   (async () => {
    welsetup = await results[0].res;
    await member.guild.channels.fetch();
    const channel = await member.guild.channels.cache.find((c) => c.id == welsetup);
    if (!channel) return;
    if (!member.guild) return;
    Canvas.registerFont("./src/fonts/quicksand-light.ttf", {
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
    const attachment = new MessageAttachment(canvas.toBuffer(), "welcome-image.png");
    const embed = new MessageEmbed() // Prettier
     .setColor("RANDOM")
     .setTimestamp()
     .setFooter({
      text: `${member.guild.name}`,
      iconURL: member.user.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     })
     .setTitle(
      `**Welcome to the server ${member.user.username}!**`,
      member.guild.iconURL({
       dynamic: true,
       format: "png",
      })
     )
     .setDescription(":calendar_spiral: **Acount created at:** `" + moment(member.user.createdAt).format("MMMM Do YYYY, h:mm:ss") + "` (" + moment(member.user.createdAt).fromNow() + ")")
     .setImage("attachment://welcome-image.png");
    await channel.send({ embeds: [embed], files: [attachment] });
   })();
  });
 } catch (err) {
  console.log(err);
 }
};
