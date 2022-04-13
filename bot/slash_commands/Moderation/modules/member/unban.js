const { MessageEmbed } = require("discord.js");
module.exports = async (client, interaction, args) => {
 try {
  if (!interaction.guild.me.permissions.has("BAN_MEMBERS")) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | I don't have premission to ban members!`);
  }
  if (!interaction.member.permissions.has("BAN_MEMBERS")) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | You don't have premission to ban members!`);
  }
  const id = args[1];
  const rgx = /^(?:<@!?)?(\d+)>?$/;
  if (!id) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | You have to provide user ID!\n\n**Usage:** \`/member unban <ID> [reason]\``);
  }
  if (!rgx.test(id)) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | You have to provide vaild user ID\n\n**Usage:** \`/member unban <ID> [reason]\``);
  }
  let reason = `${args.slice(2).join(" ") || "No reason provided!"} | Unbanned by: ${interaction.user.tag}`;
  if (reason.length > 1024) reason = reason.slice(0, 1021) + "...";
  try {
   const banned_user = await interaction.guild.bans.fetch(id);
   if (!banned_user) {
    return client.createSlashError(interaction, `${client.bot_emojis.error} | Unable to find user, please check ID\n\n**Usage:** \`/member unban <ID> [reason]\``);
   }
   const ban = await client.users.fetch(id);
   if (!ban) {
    return client.createSlashError(interaction, `${client.bot_emojis.error} | Unable to find user, please check ID\n\n**Usage:** \`/member unban <ID> [reason]\``);
   }
   await interaction.guild.bans.remove(ban, reason);
   const embed = new MessageEmbed()
    .setDescription(`${client.bot_emojis.success} | \`${ban.username}#${ban.discriminator}\` (ID: \`${banned_user.user.id}\`) has been unbanned.\n\n>>> Reason: \`${reason}\``)
    .setTimestamp()
    .setThumbnail(ban.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }))
    .setColor("GREEN")
    .setFooter({
     text: `Requested by ${interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    });
   interaction.followUp({ embeds: [embed] });
  } catch (err) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | Unable to find user, please check ID\n\n**Usage:** \`/member unban <ID> [reason]\``);
  }
 } catch (err) {
  console.log(err);
  return client.createSlashCommandError(interaction, err);
 }
};
