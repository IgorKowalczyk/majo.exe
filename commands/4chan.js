const Discord = module.require("discord.js");
const https = require('https');
const config = require("../config");
const prefix = config.prefix;

module.exports = {
 name: "4chan",
 aliases: [],
 description: "Shows a random image (and text) from the random board from 4chan",
 category: "Fun",
 usage: "4chan <board/boards>",
 run: async (client, message, args) => {
  try {
   if (!message.channel.nsfw) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "This command can only be used in NSFW channels!"
    }})
   }
   let chanargs = args.slice(0).join(' ');
   if (!chanargs) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "Please enter a board! To see all boards check \`" + `${prefix}` + " 4chan boards\`"
    }})
   }
   if (chanargs === "boards") {
    let vboards = new Discord.MessageEmbed()
     .setColor("RANDOM")
     .setTitle("All boards:")
     .setTimestamp()
     .setDescription('`a`, `b`, `c`, `d`, `e`, `f`, `g`, `gif`, `h`, `hr`, `k`, `m`, `o`, `p`, `r`, `s`, `t`, `u`, `v`, `vg`, `vr`, `w`, `wg`, `i`, `ic`, `r9k`, `s4s`, `vip`, `qa`, `cm`, `hm`, `lgbt`, `y`, `3`, `aco`, `adv`, `an`, `asp`, `bant`, `biz`, `cgl`, `ck`, `co`, `diy`, `fa`, `fit`, `gd`, `hc`, `his`, `int`, `jp`, `lit`, `mlp`, `mu`, `n`, `news`, `out`, `po`, `pol`, `qst`, `sci`, `soc`, `sp`, `tg`, `toy`, `trv`, `tv`, `vp`, `wsg`, `wsr`')
    return message.channel.send(vboards);
   }
   const boards = ["a", "b", "c", "d", "e", "f", "g", "gif", "h", "hr", "k", "m", "o", "p", "r", "s", "t", "u", "v", "vg", "vr", "w", "wg", "i", "ic", "r9k", "s4s", "vip", "qa", "cm", "hm", "lgbt", "y", "3", "aco", "adv", "an", "asp", "bant", "biz", "cgl", "ck", "co", "diy", "fa", "fit", "gd", "hc", "his", "int", "jp", "lit", "mlp", "mu", "n", "news", "out", "po", "pol", "qst", "sci", "soc", "sp", "tg", "toy", "trv", "tv", "vp", "wsg", "wsr"];
   var board = chanargs;
   if(boards.indexOf(board) == -1) {
    let vb = new Discord.MessageEmbed()
     .setColor(16734039)
     .setDescription("Please enter a vaild board! To see all boards check \`" + `${prefix}` + " 4chan boards\`")
    return message.channel.send(vb);
   }
   var board = args;
   var page = Math.floor((Math.random() * 10) + 1);  // page 1 to 10
   var url = "https://a.4cdn.org/" + board + "/" + page + ".json"
   https.get(url, res => {
    res.setEncoding('utf8');
    let body = "";
    res.on("data", data => {
     body += data;
     });
    res.on("end", end => {
     body = JSON.parse(body);
     var postNr = Math.floor(Math.random() * body.threads.length);
     var imgId = body.threads[postNr].posts[0].tim;
     var imgExt = body.threads[postNr].posts[0].ext;
     var com = body.threads[postNr].posts[0].com;
     var sub = body.threads[postNr].posts[0].sub;
     if(!sub) {
      sub = "Random 4chan thread";
     }
     if(com == null) {
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
     var thread = "https://boards.4chan.org/"+ board +"/thread/";
     thread += body.threads[postNr].posts[0].no;
     var imgUrl = "https://i.4cdn.org/" + board + "/";
     imgUrl += imgId + "" + imgExt;
     let chan = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle("🍀 " + sub, message.guild.iconURL({ dynamic: true, format: 'png'}), thread)
      .addField("Description:", com)
      .addField("Thread:", thread)
      .addField("Img:", imgUrl)
      .setURL(thread)
      .setTimestamp()
      .setFooter("Requested by " + `${message.author.username}` + " • Img from 4chan boards", message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
     message.channel.send(chan);
     message.channel.send({
      files: [imgUrl]
    });
   });
  });
  } catch (err) {
   message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
