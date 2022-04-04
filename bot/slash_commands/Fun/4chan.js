const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const fetch = require("node-fetch");
const striptags = require("striptags");

module.exports = {
 name: "4chan",
 description: `🍀 Display a random photo (or video) from selected 4chan board`,
 nsfw: true,
 usage: "/4chan <board>",
 category: "Fun",
 timeout: 5000,
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
   if (!interaction.channel.nsfw) {
    const nsfwembed = new MessageEmbed() // Prettier
     .setColor("RED")
     .setDescription(`${client.bot_emojis.anger} | You can use this command only in an NSFW Channel!`)
     .setFooter({ text: "Requested by " + interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
     .setImage("https://media.discordapp.net/attachments/721019707607482409/855827123616481300/nsfw.gif");
    return interaction.followUp({ ephemeral: false, embeds: [nsfwembed] });
   }
   const all_boards = new MessageEmbed() // Prettier
    .setDescription(`All boards (${boards.length}): \`${boards.join("`, `")}\``)
    .setFooter({ text: "Requested by " + interaction.user.username, iconURL: interaction.user.displayAvatarURL() });
   if (!chanargs) {
    all_boards.setTitle(`${client.bot_emojis.anger} Please enter a vaild board!`).setColor("RED");
    return interaction.followUp({ ephemeral: false, embeds: [all_boards] });
   }
   if (chanargs == "show_all") {
    all_boards.setTitle(`${client.bot_emojis.chan} All boards`).setColor("GREEN");
    return interaction.followUp({ ephemeral: false, embeds: [all_boards] });
   }
   if (!boards.includes(chanargs)) {
    all_boards.setTitle(`${client.bot_emojis.anger} Please enter a vaild board!`).setColor("RED");
    return interaction.followUp({ ephemeral: false, embeds: [all_boards] });
   }
   const wait_embed = new MessageEmbed() // Prettier
    .setColor("5865f2")
    .setDescription(`${client.bot_emojis.loading} | I'm downloading random image from \`/${chanargs}/\`. Please wait...`);
   interaction.followUp({ embeds: [wait_embed] }).then(async () => {
    const board = chanargs;
    const page = Math.floor(Math.random() * 10 + 1);
    const response = await fetch(`https://a.4cdn.org/${board}/${page}.json`);
    const body = await response.json();
    const post_nr = Math.floor(Math.random() * body.threads.length);
    const img_id = body.threads[post_nr].posts[0].tim;
    const img_ext = body.threads[post_nr].posts[0].ext;
    const description = striptags(body.threads[post_nr].posts[0].com) ?? "**No description!**";
    const title = body.threads[post_nr].posts[0].sub ?? "Random 4chan thread";
    const replies_count = body.threads[post_nr].posts[0].replies;
    const images_count = body.threads[post_nr].posts[0].images;
    const thread_url = `https://boards.4chan.org/${board}/thread/${body.threads[post_nr].posts[0].no}`;
    const img_url = `https://i.4cdn.org/${board}/${img_id}${img_ext}`;
    const embed = new MessageEmbed() // Prettier
     .setColor("#76ff7b")
     .setTitle(`${client.bot_emojis.chan} ${title}`)
     .setDescription(`>>> ${description || "**No description!**"}`)
     // .addField(`${client.bot_emojis.edit} Thread: `, thread)
     // .addField(`${client.bot_emojis.picture_frame} Image: `, imgUrl)
     .setURL(thread_url)
     .setFooter({
      text: `${client.bot_emojis.chat} ${replies_count} replies • ${client.bot_emojis.picture_frame} ${images_count} images • Requested by ${interaction.user.username}`,
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
       .setURL(thread_url)
       .setLabel("Board")
       .setStyle("LINK")
     )
     .addComponents(
      new MessageButton() // Prettier
       .setURL(img_url)
       .setLabel("Image")
       .setStyle("LINK")
     );
    interaction.editReply({ embeds: [embed], files: [img_url], components: [row] });
   });
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
