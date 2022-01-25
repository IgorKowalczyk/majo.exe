const { MessageEmbed } = require("discord.js");

module.exports = {
 name: "nuke",
 aliases: ["nuke-channel"],
 description: "Nuke channel",
 category: "Moderation",
 usage: "nuke [channel]",
 run: async (client, message, args) => {
  try {
   if (!message.guild.me.permissions.has("MANAGE_CHANNEL")) {
    return client.createError(message, `${client.bot_emojis.error} | I don't have premission to nuke channels!`);
   }
   if (!message.member.permissions.has("MANAGE_CHANNEL")) {
    return client.createError(message, `${client.bot_emojis.error} | You don't have premission to nuke channels!`);
   }
   let reason = `${args.join(" ") || "No reason provided!"} | Nuked by: ${message.author.tag}`;
   if (reason.length > 1024) reason = reason.slice(0, 1021) + "...";
   if (!message.channel.deletable) {
    return client.createError(message, `${client.bot_emojis.error} | This channel cannot be nuked!\n\n**Usage:** \`${client.prefix} add-role <nuke> [channel]\``);
   }
   const wait = new MessageEmbed() // Prettier
    .setColor("#5865f2")
    .setDescription(`${client.bot_emojis.loading} | Please wait... I'm nuking the channel`);
   await message.reply({ embeds: [wait] });
   let newchannel = await message.channel.clone();
   await message.channel.delete();
   let embed = new MessageEmbed()
    .setTitle("Channel Nuked!")
    .setColor("GREEN")
    .setDescription(`> Reason: ${reason}`)
    .setImage("https://media2.giphy.com/media/iISIZHlk3DTnNg0uG0/giphy.gif")
    .setFooter({
     text: `Requested by ${message.author.username}`,
     iconURL: message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    })
    .setTimestamp();
   await newchannel.send({ embeds: [embed] });
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
