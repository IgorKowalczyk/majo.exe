const { MessageEmbed } = require("discord.js");
const sql = require("../../../utilities/database");

module.exports = {
 name: "anti-selfbot",
 aliases: [],
 description: "Enable/Disable selfbot protection",
 category: "Setup",
 usage: "anti-selfbot [true/false]",
 run: async (client, message, args) => {
  try {
   if (!message.member.permissions.has("MANAGE_GUILD")) {
    return client.createError(message, `${client.bot_emojis.error} | You don't have permissions to manage selfbot protection! You need \`MANAGE_GUILD\` permission!`);
   }
   if (args[0]) {
    if (args[0].toLowerCase() == "true" || args[0].toLowerCase() == "false") {
     let selfbot_config;
     if (args[0].toLowerCase() == "true") selfbot_config = 1;
     if (args[0].toLowerCase() == "false") selfbot_config = 0;
     const sql_start_query = "SELECT anti_selfbots AS res FROM guild_settings WHERE guild_id = " + message.guild.id;
     sql.query(sql_start_query, function (error, results, fields) {
      if (error) return console.log(error);
      if (results[0]) {
       const update = "UPDATE guild_settings SET anti_selfbots = " + selfbot_config + " WHERE guild_id = " + message.guild.id;
       sql.query(update, function (error, results2, fields) {
        if (error) console.log(error);
        const embed = new MessageEmbed() // Prettier
         .setColor("GREEN")
         .setDescription(`${client.bot_emojis.sparkles} | Anti-selfbot protection is now \`${selfbot_config == 1 ? "enabled" : "disabled"}\``);
        message.reply({ embeds: [embed] });
       });
      } else {
       const create = "INSERT INTO `guild_settings` (`guild_id`, `anti_selfbots`) VALUES (" + message.guild.id + "," + selfbot_config + ")";
       sql.query(create, function (error, results2, fields) {
        if (error) console.log(error);
        const embed = new MessageEmbed() // Prettier
         .setColor("GREEN")
         .setDescription(`${client.bot_emojis.sparkles} | Anti-selfbot protection is now \`${selfbot_config == 1 ? "enabled" : "disabled"}\``);
        message.reply({ embeds: [embed] });
       });
      }
     });
    } else {
     return client.createError(message, `${client.bot_emojis.error} | Value must be \`true/false\`\n\n**Usage:** \`${client.prefix} anti-selfbot [true/false]\``);
    }
   } else if (!args[0]) {
    const sqlquery = "SELECT anti_selfbots AS res FROM guild_settings WHERE guild_id = " + message.guild.id;
    sql.query(sqlquery, function (error, results, fields) {
     if (error) return console.log(error);
     if (results[0]) {
      let selfbot = parseInt(Object.values(JSON.parse(JSON.stringify(results[0]))));
      if (selfbot == 1) {
       const embed = new MessageEmbed() // Prettier
        .setColor("GREEN")
        .setDescription(`${client.bot_emojis.sparkles} | Anti-selfbot protection is \`enabled\``);
       message.reply({ embeds: [embed] });
      } else if (selfbot == 0) {
       const embed = new MessageEmbed() // Prettier
        .setColor("GREEN")
        .setDescription(`${client.bot_emojis.sparkles} | Anti-selfbot protection is now \`disabled\``);
       message.reply({ embeds: [embed] });
      }
     } else {
      return client.createError(message, `${client.bot_emojis.error} | Anti-selfbot protection is not configured! To configure please run \`${client.prefix} anti-selfbot [true/false]\``);
     }
    });
   }
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
