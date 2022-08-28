const chalk = require("chalk");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = async (client, guild) => {
 console.log(chalk.green.bold("> ") + chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`) + chalk.cyan.bold(` New guild joined: `) + chalk.blue.bold.underline(guild.name) + chalk.cyan.bold(" (ID: ") + chalk.blue.bold.underline(guild.id) + chalk.cyan.bold(" | Members: ") + chalk.blue.bold.underline(guild.memberCount) + chalk.cyan.bold(")"));
 const first_channel = guild.channels.cache.filter((f) => f.type === "GUILD_TEXT" && f.permissionsFor(guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL", "EMBED_LINKS"])).first();
 if (guild.memberCount <= client.config.member_limit.min_members && !client.config.member_limit.ignore.id.includes(guild.id)) {
  const embed = new MessageEmbed()
   .setTitle(`${client.bot_emojis.error} It appears that this guild is not big enough!`)
   .setDescription(`It appears **${guild.name}** does not meet our requirments:\n - This guild has less than \`${client.config.member_limit.min_members}\` members.\nPlease consider inviting more members to this guild!`)
   .setColor("RED")
   .setThumbnail(guild.iconURL())
   .setFooter({ text: `${client.user.username} - The best Discord Bot!`, iconURL: client.user.avatarURL() });
  const row = new MessageActionRow().addComponents(new MessageButton().setURL(client.config.support_server).setLabel("Support").setStyle("LINK")).addComponents(new MessageButton().setURL("https://github.com/igorkowalczyk/majo.exe").setLabel("Source").setStyle("LINK"));
  if (process.env.DASHBOARD) {
   row.addComponents(new MessageButton().setURL(`${process.env.DOMAIN}`).setLabel("Dashboard").setStyle("LINK"));
  }
  first_channel.send({ embeds: [embed], components: [row] }).catch(() => {});
  setTimeout(() => {
   guild.leave().catch(() => {});
  }, 5000);
 } else {
  const embed = new MessageEmbed()
   .setTitle(`${client.bot_emojis.success} Yay!`)
   .setDescription(`> Thank you for inviting me to **${guild.name}**!\n\n> I have almost everything - Fun, Memes, Images, Giveaway, Moderation, Anime and NSFW! If you have any questions, feel free to join our support server!`)
   .setColor("#5865F2")
   .setThumbnail(guild.iconURL())
   .setFooter({ text: `${client.user.username} - The best Discord Bot!`, iconURL: client.user.avatarURL() });
  const row = new MessageActionRow()
   .addComponents(new MessageButton().setURL(`https://discord.com/oauth2/authorize/?permissions=${client.config.permissions}&scope=${client.config.scopes}&client_id=${client.user.id}`).setLabel("Invite me!").setStyle("LINK"))
   .addComponents(new MessageButton().setURL(client.config.support_server).setLabel("Support").setStyle("LINK"))
   .addComponents(new MessageButton().setURL("https://github.com/igorkowalczyk/majo.exe").setLabel("Source").setStyle("LINK"));
  if (process.env.DASHBOARD) {
   row.addComponents(new MessageButton().setURL(`${process.env.DOMAIN}`).setLabel("Dashboard").setStyle("LINK"));
  }
  first_channel.send({ embeds: [embed], components: [row] }).catch(() => {});
 }
};
