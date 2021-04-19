const Discord = require('discord.js');
const Canvas = require('canvas');
const config = require("../../config");
const prefix = config.prefix;

module.exports = async (client, member) => {
 try {
  const channel = member.guild.channels.cache.find(channel => channel.name.includes('hello-or-bye'));
  if (!channel) return;
  if(!member.guild) return;
  const canvas = Canvas.createCanvas(1772, 633);
  const ctx = canvas.getContext('2d');
  const background = await Canvas.loadImage(`./lib/img/welcome.png`);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#f2f2f2';
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
  var textString3 = `${member.user.username}`;
  if (textString3.length >= 14) {
   ctx.font = 'bold 100px Genta';
   ctx.fillStyle = '#f2f2f2';
   ctx.fillText(textString3, 720, canvas.height / 2 + 20);
  } else {
   ctx.font = 'bold 150px Genta';
   ctx.fillStyle = '#f2f2f2';
   ctx.fillText(textString3, 720, canvas.height / 2 + 20);
  }
  var textString2 = `#${member.user.discriminator}`;
  ctx.font = 'bold 40px Genta';
  ctx.fillStyle = '#f2f2f2';
  ctx.fillText(textString2, 730, canvas.height / 2 + 58);
  var textString4 = `Member #${member.guild.memberCount}`;
  ctx.font = 'bold 60px Genta';
  ctx.fillStyle = '#f2f2f2';
  ctx.fillText(textString4, 750, canvas.height / 2 + 125);
  var textString4 = `${member.guild.name}`;
  ctx.font = 'bold 60px Genta';
  ctx.fillStyle = '#f2f2f2';
  ctx.fillText(textString4, 700, canvas.height / 2 - 150);
  ctx.beginPath();
  ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();
  const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
  ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500);
  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
  const embed = new Discord.MessageEmbed()
   .setColor("RANDOM")
   .setTimestamp()
   .setFooter(`${member.guild.username}`, member.user.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
   .setDescription(`**Welcome to the server ${member.guild.name}!**`)
   .setImage("attachment://welcome-image.png")
   .attachFiles(attachment);
  channel.send(embed);
 } catch(err) {
  console.log(err);
 }
}
