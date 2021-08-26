const Discord = require("discord.js");
const { readdirSync } = require("fs");
const config = require("../../config");
const prefix = process.env.PREFIX;

module.exports = {
 name: "help",
 aliases: ["h", "commands"],
 category: "General",
 description: "Displays all the commands available",
 timeout: "10000",
 usage: "help [command]",
 run: async (client, message, args) => {
  try {
   function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
   }
   if (args[0]) {
    return getCMD(client, message, args[0]);
   }
   if (!args[0]) {
    return getAll(client, message);
   }

   function getAll(client, message) {
    const commands = readdirSync("./commands/");
    const embed = new Discord.MessageEmbed() // Prettier
     .setAuthor(`${capitalize(client.user.username)} Help`, message.guild.iconURL())
     .setColor("RANDOM")
     .setTimestamp();
    let categories;
    let icon;
    categories = [...new Set(client.commands.map((cmd) => cmd.category))];
    for (const id of categories) {
     const category = client.commands.filter((cmd) => cmd.category === id);
     if (id == "General") {
      icon = client.bot_emojis.bricks;
     }
     if (id == "Moderation") {
      icon = client.bot_emojis.hammer;
     }
     if (id == "Fun") {
      icon = client.bot_emojis.rofl;
     }
     if (id == "Music") {
      icon = client.bot_emojis.music;
     }
     if (id == "Economy") {
      icon = client.bot_emojis.money;
     }
     if (id == "Utility") {
      icon = client.bot_emojis.tools;
     }
     if (id == "Image") {
      icon = client.bot_emojis.picture_frame;
     }
     if (id == "NSFW") {
      icon = client.bot_emojis.smirk; // https://www.youtube.com/watch?v=YMm2gv7TStc&t=37s ...
     }
     if (!id) {
      icon = client.bot_emojis.question;
     }
     if (id == "Owner") continue;
     embed.addField(`${icon} ${id} (${category.size})`, "> " + category.map((cmd) => `${cmd.name}`).join(", "));
    }
    // Disabled module
    embed.addField(`${client.bot_emojis.music} ~~Music~~ (12)`, "**Note:** The music module is disabled due to a large amount of bugs. We are already working on a new version\n> ~~filter, lyrics, nowplaying, pause, play, queue, resume, search, shuffle, skip, stop, volume~~")
    const owner = [...new Set(client.commands.filter((cmd) => `${cmd.category}` == "Owner").map((cmd) => cmd.name))];
    if (message.author.id == config.owner_id) {
     embed.addField(`${client.bot_emojis.owner_crown} Owner`, "**Note:** *Only the bot owner (<@" + config.owner_id + ">) can see and use the commands below!*\n> " + owner.join(", "));
    }
    embed.addField(`${client.bot_emojis.question} Command Information`, `> \`${prefix} help <command>\``);
    if (config.news && config.bot_news_title) {
     embed.addField(`${config.bot_news_title}`, `${config.news}`);
    }
    embed.setFooter(
     "Requested by " + `${message.author.username}` + " | " + `${client.commands.size}` + " Commands",
     message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    );
    return message.lineReply(embed);
   }

   function getCMD(client, message, input) {
    const embed = new Discord.MessageEmbed(); // Prettier;
    const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));
    const info = `${client.bot_emojis.error} | No information found for command \`${input.toLowerCase()}`;
    if (!cmd) {
     try {
      return message.lineReply({
       embed: {
        color: 16734039,
        description: info,
       },
      });
     } catch (err) {
      message.lineReply({
       embed: {
        color: 16734039,
        description: "<:error:860884617770303519> | No information found",
       },
      });
     }
    } else {
     alliaseslist = cmd.aliases.join(", ") || "None";
     const hembed = new Discord.MessageEmbed() // Prettier
      .setTitle(`${client.bot_emojis.question} \`${cmd.name}\` command help page`)
      .setColor("RANDOM")
      .setTimestamp()
      .setDescription("> Syntax: `<>` = required, `[]` = optional")
      .addField(`${client.bot_emojis.book} Category`, `\`${cmd.category}\``)
      .addField(`${client.bot_emojis.stopwatch} Cooldown`, `\`${cmd.timeout || "5000"}ms\``)
      .addField(`${client.bot_emojis.edit} Description`, `\`${cmd.description}\``)
      .addField(`${client.bot_emojis.screw_that} Usage`, `\`${prefix} ${cmd.usage}\``)
      .addField(`${client.bot_emojis.sign} Aliases`, `\`${alliaseslist}\``)
      .setFooter(
       `Requested by ${message.author.username}`,
       message.author.displayAvatarURL({
        dynamic: true,
        format: "png",
        size: 2048,
       })
      );
     message.lineReply(hembed);
    }
   }
  } catch (err) {
   console.log(err);
   message.lineReply({
    embed: {
     color: 16734039,
     description: `Something went wrong... ${client.bot_emojis.sadness}`,
    },
   });
  }
 },
};
