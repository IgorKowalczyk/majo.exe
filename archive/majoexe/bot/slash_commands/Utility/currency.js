const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const currencies_list = require("../../../utilities/currencies");
const cheerio = require("cheerio");
const fetch = require("node-fetch");

module.exports = {
 name: "currency",
 description: "💵 Currency converter",
 category: "Utility",
 usage: "/currency convert <amount> <from> <to> | /currency list",
 options: [
  {
   name: "convert",
   description: "💵 Convert currency",
   type: 1,
   usage: "/currency convert <amount> <from> <to>",
   category: "Utility",
   orgin: "currency",
   options: [
    {
     name: "amount",
     description: "The amount to convert",
     required: true,
     type: 3,
    },
    {
     name: "from",
     description: "The currency to convert from",
     required: true,
     type: 3,
    },
    {
     name: "to",
     description: "The currency to convert to",
     required: true,
     type: 3,
    },
   ],
  },
  {
   name: "list",
   description: "💵 List all available currencies",
   type: 1,
   usage: "/currency list",
   category: "Utility",
   orgin: "currency",
  },
 ],
 run: async (client, interaction, args) => {
  try {
   if (args[0] === "convert") {
    if (isNaN(args[1])) {
     return client.createSlashError(message, `${client.bot_emojis.error} | Amout of money must be number!`);
    }
    if (!args[2]) {
     return client.createSlashError(message, `${client.bot_emojis.error} | Please enter base currency (from which currency it is)`);
    }
    if (args[1].toString().length > 3) {
     return client.createSlashError(message, `${client.bot_emojis.error} | Currency code can't be longer than \`3\` characters!`);
    }
    if (!currencies_list.includes(args[2].toUpperCase())) {
     return client.createSlashError(message, `${client.bot_emojis.error} | Please enter vaild first currency code!\n**Tip:** To display all currencies codes please use \`/currency list\`!`);
    }
    if (!args[3]) {
     return client.createSlashError(message, `${client.bot_emojis.error} | Please enter second currency (to which currency it is converted)`);
    }
    if (args[3].toString().length > 3) {
     return client.createSlashError(message, `${client.bot_emojis.error} | Second currency code can't be longer than \`3\` characters!`);
    }
    if (!currencies_list.includes(args[3].toUpperCase())) {
     return client.createSlashError(message, `${client.bot_emojis.error} | Please enter vaild second currency code!\n**Tip:** To display all currencies codes please use \`/currency list\`!`);
    }
    const wait = new MessageEmbed() // Prettier
     .setColor("#5865f2")
     .setDescription(`${client.bot_emojis.loading} | Please wait... I'm converting \`${args[1]} ${args[2].toUpperCase()}\` to \`${args[3].toUpperCase()}\``);
    interaction.followUp({ embeds: [wait] }).then((msg) => {
     (async () => {
      fetch(`https://www.google.co.in/search?q=${args[1]}+${args[2].toUpperCase()}+to+${args[3].toUpperCase()}`)
       .then((res) => res.text())
       .then((html) => {
        return cheerio.load(html);
       })
       .then(($) => {
        return $(".iBp4i").text();
       })
       .then((rates) => {
        const row = new MessageActionRow() // Prettier
         .addComponents(
          // Prettier
          new MessageButton() // Prettier
           .setLabel("Show more")
           .setStyle("LINK")
           .setURL(`https://www.google.com/search?q=${args[1]}+${args[2].toUpperCase()}+to+${args[3].toUpperCase()}`)
         );
        const embed = new MessageEmbed() // Prettier
         .setColor("GREEN")
         .setTitle(`${client.bot_emojis.success} Success!`)
         .setDescription(`\`${args[1]} ${args[2].toUpperCase()}\` ➡️ \`${parseFloat(rates)} ${args[3].toUpperCase()}\`\n\n||Data provided by [Google LLC](https://google.com)||`)
         .setFooter({
          text: `Requested by ${interaction.user.username}`,
          iconURL: interaction.user.displayAvatarURL({
           dynamic: true,
           format: "png",
           size: 2048,
          }),
         });
        msg.edit({ embeds: [embed], components: [row] });
       });
     })();
    });
   }
   if (args[0].toLowerCase() == "list") {
    let embed = new MessageEmbed()
     .setDescription(`\`${currencies_list.join("`, `")}\``)
     .setColor("GREEN")
     .setTitle(`${client.bot_emojis.success} All supported currencies`)
     .setFooter({
      text: `Requested by ${interaction.user.username}`,
      iconURL: interaction.user.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     });
    return interaction.followUp({ embeds: [embed] });
   }
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
