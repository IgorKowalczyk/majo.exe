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
 name: "help",
 description: "❔ Display a list of all available slash commands",
 usage: "/help [command]",
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
   let cattegories_help = [];
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
    let dir_categories = [];
    let category_id = 0;
    readdirSync(`${process.cwd()}/bot/slash_commands/`).forEach((dir) => {
     const name = `${emo[dir.toLowerCase()]} ${capitalize(dir)}`;
     if ((dir.toLowerCase() == "owner" && interaction.member.user.id !== client.config.owner_id) || (dir.toLowerCase() == "owner" && interaction.member.user.id == client.config.owner_id && client.additional_config.help_embed.show_owner_commands == false)) return category_id--;
     let dir_uppercase = dir.charAt(0) + dir.slice(1).toLowerCase();
     let categories_obj = new Object();
     categories_obj = {
      name: name,
      value: `> \`/help ${dir.toLowerCase()}\``,
      inline: client.additional_config.help_embed.grid,
     };
     categories.push(categories_obj);
     dir_categories.push(dir_uppercase);
    });
    const embed = new MessageEmbed()
     .setAuthor({ name: `${client.user.username} Help`, iconURL: client.user.displayAvatarURL() })
     .setDescription(`> Use the menu, or use ${process.env.DOMAIN ? `[\`/help [category]\`](${process.env.DOMAIN})` : `\`/help [category]\``} to view commands based on their category!\n\n`)
     .addFields(categories)
     .setFooter({
      text: `Requested by ${interaction.member.user.tag} • ${client.all_commands} commands in total`,
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
    if (client.additional_config.help_embed.display_news && client.additional_config.help_embed.news_title && client.additional_config.help_embed.news) {
     embed.addField(`${client.additional_config.help_embed.news_title}`, `${client.additional_config.help_embed.news}`);
    }
    let menus = create_mh(dir_categories);
    return interaction.followUp({ embeds: [embed], components: menus.smenu }).then((msgg) => {
     const menuID = menus.sid;
     const select = async (interaction) => {
      if (interaction.customId != menuID) return;
      let { values } = interaction;
      let value = values[0];
      let categories_arr = [];
      readdirSync(`${process.cwd()}/bot/slash_commands/`).forEach((dir) => {
       if (dir.toLowerCase() !== value.toLowerCase()) return;
       const commands = readdirSync(`${process.cwd()}/bot/slash_commands/${dir}/`).filter((file) => file.endsWith(".js"));
       const cmds = commands.map((command) => {
        let file = require(`${process.cwd()}/bot/slash_commands/${dir}/${command}`);
        if (!file.name) return "Unknown command";
        let name = file.name.replace(".js", "");
        if (file.container) return;
        let description = client.slash_commands.get(name).description;
        let cmd_emoji = client.slash_commands.get(name).emoji;
        let cmd_emoji_string = cmd_emoji ? `${cmd_emoji} | ` : "";
        let obj = {
         cname: `${cmd_emoji_string}\`/${name}\``,
         description,
        };
        return obj;
       });
       let command_names = new Object();
       cmds.map((co) => {
        if (!co) return;
        command_names = ` ${cmds.length === 0 ? "Soon!" : co.cname}`;
        categories_arr.push(command_names);
       });
       cattegories_help.push(dir.toLowerCase());
      });
      client.extra_slash_commands.map((co) => {
       if (co.category.toLowerCase() !== value.toLowerCase()) return;
       categories_arr.push(` \`/${co.orgin} ${co.name}\``);
      });
      if (cattegories_help.includes(value.toLowerCase())) {
       const combed = new MessageEmbed()
        .setTitle(`${emo[value.toLowerCase()] || "❔"} \`${capitalize(value.toLowerCase())}\` commands`)
        .setAuthor({ name: `${client.user.username} Help`, iconURL: client.user.displayAvatarURL() })
        .setDescription(`>${categories_arr}`)
        //.addFields(categories_arr)
        .setColor("#5865F2")
        .setThumbnail(
         client.user.displayAvatarURL({
          dynamic: true,
          size: 2048,
         })
        )
        .setFooter({
         text: `Requested by ${interaction.member.user.tag} • ${client.all_commands} commands in total`,
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
     collector.on("end", async () => {
      const end_embed = new MessageEmbed()
       .setAuthor({ name: `${client.user.username} Help`, iconURL: client.user.displayAvatarURL() })
       .setTitle(`Time elapsed!`)
       .setColor("RED")
       .setDescription(`> To see the help menu again please type \`/help\`\n> Or to see commands from category please type \`/help [category]\``)
       .setFooter({
        text: `Requested by ${interaction.member.user.tag} • Ping: ${client.ws.ping}ms`,
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
         .setLabel("Maybe invite me!")
         .setStyle("LINK")
       );
      if (client.config.support_server) {
       row.addComponents(
        new MessageButton() // Prettier
         .setURL(`${client.config.support_server}`)
         .setLabel("Support server")
         .setStyle("LINK")
       );
      }
      await interaction.editReply({
       embeds: [end_embed],
       components: [row],
      });
     });
    });
   } else {
    let command_names = new Object();
    let categories_arr = [];
    readdirSync(`${process.cwd()}/bot/slash_commands/`).forEach((dir) => {
     if (dir.toLowerCase() !== args[0].toLowerCase()) return;
     const commands = readdirSync(`${process.cwd()}/bot/slash_commands/${dir}/`).filter((file) => file.endsWith(".js"));
     const cmds = commands.map((command) => {
      let file = require(`${process.cwd()}/bot/slash_commands/${dir}/${command}`);
      if (!file.name) return "No command name.";
      if (file.container) return;
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

     cmds.map((co) => {
      if (!co) return;
      command_names = ` ${cmds.length === 0 ? "In progress." : co.cname}`;
      categories_arr.push(command_names);
     });
     cattegories_help.push(dir.toLowerCase());
    });
    client.extra_slash_commands.map((co) => {
     if (co.category.toLowerCase() !== args[0].toLowerCase()) return;
     categories_arr.push(` \`/${co.orgin} ${co.name}\``);
    });
    const command = client.slash_commands.get(args[0].toLowerCase()) || client.extra_slash_commands.get(args[0].toLowerCase());
    if (cattegories_help.includes(args[0].toLowerCase())) {
     const combed = new MessageEmbed()
      .setTitle(`${emo[args[0].toLowerCase()] || "❔"} \`${capitalize(args[0])}\` commands`)
      .setAuthor({ name: `${client.user.username} Help`, iconURL: client.user.displayAvatarURL() })
      .setDescription(`>${categories_arr || "In progress..."}`)
      .setColor("#5865F2")
      .setThumbnail(
       client.user.displayAvatarURL({
        dynamic: true,
        size: 2048,
       })
      )
      .setFooter({
       text: `Requested by ${interaction.member.user.tag} • ${client.all_commands} commands in total`,
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
