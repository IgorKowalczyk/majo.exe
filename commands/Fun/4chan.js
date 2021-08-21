const Discord = require("discord.js");
const https = require("https");
const prefix = process.env.PREFIX;

module.exports = {
 name: "4chan",
 aliases: [],
 description: "Shows a random image from the selected 4chan board",
 category: "Fun",
 timeout: "1000",
 usage: "4chan <board/boards>",
 run: async (client, message, args) => {
  try {
   if (!message.channel.nsfw) {
    const nsfwembed = new Discord.MessageEmbed()
     .setColor("#FF5757")
     .setDescription(`${client.bot_emojis.anger} | You can use this command only in an NSFW Channel!`)
     .setFooter("Requested by " + message.author.username, message.author.displayAvatarURL())
     .setImage("https://media.discordapp.net/attachments/721019707607482409/855827123616481300/nsfw.gif");
    return message.lineReply(nsfwembed);
   }
   let chanargs = args.slice(0).join(" ");
   if (!chanargs) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.anger} | Please enter a board! To see all boards check \`${prefix} 4chan boards\``,
     },
    });
   }
   if (chanargs === "boards") {
    let vboards = new Discord.MessageEmbed() // Prettier
     .setColor("RANDOM")
     .setTitle("All boards:")
     .setTimestamp()
     .setDescription("`a`, `b`, `c`, `d`, `e`, `f`, `g`, `gif`, `h`, `hr`, `k`, `m`, `o`, `p`, `r`, `s`, `t`, `u`, `v`, `vg`, `vr`, `w`, `wg`, `i`, `ic`, `r9k`, `s4s`, `vip`, `qa`, `cm`, `hm`, `lgbt`, `y`, `3`, `aco`, `adv`, `an`, `asp`, `bant`, `biz`, `cgl`, `ck`, `co`, `diy`, `fa`, `fit`, `gd`, `hc`, `his`, `int`, `jp`, `lit`, `mlp`, `mu`, `n`, `news`, `out`, `po`, `pol`, `qst`, `sci`, `soc`, `sp`, `tg`, `toy`, `trv`, `tv`, `vp`, `wsg`, `wsr`");
    return message.lineReply(vboards);
   }
   const boards = ["a", "b", "c", "d", "e", "f", "g", "gif", "h", "hr", "k", "m", "o", "p", "r", "s", "t", "u", "v", "vg", "vr", "w", "wg", "i", "ic", "r9k", "s4s", "vip", "qa", "cm", "hm", "lgbt", "y", "3", "aco", "adv", "an", "asp", "bant", "biz", "cgl", "ck", "co", "diy", "fa", "fit", "gd", "hc", "his", "int", "jp", "lit", "mlp", "mu", "n", "news", "out", "po", "pol", "qst", "sci", "soc", "sp", "tg", "toy", "trv", "tv", "vp", "wsg", "wsr"];
   var board = chanargs;
   if (boards.indexOf(board) == -1) {
    let vb = new Discord.MessageEmbed() // Prettier
     .setColor(16734039)
     .setDescription(`${client.bot_emojis.anger} | Please enter a vaild board! To see all boards check \`${prefix} 4chan boards\``);
    return message.lineReply(vb);
   }
   var board = args;
   var page = Math.floor(Math.random() * 10 + 1);
   var url = "https://a.4cdn.org/" + board + "/" + page + ".json";
   https.get(url, (res) => {
    res.setEncoding("utf8");
    let body = "";
    res.on("data", (data) => {
     body += data;
    });
    res.on("end", (end) => {
     body = JSON.parse(body);
     var postNr = Math.floor(Math.random() * body.threads.length);
     var imgId = body.threads[postNr].posts[0].tim;
     var imgExt = body.threads[postNr].posts[0].ext;
     var com = body.threads[postNr].posts[0].com;
     var sub = body.threads[postNr].posts[0].sub;
     var replies = body.threads[postNr].posts[0].replies;
     var images = body.threads[postNr].posts[0].images;
     if (!sub) {
      sub = "Random 4chan thread";
     }
     if (com == null) {
      com = "**No description!**";
     } else {
      /* (/A/g, "B") = replace all A's with B's */
      com = com.replace(/<br>/g, "\n");
      com = com.replace(/<span class=\"quote\">&gt;/g, ">");
      com = com.replace(/<span class=\"deadlink\">&gt;/g, ">");
      com = com.replace(/<\/span>/g, "");
      com = com.replace(/&quot/g, '"');
      com = com.replace(/&#039;/g, "'");
     }
     var thread = "https://boards.4chan.org/" + board + "/thread/";
     thread += body.threads[postNr].posts[0].no;
     var imgUrl = "https://i.4cdn.org/" + board + "/";
     imgUrl += imgId + "" + imgExt;
     let embed = new Discord.MessageEmbed() // Prettier
      .setColor("RANDOM")
      .setTitle(
       `${client.bot_emojis.chan} ` + sub,
       message.guild.iconURL({
        dynamic: true,
        format: "png",
       }),
       thread
      )
      .setDescription(com)
      .addField(`${client.bot_emojis.edit} Thread: `, thread)
      .addField(`${client.bot_emojis.picture_frame} Image: `, imgUrl)
      .setURL(thread)
      .setTimestamp()
      .setFooter(
       `${client.bot_emojis.chat} ${replies} replies | ${client.bot_emojis.picture_frame} ${images} images | Requested by ${message.author.username} • Image from 4chan boards`,
       message.author.displayAvatarURL({
        dynamic: true,
        format: "png",
        size: 2048,
       })
      );
     if (embed.description.length >= 2048) {
      embed.description = `${embed.description.substr(0, 2045)}...`;
     }
     message.lineReply({ embed: embed, files: [imgUrl] });
    });
   });
  } catch (err) {
   message.lineReply({
    embed: {
     color: 16734039,
     description: `Something went wrong... ${client.bot_emojis.sadness}`,
    },
   });
  }
 },
};
