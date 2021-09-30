const { MessageEmbed } = require("discord.js");
const ms = require("ms");
const Timeout = new Map();

module.exports = async (client, message) => {
 try {
  if (!message) return;
  if (message.author.bot) return;
  if (message.content === `<@${client.user.id}>` || message.content === `<@!${client.user.id}>`) {
   const embed = new MessageEmbed() // Prettier
    .setTitle(`${client.bot_emojis.success} Hi!`, message.guild.iconURL())
    .setColor("RANDOM")
    .setDescription("I was pinged by you, here I am - <@" + client.user.id + ">! My prefix is `" + client.prefix + "` To see all  my commands please type `" + client.prefix + " help`!")
    .setTimestamp()
    .setFooter(
     `Requested by ${message.author.username}`,
     message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    );
   return message.reply({ embeds: [embed] });
  }
  if (!message.content.startsWith(client.prefix)) return;
  if (!message.member) message.member = await message.guild.fetchMember(message);
  const args = message.content.slice(client.prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd.length === 0) return;
  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  if (!command) {
   const embed = new MessageEmbed() // Prettier
    .setColor("RED")
    .setDescription(`${client.bot_emojis.error} | That command does not exist, Take a look at \`${client.prefix} help\`!`);
   return message.reply({ embeds: [embed] });
  }
  if (message.content.toLowerCase().includes("process.env")) {
   console.log("[Security Log]: " + message.author.tag + ` (ID: ` + message.author.id + ") used process.env in the " + command.name + " command.");
   const embed = new MessageEmbed() // Prettier
    .setColor("RED")
    .setDescription(`${client.bot_emojis.error} | The command cannot contain the \`process.env\` string for safetly reasons. We are sorry...`);
   return message.reply({ embeds: [embed] });
  }
  if (command) {
   const timeout = command.timeout || client.config.ratelimit;
   const key = message.author.id + command.name;
   const found = Timeout.get(key);
   if (found) {
    const timePassed = Date.now() - found;
    const timeLeft = timeout - timePassed;
    const embed = new MessageEmbed() // Prettier
     .setColor("RED")
     .setDescription(`${client.bot_emojis.error} | ${message.author} slow down! You have to wait \`${ms(timeLeft)}\` before you can use this command again!`);
    return message.reply({ embeds: [embed] });
   } else {
    command.run(client, message, args);
    Timeout.set(key, Date.now());
    setTimeout(() => {
     Timeout.delete(key);
    }, timeout);
   }
  }
 } catch (err) {
  console.log(err);
  const embed = new MessageEmbed().setDescription(`${client.bot_emojis.error} | Something went wrong while running this command! Please try again later!`).setColor("RED");
  return message.reply({ embeds: [embed] });
 }
};
