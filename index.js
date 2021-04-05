const Discord = require("discord.js");
const client = new Discord.Client({disableMentions: "everyone"});
// inutilizavel sem a dashboard
/*const fs = require("fs");
const http = require("http");
const db = require("quick.db");
const Enmap = require("enmap");                //load the enmap library
const { dirname } = require("path");*/ 
const chalk = require("chalk");
const config = require("./config.js");

const Canvas = require('canvas');
const Snowflake = require("snowflake-api");

client.db = require("quick.db");
client.commands = new Discord.Collection();
client.cooldown = new Discord.Collection();

const api = new Snowflake.Client(config.API_TOKEN);
client.snowapi = api;


// Modulo de Boas-vindas
client.on("guildMemberAdd", async member => {
  //If not in a guild return
  if(!member.guild) return;
  //create a new Canvas
  const canvas = Canvas.createCanvas(1772, 633);
  //make it "2D"
  const ctx = canvas.getContext('2d');
  //set the Background to the welcome.png
  const background = await Canvas.loadImage(`./lib/img/welcome.png`);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#f2f2f2';
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
  //set the first text string 
  var textString3 = `${member.user.username}`;
  //if the text is too big then smaller the text
  if (textString3.length >= 14) {
    ctx.font = 'bold 100px Genta';
    ctx.fillStyle = '#f2f2f2';
    ctx.fillText(textString3, 720, canvas.height / 2 + 20);
  }
  //else dont do it
  else {
    ctx.font = 'bold 150px Genta';
    ctx.fillStyle = '#f2f2f2';
    ctx.fillText(textString3, 720, canvas.height / 2 + 20);
  }
  //define the Discriminator Tag
  var textString2 = `#${member.user.discriminator}`;
  ctx.font = 'bold 40px Genta';
  ctx.fillStyle = '#f2f2f2';
  ctx.fillText(textString2, 730, canvas.height / 2 + 58);
  //define the Member count
  var textString4 = `Member #${member.guild.memberCount}`;
  ctx.font = 'bold 60px Genta';
  ctx.fillStyle = '#f2f2f2';
  ctx.fillText(textString4, 750, canvas.height / 2 + 125);
  //get the Guild Name
  var textString4 = `${member.guild.name}`;
  ctx.font = 'bold 60px Genta';
  ctx.fillStyle = '#f2f2f2';
  ctx.fillText(textString4, 700, canvas.height / 2 - 150);
  //create a circular "mask"
  ctx.beginPath();
  ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true);//position of img
  ctx.closePath();
  ctx.clip();
  //define the user avatar
  const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
  //draw the avatar
  ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500);
  //get it as a discord attachment
  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
  //define the welcome embed
  const welcomeembed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTimestamp()
    .setFooter("Bem-vinde", member.guild.iconURL({ dynamic: true }))
    .setDescription(`**Bem-vinde ao ${member.guild.name}!**
 Oi <@${member.id}>!, Leia e aceite as ${config.CHANNEL_RULES}!`)
    .setImage("attachment://welcome-image.png")
    .attachFiles(attachment);
  //define the welcome channel
  const channel = member.guild.channels.cache.find(ch => ch.id === config.CHANNEL_WELCOME);
  //send the welcome embed to there
  channel.send(welcomeembed);
  //member roles add on welcome every single role
  let roles = config.ROLES_WELCOME;
  for(let i = 0; i < roles.length; i++ )
  member.roles.add(roles[i]);
})



// Eventos
client.on("error", console.error);

client.on("warn", console.warn);

// Modulo de XP (level)
client.on("message", async (message) => {
    if (!message.guild || message.author.bot) return;
    // Handle XP
    xp(message);
});

function xp(message) {
    if (!client.cooldown.has(`${message.author.id}`) || !(Date.now() - client.cooldown.get(`${message.author.id}`) > config.cooldown)) {
        let xp = client.db.add(`xp_${message.author.id}`, 1);
        let level = Math.floor(0.3 * Math.sqrt(xp));
        let lvl = client.db.get(`level_${message.author.id}`) || client.db.set(`level_${message.author.id}`,1);;
        if (level > lvl) {
            let newLevel = client.db.set(`level_${message.author.id}`,level);
            message.channel.send(`:tada: ${message.author.toString()}, Você acabou de avançar para o nível ${newLevel}!`);
        }
        client.cooldown.set(`${message.author.id}`, Date.now());
    }
}




const token = config.token;

/* Login e comandos */
if (token) {
 client.commands = new Discord.Collection();
 client.aliases = new Discord.Collection();
 client.queue = new Map(); 
 ['command', 'event'].forEach(handler => {
  require(`./handlers/${handler}`)(client);
 });
 client.login(token)
} else {
 console.log(chalk.red.bold("Error:") + chalk.red(" Bot token is not provided! To give your bot life, you need to enter token value in the ") + chalk.grey.italic.bold(".env") +  chalk.red(" file - ") + chalk.grey.italic.bold("TOKEN=Your_Token ") + chalk.red.underline.bold("REMEMBER: Token is super-secret - do not share it with anyone!"));
}
/* /Login e comandos */
process.on("unhandledRejection", (err) => {
 console.error(err);
});

//-------------------//
// Fim (do index.js) //
//-------------------//
