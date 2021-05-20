const Discord = require("discord.js");
const chalk = require('chalk');
const config = require("../../config");
module.exports = (client) => {
 try {
  setInterval(() => {
   const emojis = ["😆", "😄", "😎", "😂", "🥳", "😘", "😜", "🤑", "😁", "😉", "🥰", "😍", "🤯", "🥶", "🤩", "😇", "😊", "☺️", "😌", "😋"];
   const emoji = emojis[Math.floor(Math.random()*emojis.length)];
   var date = new Date().toJSON().slice(0, 10).replace(/-/g, "/");
   const discordbday = new Date().getFullYear() + "/05/13";
   const statuslist = [];
   /* if (date == discordbday) {
    statuslist.push(
     `🎉 ${client.guilds.cache.size} servers 🎉 #DISCORD-PLS-NOT-CHANGE-DESIGN`,
     `🎉 ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} members 🎉 #DISCORD-PLS-NOT-CHANGE-DESIGN`,
     `🎉 ${config.prefix} help 🎉 #DISCORD-PLS-NOT-CHANGE-DESIGN`,	
     `🎉 Discord please back to old style, please not change the design... 🎉`,
    );	
   } else {	
    statuslist.push(	
     `${emoji} | ${client.guilds.cache.size} servers #DISCORD-PLS-NOT-CHANGE-DESIGN`,
     `${emoji} | ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} members #DISCORD-PLS-NOT-CHANGE-DESIGN`,
     `${emoji} | ${config.prefix} help`,
     `${emoji} | Waiting for verification! (${client.guilds.cache.size} guilds 🥰) #DISCORD-PLS-NOT-CHANGE-DESIGN`,
    );	
   }	
   const random = Math.floor(Math.random() * (statuslist.length - 1) + 1);
   client.user.setActivity(statuslist[random], { type: 'LISTENING' });
   */
  client.user.setActivity("😭 Discord please back to old style, please not change the design 😭", { type: 'LISTENING' });
  }, 10000);
  client.user.setStatus("online");
  const datelog = new Date();
   currentDate = datelog.getDate();
   month = datelog.getMonth() + 1;
   year = datelog.getFullYear();
   hour = datelog.getHours();
   min  = datelog.getMinutes();
   sec  = datelog.getSeconds();
  console.log("Generated at: " + currentDate + "/" + month + "/" + year + " | " + hour + ":" + min + "." + sec);
  console.log(chalk.blue("Connected! Logged in as ") + chalk.blue.underline(`${client.user.username}`) + chalk.blue("!")); // ${client.user.tag}
  const statuschannel = client.channels.cache.get(config.statuschannel)
  if (statuschannel) {
   statuschannel.send({embed: {
    color: 4779354,
    description: ":green_circle: | Bot Status - Online",
   }})
  } else {
   return;
  }
 /* Slash command */
 client.ws.on('INTERACTION_CREATE', async interaction => {
  const command = interaction.data.name.toLowerCase();
  const args = interaction.data.options;
  if(command == "majo") {
   const embed = new Discord.MessageEmbed()
    .setDescription(`Hello, ${client.user.username} unfortunately do not support slash commands. And we do not currently plan to add them either. We apologize ;-;`)
    .setTitle(`<a:sucess:759354039242063903> Hi ${interaction.member.user.username}! I'm ${client.user.username}`, interaction.guild.iconURL({ dynamic: true, format: 'png', size: 2048 })
    .setColor("RANDOM")
    .addField("Join support server", config.server)
    .addField("Invite me", `**[Click this link to invite me!](https://discord.com/oauth2/authorize/?permissions=${config.premissions}&scope=${config.scopes}&client_id=${client.user.id})** **__[Recomended!]__**\nOr [click this link to invite me *as root*](https://discord.com/oauth2/authorize/?permissions=8&scope=${config.scopes}&client_id=${client.user.id}) [Not recomended!]`)
    .setFooter("Requested by: ", interaction.member.user.username, interaction.member.user.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 })))
   client.api.interactions(interaction.id, interaction.token).callback.post({
    data: {
     type: 4,
     data: await createAPIMessage(interaction, embed)
    }
   });
  }
 });
 async function createAPIMessage(interaction, content) {
  const apiMessage = await Discord.APIMessage.create(client.channels.resolve(interaction.channel_id), content)
   .resolveData()
   .resolveFiles();
  return { ...apiMessage.data, files: apiMessage.files };
 }
 /* --- */
} catch(err) {
  console.log(err);
 }
}
