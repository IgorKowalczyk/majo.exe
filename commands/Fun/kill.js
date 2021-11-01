const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const deaths = ["[NAME1] ran over [NAME2] with a School Bus! :bus:", "[NAME1] poisoned [NAME2]’s candy bar", "[NAME2] swallowed a grenade", "[NAME1] sent John Wick to kill [NAME2]!", "[NAME1] pressed Ctrl+Alt+Del deleting [NAME2] from the Universe!", "[NAME1] threw the ban hammer at [NAME2] for spamming", "[NAME2] stepped on a lego brick"];

module.exports = {
 name: "kill",
 aliases: [],
 description: "Murders a user",
 category: "Fun",
 usage: "kill <user>",
 run: async (client, message, args) => {
  try {
   const member = (await await message.mentions.members.first()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.guild.members.cache.find((r) => r.displayName.toLowerCase().includes() === args.join(" ").toLocaleLowerCase());
   if (!member) {
    return client.createError(message, `${client.bot_emojis.error} | You must mention someone to kill!\n\n**Usage:** \`${client.prefix} kill <user>\``);
   }
   if (message.author === member || message.member == member) {
    return client.createError(message, `${client.bot_emojis.error} | You can't kill yourself...`);
   }
   const pickeddeath = deaths[Math.floor(Math.random() * deaths.length)];
   const change1 = pickeddeath.replace("[NAME1]", "<@" + message.author + ">");
   const change2 = change1.replace("[NAME2]", "<@" + member + ">");
   (async () => {
    const response = await fetch("https://nekos.life/api/v2/img/slap");
    const body = await response.json();
    const embed = await new MessageEmbed() // Prettier
     .setColor("RANDOM")
     .setAuthor(
      `Tombstone of ${member.displayName}!`,
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     )
     .setFooter(
      `Requested by ${message.author.username}`,
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     )
     .setImage(body.url)
     .setDescription(`>>> ${change2}${(Math.floor(Math.random() * 100 + 1) == 1) ? "\n||I want to kill myself||" : ""}`);
    message.reply({ embeds: [embed] });
   })();
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
