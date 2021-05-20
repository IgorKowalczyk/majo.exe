const Discord = require("discord.js");
const chalk = require('chalk');
const config = require("../../config");
module.exports = (client) => {
 try {
  async function createAPIMessage(interaction, content) {
   const apiMessage = await Discord.APIMessage.create(client.channels.resolve(interaction.channel_id), content)
    .resolveData()
    .resolveFiles();
   return { ...apiMessage.data, files: apiMessage.files };
  }
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
 client.api.applications(client.user.id).commands.post({data: {
  name: 'majo',
  description: 'Something about me!'
 }})

 /* Slash command */
 client.ws.on('INTERACTION_CREATE', async interaction => {
  const command = interaction.data.name.toLowerCase();
  const args = interaction.data.options;
  if(command == "majo") {
   const embed = new Discord.MessageEmbed()
    .setTitle("Hi! I'm Majo!")
    .setDescription(".")
    .setAuthor(interaction.member.user.username);
   client.api.interactions(interaction.id, interaction.token).callback.post({
    data: {
      type: 4,
     data: await createAPIMessage(interaction, embed)
    }
   });
  }
 });
} catch(err) {
  console.log(err);
 }
}
