const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const https = require("https");
const striptags = require("striptags");

module.exports = {
 name: "4chan",
 description: "Shows a random image from the selected 4chan board",
 options: [
  {
   name: "board",
   description: "4chan board name",
   required: true,
   type: 3,
   /*choices: [
    {
     name: "Show all Boards",
     value: "show_all",
    },
    {
     name: "Anime & Manga",
     value: "a",
    },
    {
     name: "Anime/Cute",
     value: "c",
    },
    {
     name: "Anime/Wallpapers",
     value: "w",
    },
    {
     name: "Mecha",
     value: "m",
    },
    {
     name: "Cosplay & EGL",
     value: "cgl",
    },
    {
     name: "Cute/Male",
     value: "cm",
    },
    {
     name: "Flash",
     value: "f",
    },
    {
     name: "Transportation",
     value: "n",
    },
    {
     name: "Otaku Culture",
     value: "jp",
    },
    {
     name: "Virtual YouTubers",
     value: "vt",
    },
    {
     name: "Video Games",
     value: "v",
    },
   ],*/
  },
 ],
 run: async (client, interaction, args) => {
  const chanargs = args.slice(0).join(" ");
  try {
   const boards = ["a", "c", "w", "m", "cgl", "cm", "f", "n", "jp", "vt", "v", "vg", "vm", "vmg", "vp", "vr", "vrpg", "vst", "co", "g", "tv", "k", "o", "an", "tg", "sp", "xs", "pw", "sci", "his", "int", "out", "toy", "i", "po", "p", "ck", "ic", "wg", "lit", "mu", "fa", "3", "gd", "diy", "wsg", "qst", "biz", "trv", "fit", "x", "adv", "lgbt", "mlp", "news", "wsr", "vip", "b", "r9k", "pol", "bant", "soc", "s4s", "s", "hc", "hm", "h", "e", "u", "d", "y", "t", "hr", "gif", "aco", "r"];
   if(!interaction.channel.nsfw) {
    const nsfwembed = new MessageEmbed() // Prettier
    .setColor("RED")
    .setDescription(`${client.bot_emojis.anger} | You can use this command only in an NSFW Channel!`)
    .setFooter({ text: "Requested by " + interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
    .setImage("https://media.discordapp.net/attachments/721019707607482409/855827123616481300/nsfw.gif");
    return interaction.followUp({ ephemeral: false, embeds: [nsfwembed]});
   }
   const all_boards = new MessageEmbed() // Prettier
   .setDescription(`All boards (${boards.length}): \`${boards.join("`, `")}\``)
   .setFooter({ text: "Requested by " + interaction.user.username, iconURL: interaction.user.displayAvatarURL() });
   if (!chanargs) {
    all_boards.setTitle(`${client.bot_emojis.anger} Please enter a vaild board!`).setColor("RED")
    return interaction.followUp({ ephemeral: false, embeds: [all_boards]});
   }
   if(chanargs == "show_all") {
    all_boards.setTitle(`${client.bot_emojis.chan} All boards`).setColor("GREEN")
    return interaction.followUp({ ephemeral: false, embeds: [all_boards]});
   }
   if (!boards.includes(chanargs)) {
    all_boards.setTitle(`${client.bot_emojis.anger} Please enter a vaild board!`).setColor("RED")
    return interaction.followUp({ ephemeral: false, embeds: [all_boards]});
   }
   const wait_embed = new MessageEmbed() // Prettier
   .setColor("5865f2")
   .setDescription(`${client.bot_emojis.loading} | I'm downloading random image from \`/${chanargs}/\`. Please wait...`);
   interaction.followUp({ embeds: [wait_embed] }).then(() => {
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
       interaction.guild.iconURL({
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
      .setFooter({
       text: `${client.bot_emojis.chat} ${replies} replies | ${client.bot_emojis.picture_frame} ${images} images | Requested by ${interaction.user.username}`,
       iconURL: interaction.user.displayAvatarURL({
        dynamic: true,
        format: "png",
        size: 2048,
       }),
      });
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
      interaction.editReply({ embeds: [embed], files: [imgUrl], components: [row] });
    });
   });
  });
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};

