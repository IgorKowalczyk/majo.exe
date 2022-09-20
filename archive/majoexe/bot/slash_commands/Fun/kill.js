const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const deaths = ["[NAME1] ran over [NAME2] with a School Bus! :bus:", "[NAME1] poisoned [NAME2]’s candy bar", "[NAME2] swallowed a grenade", "[NAME1] sent John Wick to kill [NAME2]!", "[NAME1] pressed Ctrl+Alt+Del deleting [NAME2] from the Universe!", "[NAME1] threw the ban hammer at [NAME2] for spamming", "[NAME2] stepped on a lego brick"];

module.exports = {
 name: "kill",
 description: "🔪 Kill a user for everything he did",
 usage: "/kill <user>",
 category: "Fun",
 options: [
  {
   name: "user",
   description: "User to kill",
   required: true,
   type: 6,
  },
 ],
 run: async (client, interaction, args) => {
  try {
   const member = interaction.guild.members.cache.get(args[0]);
   if (interaction.user === member || interaction.user == member) {
    return client.createSlashError(interaction, `${client.bot_emojis.error} | You can't kill yourself...`);
   }
   const pickeddeath = deaths[Math.floor(Math.random() * deaths.length)];
   const change1 = pickeddeath.replace("[NAME1]", "<@" + interaction.user + ">");
   const change2 = change1.replace("[NAME2]", "<@" + member + ">");
   (async () => {
    const response = await fetch("https://nekos.life/api/v2/img/slap");
    const body = await response.json();
    const embed = await new MessageEmbed() // Prettier
     .setColor("RANDOM")
     .setAuthor({
      name: `Tombstone of ${interaction.user.username}!`,
      iconURL: interaction.user.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     })
     .setFooter({
      text: `Requested by ${interaction.user.username}`,
      iconURL: interaction.user.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     })
     .setImage(body.url)
     .setDescription(`>>> ${change2}${Math.floor(Math.random() * 100 + 1) == 1 ? "\n||I want to kill myself ;~;||" : ""}`);
    interaction.followUp({ embeds: [embed] });
   })();
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
