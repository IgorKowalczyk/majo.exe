const config = require("../../config.js");
const canvacord = require("canvacord");
const Discord = require("discord.js");

module.exports = {
    name: "rank",
    aliases: ["ranking", "level"],
    category: "Utility",
    description: "ranking of the user",
    usage: "rank <user>",
run: async (client, message, args) => {


  //log that the module is loaded
  console.log(` :: ⬜️ Module: ${description.name} | Loaded version ${description.version} from ("${description.filename}")`)
  //voice state update event to check joining/leaving channels
  leveling.run("message", async (message) => {

    if (message.author.bot) return;
    if (!message.guild) return;
    if (message.channel.type === `dm`) return;
    //////////////////////////////////////////
    /////////////RANKING SYSTEM///////////////
    //////////////////////////////////////////
    //get the key of the user for this guild
    const key = `${message.guild.id}-${message.author.id}`;
    // do some databasing
    client.points.ensure(`${message.guild.id}-${message.author.id}`, {
      user: message.author.id,
      guild: message.guild.id,
      points: 0,
      level: 1
    });
    //create message length basically math for not too much xp for too long messages
    var msgl = message.content.length / (Math.floor(Math.random() * (message.content.length - message.content.length / 100 + 1) + 10));
    //if too short the message
    if (msgl < 10) {
      //get a random num between 0 and 2 rounded
      var randomnum = Math.floor((Math.random() * 2) * 100) / 100
      //basically databasing again
      client.points.math(key, `+`, randomnum, `points`)
      client.points.inc(key, `points`);
    }
    //if not too short do this
    else {
      //get a random num between rounded but it belongs to message length
      var randomnum = 1 + Math.floor(msgl * 100) / 100
      //basically databasing again
      client.points.math(key, `+`, randomnum, `points`)
      client.points.inc(key, `points`);
    }
    //get current level
    const curLevel = Math.floor(0.1 * Math.sqrt(client.points.get(key, `points`)));
    //if its a new level then do this
    if (client.points.get(key, `level`) < curLevel) {
      //define ranked embed
      const embed = new Discord.MessageEmbed()
        .setTitle(`Ranking of:  ${message.author.username}`)
        .setTimestamp()
        .setDescription(`You've leveled up to Level: **\`${curLevel}\`**! (Points: \`${Math.floor(client.points.get(key, `points`) * 100) / 100}\`) `)
        .setColor("GREEN");
      //send ping and embed message
      message.channel.send(`<@` + message.author.id + `>`);
      message.channel.send(embed);
      //set the new level
      client.points.set(key, curLevel, `level`);
    }
    //else continue or commands...
    //
    if (message.content.toLowerCase().startsWith(`${config.PREFIX}rank`)) {
      //get the rankuser
      let rankuser = message.mentions.users.first() || message.author;
      client.points.ensure(`${message.guild.id}-${rankuser.id}`, {
        user: message.author.id,
        guild: message.guild.id,
        points: 0,
        level: 1
      });
      //do some databasing
      const filtered = client.points.filter(p => p.guild === message.guild.id).array();
      const sorted = filtered.sort((a, b) => b.points - a.points);
      const top10 = sorted.splice(0, message.guild.memberCount);
      let i = 0;
      //count server rank sometimes an error comes
      for (const data of top10) {
        await delay(15);
        try {
          i++;
          if (client.users.cache.get(data.user).tag === rankuser.tag) break;
        } catch {
          i = `Error counting Rank`;
          break;
        }
      }
      const key = `${message.guild.id}-${rankuser.id}`;
      //math
      let curpoints = Number(client.points.get(key, `points`).toFixed(2));
      //math
      let curnextlevel = Number(((Number(1) + Number(client.points.get(key, `level`).toFixed(2))) * Number(10)) * ((Number(1) + Number(client.points.get(key, `level`).toFixed(2))) * Number(10)));
      //if not level == no rank
      if (client.points.get(key, `level`) === undefined) i = `No Rank`;
      //define a temporary embed so its not coming delayed
      let tempmsg = await message.channel.send(new Discord.MessageEmbed().setColor("RED").setAuthor("Calculating...", "https://cdn.discordapp.com/emojis/769935094285860894.gif"))
      //global local color var.
      let color;
      //define status of the rankuser
      let status = rankuser.presence.status;
      //do some coloring for user status cause cool
      if (status === "dnd") { color = "#ff0048"; }
      else if (status === "online") { color = "#00fa81"; }
      else if (status === "idle") { color = "#ffbe00"; }
      else { status = "streaming"; color = "#a85fc5"; }
      //define the ranking card
      const rank = new canvacord.Rank()
        .setAvatar(rankuser.displayAvatarURL({ dynamic: false, format: 'png' }))
        .setCurrentXP(Number(curpoints.toFixed(2)), color)
        .setRequiredXP(Number(curnextlevel.toFixed(2)), color)
        .setStatus(status, false, 7)
        .renderEmojis(true)
        .setProgressBar(color, "COLOR")
        .setRankColor(color, "COLOR")
        .setLevelColor(color, "COLOR")
        .setUsername(rankuser.username, color)
        .setRank(Number(i), "Rank", true)
        .setLevel(Number(client.points.get(key, `level`)), "Level", true)
        .setDiscriminator(rankuser.discriminator, color);
      rank.build()
        .then(async data => {
          //add rankcard to attachment
          const attachment = new Discord.MessageAttachment(data, "RankCard.png");
          //define embed
          const embed = new Discord.MessageEmbed()
            .setTitle(`Ranking of:  ${rankuser.username}`)
            .setColor(color)
            .setImage("attachment://RankCard.png")
            .attachFiles(attachment)
          //send that embed
          await message.channel.send(embed);
          //delete that temp message
          await tempmsg.delete();
          return;
        });
    }
    //leaderboard command
    if (message.content.toLowerCase() === `${config.PREFIX}leaderboard`) {
      //some databasing and math
      const filtered = client.points.filter(p => p.guild === message.guild.id).array();
      const sorted = filtered.sort((a, b) => b.points - a.points);
      const top10 = sorted.splice(0, 10);
      const embed = new Discord.MessageEmbed()
        .setTitle(`${message.guild.name}: Leaderboard`)
        .setTimestamp()
        .setDescription(`Top 10 Ranking:`)
        .setColor("ORANGE");
      //set counter to 0
      let i = 0;
      //get rank 
      for (const data of top10) {
        await delay(15); try {
          i++;
          embed.addField(`**${i}**. ${client.users.cache.get(data.user).tag}`, `Points: \`${Math.floor(data.points * 100) / 100}\` | Level: \`${data.level}\``);
        } catch {
          i++; //if usernot found just do this
          embed.addField(`**${i}**. ${client.users.cache.get(data.user)}`, `Points: \`${Math.floor(data.points * 100) / 100}\` | Level: \`${data.level}\``);
        }
      }
      //schick das embed
      return message.channel.send(embed);
    }

  })
  function delay(delayInms) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(2);
      }, delayInms);
    });
  }
 }
}
//Coded by Tomato#6966!