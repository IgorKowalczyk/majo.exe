const Discord = module.require("discord.js");
const https = require('https');

module.exports.run = async (client, message, args) => {

    if(!message.channel.nsfw){
      message.channel.send({embed: {
            color: 16734039,
            description: "This command can only be used in NSFW channels!"
        }})
      return;
    }

let chanargs = args.slice(0).join(' ');

  if (!chanargs) return message.channel.send({embed: {
            color: 16734039,
            description: "Please enter a board!"
        }})
		
  if(chanargs === "boards"){
          let vb = new Discord.RichEmbed()
          .setColor(16734039)
          .setTitle("All boards:")
          .setTimestamp()
          .setDescription('`a`, `b`, `c`, `d`, `e`, `f`, `g`, `gif`, `h`, `hr`, `k`, `m`, `o`, `p`, `r`, `s`, `t`, `u`, `v`, `vg`, `vr`, `w`, `wg`, `i`, `ic`, `r9k`, `s4s`, `vip`, `qa`, `cm`, `hm`, `lgbt`, `y`, `3`, `aco`, `adv`, `an`, `asp`, `bant`, `biz`, `cgl`, `ck`, `co`, `diy`, `fa`, `fit`, `gd`, `hc`, `his`, `int`, `jp`, `lit`, `mlp`, `mu`, `n`, `news`, `out`, `po`, `pol`, `qst`, `sci`, `soc`, `sp`, `tg`, `toy`, `trv`, `tv`, `vp`, `wsg`, `wsr`')
        message.channel.send(vb);
            return;
        }
    const boards = [
        "a", "b", "c", "d", "e", "f", "g", "gif", "h", "hr", "k", "m", "o", "p", "r", "s", "t", "u", "v", "vg", "vr", "w", "wg", "i", "ic", "r9k", "s4s", "vip", "qa", "cm", "hm", "lgbt", "y", "3", "aco", "adv", "an", "asp", "bant", "biz", "cgl", "ck", "co", "diy", "fa", "fit", "gd", "hc", "his", "int", "jp", "lit", "mlp", "mu", "n", "news", "out", "po", "pol", "qst", "sci", "soc", "sp", "tg", "toy", "trv", "tv", "vp", "wsg", "wsr"
    ];

     var board = chanargs; // first argument
    if(boards.indexOf(board) == -1){
      let vb = new Discord.RichEmbed()
          .setColor(16734039)
          .setDescription("Please enter a vaild board!")
          .setTimestamp()
        message.channel.send(vb);
      return;
    }

    var board = args; // first argument

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

            // format text
            if(com == null){
                com = "";
            }else{
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
          let chan = new Discord.RichEmbed()
          .setColor("RANDOM")
          .setAuthor(thread, message.guild.iconURL, thread)
          .setDescription("Description: " + com)
          .addField("Thread:", thread)
          .addField("Img:", imgUrl)
          .setURL(thread)
          .setTimestamp()
          .setFooter("Img from: " + thread)
        
        message.channel.send(chan);
        message.channel.send({file: imgUrl})
            });
        });
};

module.exports.help = {
    name: "4chan",
    description: "Shows a random image (and text) from the specified board from 4chan",
    usage: "4chan <board>",
    type: "Fun",
}
