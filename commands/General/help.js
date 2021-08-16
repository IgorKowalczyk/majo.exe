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
   if (args[0]) {
    return getCMD(client, message, args[0]);
   }
   if (!args[0]) {
    return getAll(client, message);
   }
   function getAll(client, message) {
    const commands = readdirSync("./commands/");
    const embed = new Discord.MessageEmbed() // Prettier
     .setAuthor("Help", message.guild.iconURL())
     .setColor("RANDOM")
     .setTimestamp();
    let categories;
    let icon;
    categories = [...new Set(client.commands.map((cmd) => cmd.category))];
    for (const id of categories) {
     const category = client.commands.filter((cmd) => cmd.category === id);
     if (id == "General") {
      icon = ":bricks:";
     }
     if (id == "Moderation") {
      icon = ":hammer:";
     }
     if (id == "Fun") {
      icon = ":rofl:";
     }
     if (id == "Music") {
      icon = ":notes:";
     }
     if (id == "Economy") {
      icon = ":moneybag:";
     }
     if (id == "Utility") {
      icon = ":toolbox:";
     }
     if (id == "Image") {
      icon = ":frame_photo:";
     }
     if (id == "NSFW") {
      icon = ":smirk:";
     }
     if (!id) {
      icon = ":grey_question:";
     }
     if (id == "Owner") continue;
     embed.addField(`${icon} ${id} (${category.size})`, "> " + category.map((cmd) => `${cmd.name}`).join(", "));
    }
    const owner = [...new Set(client.commands.filter((cmd) => `${cmd.category}` == "Owner").map((cmd) => cmd.name))];
    if (message.author.id == config.owner_id) {
     embed.addField(`<:owner:856161806199947285> Owner`, "> <:info:876827701963550750> **Note:** *Only the bot owner (<@" + config.owner_id + ">) can use the commands below!*\n> " + owner.join(", "));
    }
    embed.addField(":grey_question: Command Information", "`" + prefix + " help <command>`");
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
    const info = "<:error:860884617770303519> | No information found for command `" + input.toLowerCase() + "`!";
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
     function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
     }
     alliaseslist = cmd.aliases.join(", ") || "None";
     const hembed = new Discord.MessageEmbed() // Prettier
      .setTitle(`:grey_question: \`${cmd.name}\` command help page`, message.guild.iconURL())
      .setColor("RANDOM")
      .setTimestamp()
      .addField("📚 Category", `\`${cmd.category}\``)
      .addField("⏱️ Cooldown", `\`${cmd.timeout || "5000"}ms\``)
      .addField("📝 Description", `\`${cmd.description}\``)
      .addField("🔩 Usage", `\`${prefix} ${cmd.usage}\``)
      .addField("🪧 Aliases", `\`${alliaseslist}\``)
      // .setDescription("Category: `" + cmd.category + "`\n Description: `" + cmd.description + "`\n Usage: `" + prefix + " " + cmd.usage + "`\n Aliases: `" + alliaseslist + "`")
      .setFooter(
       "Syntax: <> = required, [] = optional | Requested by " + `${message.author.username}`,
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
     description: "Something went wrong... :cry:",
    },
   });
  }
 },
};
