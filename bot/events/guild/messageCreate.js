const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const ms = require("ms");
const Timeout = new Map();

module.exports = async (client, message) => {
 try {
  if (!message) return;
  if (client.config.use_text_commands) {
   if (message.guild) {
    if (!message.guild.me.permissions.has("EMBED_LINKS")) return;
    if (!message.guild.me.permissions.has("SEND_MESSAGES")) return;
   }
   if (message.content.toLowerCase() == "get the cross") {
    message.react("🤌");
   }
   if (message.author.bot) return;
   if (message.guild && !message.author.bot && message.embeds.length > 0 && !message.content.includes(`http`)) {
    const sqlquery = "SELECT anti_selfbots AS res FROM `guild_settings` WHERE guildid = " + message.guild.id;
    client.database.query(sqlquery, function (error, results, fields) {
     if (error) return console.log(error);
     if (results[0]) {
      let selfbot = parseInt(Object.values(JSON.parse(JSON.stringify(results[0]))));
      if (selfbot == 1) {
       const error_message = new MessageEmbed().setColor("RED").setDescription(`${message.author} no selfbots in ${message.guild.name} (ID: \`${message.guild.id}\`)!`);
       message.author.send({ embeds: [error_message] });
       return message.delete();
      }
     }
    });
   }
   if (message.content === `<@${client.user.id}>` || message.content === `<@!${client.user.id}>`) {
    const embed = new MessageEmbed() // Prettier
    // .setTitle(`${client.bot_emojis.success} Hi!`, message.guild.iconURL())
     .setColor("GREEN")
     .setAuthor({name: `${client.bot_emojis.wave} Hello ${message.author.username}`, iconURL: client.user.displayAvatarURL({ dynamic: true, format: "png", size: 2048 })})
     .setDescription(`> I was pinged by you, here I am - <@${client.user.id}>!\n> To see all  my commands please type \`/help\`!\n\n>>> ${client.bot_emojis.slash_commands} *Note: Majo.exe will soon switch to slash commands (/)!\nWe are still working on this feature so please be patient :tada:!\n\nMajo.exe will stop responding to normal prefixes <t:1651269660:R>*`)
     .setTimestamp()
     .setThumbnail(client.user.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }))
     .setFooter({
      text: `Requested by ${message.author.username}`,
      iconURL: message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     });
    return message.reply({ embeds: [embed] });
   }
   if (!message.content.startsWith(client.prefix)) return;
   if (!message.member) message.member = await message.guild.fetchMember(message);
   const args = message.content.slice(client.prefix.length).trim().split(/ +/g);
   const cmd = args.shift().toLowerCase();
   if (cmd.length === 0) return;
   let command = client.commands.get(cmd);
   if (!command) command = client.commands.get(client.aliases.get(cmd));
   if (!command && client.additional_config.show_errors_on_no_command == true) {
    const embed = new MessageEmbed() // Prettier
     .setColor("RED")
     .setDescription(`${client.bot_emojis.error} | That command does not exist, Take a look at \`${client.prefix} help\`!`);
    return message.reply({ embeds: [embed] });
   }
   if (command) {
    const timeout = command.timeout || client.config.ratelimit;
    const key = message.author.id + command.name + message.guild.id;
    const found = Timeout.get(key);
    if (found) {
     const timePassed = Date.now() - found;
     const timeLeft = timeout - timePassed;
     const embed = new MessageEmbed() // Prettier
      .setColor("RED")
      .setDescription(`${client.bot_emojis.error} | ${message.author} slow down! You have to wait \`${ms(timeLeft)}\` before you can use this command again!`);
     return message.reply({ embeds: [embed] });
    } else {
     /* ---------------------------- */
     /* MIGARTING TO SLASH COMMANDS! */
     /* ---------------------------- */
     let slash_command_search = client.slash_commands.get(cmd);
     if (slash_command_search) {
      const slash_embed = new MessageEmbed() // Prettier
       .setTitle(`${client.bot_emojis.slash_commands} To run new command please use: \`/${cmd}\``)
       .setDescription(`>>> **Please use new slash commands instead!**\n\nMajo.exe will soon switch to slash commands!\nWe are still working on this feature so please be patient :tada:! \n\n***Majo.exe will stop responding to normal prefixes <t:1651269660:R>***`)
       .setColor("RED")
       .setImage("https://media.discordapp.net/attachments/922505955885867011/945367544045395978/unknown.png");
      return message.reply({ embeds: [slash_embed] });
     }
     /* ---------------------------- */
     /* /MIGARTING TO SLASH COMMANDS! */
     /* ---------------------------- */

     command.run(client, message, args);
     Timeout.set(key, Date.now());
     setTimeout(() => {
      Timeout.delete(key);
     }, timeout);
    }
   }
  }
 } catch (err) {
  console.log(err);
  const embed = new MessageEmbed() // Prettier
   .setDescription(`${client.bot_emojis.error} | Something went wrong while running this command! Please try again later!`)
   .setColor("RED");
  return message.reply({ embeds: [embed] });
 }
};
