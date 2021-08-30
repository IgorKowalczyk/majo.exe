const { MessageEmbed, Message, Client } = require("discord.js");
const { readdirSync } = require("fs");
const prefix = process.env.PREFIX;
const create_mh = require("../../utilities/menu_help");
function capitalize(string) {
 return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {
 name: "help",
 aliases: ["h", "commands"],
 category: "General",
 description: "Displays all the commands available",
 timeout: "10000",
 usage: "help [command]",
 run: async (client, message, args) => {
  let categories = [];
  let cots = [];
  if (!args[0]) {
   const emo = {
    general: client.bot_emojis.bricks,
    moderation: client.bot_emojis.hammer,
    fun: client.bot_emojis.rofl,
    music: client.bot_emojis.music,
    economy: client.bot_emojis.money,
    utility: client.bot_emojis.utility,
    image: client.bot_emojis.picture_frame,
    nsfw: client.bot_emojis.smirk, // https://www.youtube.com/watch?v=YMm2gv7TStc&t=37s ...
   };
   let ccate = [];
   readdirSync("./commands/").forEach((dir) => {
    // if (ignored.includes(dir.toLowerCase())) return;
    const commands = readdirSync(`./commands/${dir}/`).filter((file) => file.endsWith(".js"));
    // if (ignored.includes(dir.toLowerCase())) return;
    const name = `${emo[dir.toLowerCase()]} ${capitalize(dir)}`;
    let nome = dir.charAt(0) + dir.slice(1).toLowerCase();
    // let nome = dir;
    let cats = new Object();
    cats = {
     name: name,
     value: `> \`${prefix} help ${dir.toLowerCase()}\``,
     inline: true,
    };
    categories.push(cats);
    ccate.push(nome);
   });

   const embed = new MessageEmbed()
    .setAuthor(`${client.user.username} Help`, message.guild.iconURL())
    .setDescription(`My prefix is \`${prefix}\`\nUse the menu, or use \`${prefix} help [category]\` to view commands base on their category!`)
    .addFields(categories)
    .setFooter(
     `Requested by ${message.author.tag} | ${client.commands.size} commands in total`,
     message.author.displayAvatarURL({
      dynamic: true,
     })
    )
    .setTimestamp()
    .setThumbnail(
     client.user.displayAvatarURL({
      dynamic: true,
      size: 2048,
     })
    )
    .setColor("RANDOM");

   let menus = create_mh(ccate);
   return message.reply({ embeds: [embed], components: menus.smenu }).then((msgg) => {
    const menuID = menus.sid;
    const select = async (interaction) => {
     if (interaction.customId != menuID) return;
     let { values } = interaction;
     let value = values[0];
     let catts = [];
     readdirSync("./commands/").forEach((dir) => {
      if (dir.toLowerCase() !== value.toLowerCase()) return;
      const commands = readdirSync(`./commands/${dir}/`).filter((file) => file.endsWith(".js"));
      const cmds = commands.map((command) => {
       let file = require(`../../commands/${dir}/${command}`);
       if (!file.name) return "No command name.";
       let name = file.name.replace(".js", "");
       if (client.commands.get(name).hidden) return;
       let des = client.commands.get(name).description;
       let emo = client.commands.get(name).emoji;
       let emoe = emo ? `${emo} | ` : "";
       let obj = {
        cname: `${emoe}\`${name}\``,
        des,
       };
       return obj;
      });
      let dota = new Object();
      cmds.map((co) => {
       if (co == undefined) return;
       dota = {
        name: `${cmds.length === 0 ? "In progress." : co.cname}`,
        value: co.des ? `> ${co.des}` : "> No Description",
        inline: true,
       };
       catts.push(dota);
      });
      cots.push(dir.toLowerCase());
     });

     if (cots.includes(value.toLowerCase())) {
      const combed = new MessageEmbed()
       .setTitle(`\`${capitalize(value.toLowerCase())}\` commands`)
       .setAuthor(`${client.user.username} Help`, message.guild.iconURL())
       .setDescription(`Use \`${prefix} help\` followed by a command name to get more information on a command.\nFor example: \`${prefix} help ping\`.\n\n`)
       .addFields(catts)
       .setColor("RANDOM")
       .setThumbnail(
        client.user.displayAvatarURL({
         dynamic: true,
         size: 2048,
        })
       )
       .setFooter(
        `Requested by ${message.author.tag} | ${client.commands.size} commands in total`,
        message.author.displayAvatarURL({
         dynamic: true,
        })
       );
      await interaction.deferUpdate();
      return interaction.message.edit({
       embeds: [combed],
       components: menus.smenu,
      });
     }
    };
    const filter = (interaction) => {
     return !interaction.user.bot && interaction.user.id == message.author.id;
    };
    const collector = msgg.createMessageComponentCollector({
     filter,
     componentType: "SELECT_MENU",
    });
    collector.on("collect", select);
    collector.on("end", () => null);
   });
  } else {
   let catts = [];
   readdirSync("./commands/").forEach((dir) => {
    if (dir.toLowerCase() !== args[0].toLowerCase()) return;
    const commands = readdirSync(`./commands/${dir}/`).filter((file) => file.endsWith(".js"));
    const cmds = commands.map((command) => {
     let file = require(`../../commands/${dir}/${command}`);
     if (!file.name) return "No command name.";
     let name = file.name.replace(".js", "");
     if (client.commands.get(name).hidden) return;
     let des = client.commands.get(name).description;
     let emo = client.commands.get(name).emoji;
     let emoe = emo ? `${emo} | ` : "";
     let obj = {
      cname: `${emoe}\`${name}\``,
      des,
     };

     return obj;
    });

    let dota = new Object();
    cmds.map((co) => {
     if (co == undefined) return;
     dota = {
      name: `${cmds.length === 0 ? "In progress." : co.cname}`,
      value: co.des ? co.des : "No Description",
      inline: true,
     };
     catts.push(dota);
    });
    cots.push(dir.toLowerCase());
   });

   const command = client.commands.get(args[0].toLowerCase()) || client.commands.find((c) => c.aliases && c.aliases.includes(args[0].toLowerCase()));
   if (cots.includes(args[0].toLowerCase())) {
    const combed = new MessageEmbed()
     .setTitle(`\`${capitalize(args[0])}\` commands`)
     .setAuthor(`${client.user.username} Help`, message.guild.iconURL())
     .setDescription(`Use \`${prefix} help\` followed by a command name to get more information on a command.\nFor example: \`${prefix} help ping\`.\n\n`)
     .addFields(catts)
     .setColor("RANDOM")
     .setThumbnail(
      client.user.displayAvatarURL({
       dynamic: true,
       size: 2048,
      })
     )
     .setFooter(
      `Requested by ${message.author.tag} | ${client.commands.size} commands in total`,
      message.author.displayAvatarURL({
       dynamic: true,
      })
     );
    return message.reply({ embeds: [combed] });
   }

   if (!command) {
    const embed = new MessageEmbed().setDescription(`${client.bot_emojis.error} | Invalid command! Use \`${prefix} help\` for all of my commands!`).setColor("RED");
    return await message.reply({ embeds: [embed] });
   }

   const embed = new MessageEmbed()
    .setTitle(`${client.bot_emojis.question} \`${command.name}\` command help page`)
    .setDescription("> Syntax: `<>` = required, `[]` = optional")
    .addField(`${client.bot_emojis.stopwatch} Category`, `\`${command.category}\``)
    .addField(`${client.bot_emojis.stopwatch} Cooldown`, `\`${command.timeout || "5000"}ms\``)
    .addField(`${client.bot_emojis.edit} Description`, command.description ? `\`${command.description}\`` : "`No description found for this command!`")
    .addField(`${client.bot_emojis.screw_that} Usage`, command.usage ? `\`${prefix}${command.name} ${command.usage}\`` : `\`${prefix}${command.name}\``)
    .addField(`${client.bot_emojis.sign} Aliases`, command.aliases ? `\`${command.aliases.join("`, `")}\`` : "None!")
    .setFooter(
     `Requested by ${message.author.tag}`,
     message.author.displayAvatarURL({
      dynamic: true,
      size: 2048,
     })
    )
    .setTimestamp()
    .setColor("RANDOM");
   return await message.reply({ embeds: [embed] });
  }
 },
};
