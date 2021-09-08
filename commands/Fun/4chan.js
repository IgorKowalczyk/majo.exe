const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const https = require("https");
const striptags = require("striptags");

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
    const nsfwembed = new MessageEmbed() // Prettier
     .setColor("RED")
     .setDescription(`${client.bot_emojis.anger} | You can use this command only in an NSFW Channel!`)
     .setFooter("Requested by " + message.author.username, message.author.displayAvatarURL())
     .setImage("https://media.discordapp.net/attachments/721019707607482409/855827123616481300/nsfw.gif");
    return message.reply({ embeds: [nsfwembed] });
   }
   const chanargs = args.slice(0).join(" ");
   const boards = ["3", "a", "aco", "adv", "an", "b", "bant", "biz", "c", "cgl", "ck", "cm", "co", "d", "diy", "e", "f", "fa", "fit", "g", "gd", "gif", "h", "hc", "his", "hm", "hr", "i", "ic", "int", "jp", "k", "lgbt", "lit", "m", "mlp", "mu", "n", "news", "o", "out", "p", "po", "pol", "pw", "qa", "qst", "r", "r9k", "s", "s4s", "sci", "soc", "sp", "t", "tg", "toy", "trash", "trv", "tv", "u", "v", "vg", "vip", "vm", "vmg", "vp", "vr", "vrpg", "vst", "vt", "w", "wg", "wsg", "wsr", "x", "xs", "y"];
   const board_error = new MessageEmbed() // Prettier
    .setTitle(`${client.bot_emojis.anger} Please enter a vaild board!`)
    .setColor("RED")
    .setDescription(`\`${boards.join("`, `")}\``);
   if (!chanargs) {
    return message.reply({ embeds: [board_error] });
   }
   if (boards.indexOf(chanargs) == -1) {
    return message.reply({ embeds: [board_error] });
   }
   var board = chanargs;
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
      com = striptags(com);
     }
     var thread = "https://boards.4chan.org/" + board + "/thread/";
     thread += body.threads[postNr].posts[0].no;
     var imgUrl = "https://i.4cdn.org/" + board + "/";
     imgUrl += imgId + "" + imgExt;
     let embed = new MessageEmbed() // Prettier
      .setColor("RANDOM")
      .setTitle(
       `${client.bot_emojis.chan} ` + sub,
       message.guild.iconURL({
        dynamic: true,
        format: "png",
       }),
       thread
      )
      .setDescription(`>>> ${com}`)
      // .addField(`${client.bot_emojis.edit} Thread: `, thread)
      // .addField(`${client.bot_emojis.picture_frame} Image: `, imgUrl)
      .setURL(thread)
      .setTimestamp()
      .setFooter(
       `${client.bot_emojis.chat} ${replies} replies | ${client.bot_emojis.picture_frame} ${images} images | Requested by ${message.author.username}`,
       message.author.displayAvatarURL({
        dynamic: true,
        format: "png",
        size: 2048,
       })
      );
     if (embed.description.length >= 2048) {
      embed.description = `${embed.description.substr(0, 2045)}...`;
     }
     const row = new MessageActionRow() // Prettier
      .addComponents(
       new MessageButton() // Prettier
        .setURL(thread)
        .setLabel("Board")
        .setStyle("LINK")
      )
      .addComponents(
       new MessageButton() // Prettier
        .setURL(imgUrl)
        .setLabel("Image")
        .setStyle("LINK")
      );
     message.reply({ embeds: [embed], files: [imgUrl], components: [row] });
    });
   });
  } catch (err) {
   console.log(err);
   message.reply({ embeds: [client.command_error_embed] });
  }
 },
};
