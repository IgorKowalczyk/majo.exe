const Canvas = require("canvas");
const { MessageEmbed, MessageAttachment } = require("discord.js");
const moment = require("moment");

module.exports = async (client, member, channel) => {
 await Canvas.registerFont(`${process.cwd()}/src/fonts/quicksand-light.ttf`, {
  family: "Quicksand",
 });
 const canvas = Canvas.createCanvas(1772, 633);
 const context = canvas.getContext("2d");
 const image = `${process.cwd()}/src/img/auto_messages/join.png`;
 const background = await Canvas.loadImage(image);
 context.drawImage(background, 0, 0, canvas.width, canvas.height);
 const member_username = `${member.user.username}`;
 if (member_username.length >= 14) {
  context.font = 'bold 150px "Quicksand"';
  context.fillStyle = "#f2f2f2";
  context.fillText(member_username, 720, canvas.height / 2 + 20);
 } else {
  context.font = 'bold 200px "Quicksand"';
  context.fillStyle = "#f2f2f2";
  context.fillText(member_username, 720, canvas.height / 2 + 25);
 }
 context.font = 'bold 40px "Quicksand"';
 context.fillStyle = "#f2f2f2";
 context.fillText(`#${member.user.discriminator}`, 730, canvas.height / 2 + 62);
 context.font = 'bold 60px "Quicksand"';
 context.fillStyle = "#f2f2f2";
 context.fillText(`Member #${member.guild.memberCount}`, 720, canvas.height / 2 + 120);
 context.font = 'bold 70px "Quicksand"';
 context.fillStyle = "#f2f2f2";
 context.fillText(`${member.guild.name}`, 720, canvas.height / 2 - 140);
 context.beginPath();
 context.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true);
 context.closePath();
 context.clip();
 const avatar = await Canvas.loadImage(
  member.user.displayAvatarURL({
   format: "jpg",
   size: 2048,
  })
 );
 context.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500);
 const attachment = new MessageAttachment(canvas.toBuffer(), "welcome-image.png");
 const embed = new MessageEmbed() // Prettier
  .setColor("#5865F2")
  .setTimestamp()
  .setFooter({
   text: `${member.guild.name}`,
   iconURL: member.user.displayAvatarURL({
    dynamic: true,
    format: "png",
    size: 2048,
   }),
  })
  .setTitle(`**Welcome ${member.user.username}!**`)
  .setDescription(`> ${client.bot_emojis.stopwatch} Account created on <t:${moment(member.user.createdAt).unix()}:D> (<t:${moment(member.user.createdAt).unix()}:R>)`)
  .setImage("attachment://welcome-image.png");
 channel.send({ embeds: [embed], files: [attachment] });
};
