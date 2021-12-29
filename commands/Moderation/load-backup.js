const { MessageEmbed } = require("discord.js");

module.exports = {
 name: "load-backup",
 aliases: ["load-server-backup", "lbackup", "l-backup", "backup-load"],
 description: "Load server backup",
 category: "Moderation",
 timeout: 60000,
 usage: "load-backup <backup id>",
 run: async (client, message, args) => {
  try {
   if (!message.guild.me.permissions.has("ADMINISTRATOR")) {
    return client.createError(message, `${client.bot_emojis.error} | I don't have premission to load backups! I need \`ADMINISTRATOR\` permission!`);
   }
   if (!message.member.permissions.has("ADMINISTRATOR")) {
    return client.createError(message, `${client.bot_emojis.error} | You don't have permission to load backups! You need \`ADMINISTRATOR\` permission!`);
   }
   const backupID = args.join(" ");
   if (!backupID) {
    return client.createError(message, `${client.bot_emojis.error} You need to enter backup ID!`);
   }
   try {
    client.backupManager
     .fetch(backupID)
     .then(() => {
      const msg = new MessageEmbed() // Prettier
       .setColor("RED")
       .setAuthor({ name: "Warning!" })
       .setDescription(":warning: | All the server channels, roles, and settings will be cleared. Do you want to continue? Send `-confirm` or `cancel`!")
       .setFooter("You have 15s to reply!", message.author.displayAvatarURL());
      message.reply({ embeds: [msg] });
      const filter = (m) => (m.author.id === message.author.id && m.content.includes("-confirm")) || (m.author.id === message.author.id && m.content.includes("cancel"));
      const collector = message.channel.createMessageCollector({ filter, time: 15000, max: 1 });
      collector.on("collect", (m) => {
       collector.stop();
       if (m.content == "-confirm") {
        const wait = new MessageEmbed() // Prettier
         .setColor("#5865f2")
         .setDescription(`${client.bot_emojis.loading} | Please wait... I'm loading server backup! It may even take a few minutes!`);
        message.channel.send({ embeds: [wait] });
        client.backupManager
         .load(backupID, message.guild)
         .then(() => {
          return message.author.send("Backup loaded successfully!");
         })
         .catch((err) => {
          if (err === "No backup found") {
           return client.createError(message, `${client.bot_emojis.error} | No backup found for ID \`${backupID}\`!`);
          } else {
           const error = new MessageEmbed()
            .setColor("RED")
            .setTitle(`${emojis.error} A wild error appeared!`)
            .setDescription(`>>> \`\`\`${err.toString().slice(0, 1000) || `Something went wrong... ${client.bot_emojis.sadness}`}\`\`\``);
           return message.author.send({ embeds: [error] });
          }
         });
       } else {
        return client.createError(message, `${client.bot_emojis.error} | Loading backup cancelled!`);
       }
      });

      collector.on("end", (collected, reason) => {
       if (reason === "time") return client.createError(message, `${client.bot_emojis.error} | Command timed out! Please try again!`);
      });
     })
     .catch((err) => {
      console.log(err);
      return client.createError(message, `${client.bot_emojis.error} | No backup found for ID \`${backupID}\`!`);
     });
   } catch (e) {}
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
