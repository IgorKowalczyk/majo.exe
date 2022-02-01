const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { readdirSync } = require("fs");
const create_mh = require("../../../utilities/menu_help");
function capitalize(string) {
 if (string == "nsfw") {
  return string.toUpperCase();
 } else {
  return string.charAt(0).toUpperCase() + string.slice(1);
 }
}

module.exports = {
 name: "slash_commands_help",
 description: "❔ Get a list of commands or more information about a specific command [BETA]",
 usage: "/slash_commands_help [command]",
 category: "General",
 options: [
  {
   name: "query",
   description: "The full name of command or category",
   type: 3,
   required: false,
  },
 ],
 run: async (client, interaction, args) => {
  try {
   let categories = [];
   let cots = [];
   const emo = {
    general: client.bot_emojis.bricks,
    moderation: client.bot_emojis.hammer,
    fun: client.bot_emojis.rofl,
    music: client.bot_emojis.music,
    economy: client.bot_emojis.money,
    utility: client.bot_emojis.tools,
    image: client.bot_emojis.picture_frame,
    owner: client.bot_emojis.owner_crown,
    nsfw: client.bot_emojis.smirk, // https://www.youtube.com/watch?v=YMm2gv7TStc&t=37s ...
    giveaway: client.bot_emojis.giveaway,
    setup: client.bot_emojis.screw_that,
    social: client.bot_emojis.rocket,
   };
   if (!args[0]) {
    let ccate = [];
    let category_id = 0;
    // let separator = new Object();
    // separator = {
    //  name: "\u200B",
    //  value: "\u200B",
    //  inline: true
    //  }
    readdirSync(`${process.cwd()}/bot/slash_commands/`).forEach((dir) => {
     //category_id++;
     // if(category_id % 3 == 0) {
     //   category_id++;
     //   categories.push(separator);
     // }
     // if (ignored.includes(dir.toLowerCase())) return;
     const commands = readdirSync(`${process.cwd()}/bot/slash_commands/${dir}/`).filter((file) => file.endsWith(".js"));
     // if (ignored.includes(dir.toLowerCase())) return;
     const name = `${emo[dir.toLowerCase()]} ${capitalize(dir)}`;
     if ((dir.toLowerCase() == "owner" && interaction.member.user.id !== client.config.owner_id) || (dir.toLowerCase() == "owner" && interaction.member.user.id == client.config.owner_id && client.additional_config.help_embed.show_owner_commands == false)) return category_id--;
     let nome = dir.charAt(0) + dir.slice(1).toLowerCase();
     // let nome = dir;
     let cats = new Object();
     cats = {
      name: name,
      value: `> \`/help ${dir.toLowerCase()}\``,
      inline: client.additional_config.help_embed.grid,
     };
     categories.push(cats);
     ccate.push(nome);
    });

    const embed = new MessageEmbed()
     .setAuthor({ name: `${client.user.username} Help`, iconURL: client.user.displayAvatarURL() })
     .setDescription(`> Use the menu, or use ${client.config.domain ? `[\`/help [category]\`](${client.config.domain})` : `\`/help [category]\``} to view commands base on their category!\n\n`)
     .addFields(categories)
     .setFooter({
      text: `Requested by ${interaction.member.user.tag} • ${client.slash_commands.size} commands in total`,
      iconURL: interaction.member.user.displayAvatarURL({
       dynamic: true,
      }),
     })
     .setTimestamp()
     .setThumbnail(
      client.user.displayAvatarURL({
       dynamic: true,
       size: 2048,
      })
     )
     .setColor("#5865F2");
    if (client.additional_config.help_embed.display_news == true && client.additional_config.help_embed.news_title && client.additional_config.help_embed.news) {
     embed.addField(`${client.additional_config.help_embed.news_title}`, `${client.additional_config.help_embed.news}`);
    }
    let menus = create_mh(ccate);
    return interaction.followUp({ embeds: [embed], components: menus.smenu }).then((msgg) => {
     const menuID = menus.sid;
     const select = async (interaction) => {
      if (interaction.customId != menuID) return;
      let { values } = interaction;
      let value = values[0];
      let catts = [];
      readdirSync(`${process.cwd()}/bot/slash_commands/`).forEach((dir) => {
       if (dir.toLowerCase() !== value.toLowerCase()) return;
       const commands = readdirSync(`${process.cwd()}/bot/slash_commands/${dir}/`).filter((file) => file.endsWith(".js"));
       const cmds = commands.map((command) => {
        let file = require(`${process.cwd()}/bot/slash_commands/${dir}/${command}`);
        if (!file.name) return "No command name.";
        let name = file.name.replace(".js", "");
        let des = client.slash_commands.get(name).description;
        let emo = client.slash_commands.get(name).emoji;
        let emoe = emo ? `${emo} | ` : "";
        let obj = {
         cname: `${emoe}\`/${name}\``,
         des,
        };
        return obj;
       });
       let command_names = new Object();
       cmds.map((co) => {
        if (co == undefined) return;
        /*command_names = {
            name: `${cmds.length === 0 ? "In progress." : co.cname}`,
            value: co.des ? `> ${co.des}` : "> No Description",
            inline: true,
           };*/
        command_names = ` ${cmds.length === 0 ? "In progress." : co.cname}`;
        catts.push(command_names);
       });
       cots.push(dir.toLowerCase());
      });

      if (cots.includes(value.toLowerCase())) {
       const combed = new MessageEmbed()
        .setTitle(`${emo[value.toLowerCase()] || "❔"} \`${capitalize(value.toLowerCase())}\` commands`)
        .setAuthor({ name: `${client.user.username} Help`, iconURL: client.user.displayAvatarURL() })
        .setDescription(`>${catts}`)
        //.addFields(catts)
        .setColor("#5865F2")
        .setThumbnail(
         client.user.displayAvatarURL({
          dynamic: true,
          size: 2048,
         })
        )
        .setFooter({
         text: `Requested by ${interaction.member.user.tag} • ${client.slash_commands.size} commands in total`,
         iconURL: interaction.member.user.displayAvatarURL({
          dynamic: true,
         }),
        });
       await interaction.deferUpdate();
       return interaction.editReply({
        embeds: [combed],
        components: menus.smenu,
       });
      }
     };
     const filter = (interaction) => {
      if (interaction.user.id !== interaction.member.user.id) return client.createError(interaction, `You can't use the menu! Only ${interaction.member.user} can do that! If you want control menu by yourself run \`/help \``, "RED", true);
      return !interaction.user.bot;
     };
     const collector = msgg.createMessageComponentCollector({
      filter,
      componentType: "SELECT_MENU",
      time: 61912, // 19.12 | Milliseconds pass as quickly as relationships
     });
     collector.on("collect", select);
     collector.on("end", () => {
      (async () => {
       const end_embed = new MessageEmbed()
        .setAuthor({ name: `${client.user.username} Help` })
        .setTitle(`Time elapsed!`)
        .setColor("RED")
        .setDescription(`> To see the help menu again please type \`/help\`\n> Or to see commands from category please type \`/help [category]\``)
        .setFooter({
         text: `Requested by ${interaction.member.user.tag} • ${client.ws.ping} ms ping!`,
         iconURL: interaction.member.user.displayAvatarURL({
          dynamic: true,
         }),
        })
        .setTimestamp()
        .setThumbnail(
         client.user.displayAvatarURL({
          dynamic: true,
          size: 2048,
         })
        );
       const row = new MessageActionRow() // Prettier
        .addComponents(
         new MessageButton() // Prettier
          .setURL(`https://discord.com/oauth2/authorize/?permissions=${client.config.permissions}&scope=${client.config.scopes}&client_id=${client.user.id}`)
          //.setEmoji(client.bot_emojis.giveaway)
          .setLabel("Maybe invite me!")
          .setStyle("LINK")
        );
       await interaction.editReply({
        embeds: [end_embed],
        components: [row],
       });
      })();
     });
    });
   } else {
    let catts = [];
    readdirSync(`${process.cwd()}/bot/slash_commands/`).forEach((dir) => {
     if (dir.toLowerCase() !== args[0].toLowerCase()) return;
     const commands = readdirSync(`${process.cwd()}/bot/slash_commands/${dir}/`).filter((file) => file.endsWith(".js"));
     const cmds = commands.map((command) => {
      let file = require(`${process.cwd()}/bot/slash_commands/${dir}/${command}`);
      if (!file.name) return "No command name.";
      let name = file.name.replace(".js", "");
      let des = file.description;
      let emo = file.emoji;
      let emoe = emo ? `${emo} | ` : "";
      let obj = {
       cname: `${emoe}\`/${name}\``,
       des,
      };
      return obj;
     });

     let command_names = new Object();
     cmds.map((co) => {
      if (co == undefined) return;
      command_names = ` ${cmds.length === 0 ? "In progress." : co.cname}`;
      catts.push(command_names);
     });
     cots.push(dir.toLowerCase());
    });
    const command = client.slash_commands.get(args[0].toLowerCase());
    if (cots.includes(args[0].toLowerCase())) {
     const combed = new MessageEmbed()
      .setTitle(`${emo[args[0].toLowerCase()] || "❔"} \`${capitalize(args[0])}\` commands`)
      .setAuthor({ name: `${client.user.username} Help`, iconURL: client.user.displayAvatarURL() })
      .setDescription(`>${catts || "In progress"}`)
      //.addFields(catts)
      .setColor("#5865F2")
      .setThumbnail(
       client.user.displayAvatarURL({
        dynamic: true,
        size: 2048,
       })
      )
      .setFooter({
       text: `Requested by ${interaction.member.user.tag} • ${client.slash_commands.size} commands in total`,
       iconURL: interaction.member.user.displayAvatarURL({
        dynamic: true,
       }),
      });
     return interaction.followUp({ embeds: [combed] });
    }
    if (!command) {
     return client.createSlashError(interaction, `❌ | Invalid command or module!`);
    }
    const embed = new MessageEmbed()
     .setTitle(`${client.bot_emojis.question} \`${command.name}\` command help page`)
     .setDescription("> Syntax: `<>` = required, `[]` = optional")
     .addField(`${client.bot_emojis.stopwatch} Category`, `\`${command.category}\``)
     .addField(`${client.bot_emojis.stopwatch} Cooldown`, `\`${command.timeout || "5000"}ms\``)
     .addField(`${client.bot_emojis.edit} Description`, command.description ? `\`${command.description}\`` : "`No description found for this command!`")
     .addField(`${client.bot_emojis.screw_that} Usage`, command.usage ? `\`${command.usage}\`` : `\`/${command.name}\``)
     .setFooter({
      text: `Requested by ${interaction.member.user.tag}`,
      iconURL: interaction.member.user.displayAvatarURL({
       dynamic: true,
       size: 2048,
      }),
     })
     .setTimestamp()
     .setColor("#5865F2");
    return await interaction.followUp({ embeds: [embed] });
   }
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
