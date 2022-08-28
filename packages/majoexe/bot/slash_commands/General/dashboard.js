const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
 name: "dashboard",
 description: "💻 Get the link to your web panel",
 usage: "/dashboard",
 category: "General",
 container: true,
 options: [
  {
   name: "connect",
   description: "🔌 Connect the server to the web dashboard",
   type: 1,
   usage: `/dashboard connect`,
   category: "General",
   orgin: "dashboard",
  },
  {
   name: "link",
   description: "🔗 Display the dashboard link to your web panel",
   type: 1,
   usage: `/dashboard link`,
   category: "General",
   orgin: "dashboard",
  },
 ],
 run: async (client, interaction, args) => {
  try {
   if (!process.env.DOMAIN) {
    const embed = new MessageEmbed() // Prettier
     .setTitle(`${client.bot_emojis.error} Mheh!`)
     .setDescription("Our dashboard is not working at the moment, please try again later! We are sorry...")
     .setTimestamp()
     .setColor("RED")
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
   if (args[0] === "link") {
    const embed = new MessageEmbed() // Prettier
     .setTitle(`${client.bot_emojis.success} Yay!`)
     .setTimestamp()
     .setColor("GREEN")
     .setFooter({
      text: `Requested by ${interaction.user.username}`,
      iconURL: interaction.user.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     });

    const row = new MessageActionRow() // Prettier
     .addComponents(
      new MessageButton() // Prettier
       .setURL(process.env.DOMAIN)
       .setLabel("View Dashboard")
       .setStyle("LINK")
     );
    // interaction.followUp({ embeds: [embed] });
    if (interaction.member.permissions.has("MANAGE_GUILD")) {
     embed.setDescription(`>>> **Manage this server:** ${process.env.DOMAIN}/dashboard/${interaction.guild.id}\n**Main dashboard:** ${process.env.DOMAIN}`);
     row.addComponents(
      new MessageButton() // Prettier
       .setURL(`${process.env.DOMAIN}/dashboard/${interaction.guild.id}`)
       .setLabel("Manage this server")
       .setStyle("LINK")
     );
    } else {
     embed.setDescription("🔗 Our dashboard link: " + process.env.DOMAIN);
    }
    interaction.followUp({ embeds: [embed], components: [row] });
   } else if (args[0] === "connect") {
    const wait = new MessageEmbed() // Prettier
     .setColor("#5865f2")
     .setDescription(`${client.bot_emojis.loading} | Please wait... I'm connecting this server to dashboard`);
    interaction.followUp({ embeds: [wait] }).then((msg) => {
     (async () => {
      await interaction.guild.fetch();
      const embed = new MessageEmbed() // Prettier
       .setColor("GREEN")
       .setTitle(`${client.bot_emojis.success} Connected!`)
       .setDescription(`> The server has been connected! Now you can safely return to the dashboard and manage your server. If you have any further issues, please contact us using the [contact form on our dashboard!](${process.env.DOMAIN}/contact)`)
       .setThumbnail(interaction.guild.iconURL())
       .setFooter({
        text: `Requested by ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL({
         dynamic: true,
         format: "png",
         size: 2048,
        }),
       })
       .setTimestamp();
      const row = new MessageActionRow() // Prettier
       .addComponents(
        new MessageButton() // Prettier
         .setURL(process.env.DOMAIN)
         .setLabel("View Dashboard")
         .setStyle("LINK")
       );

      if (interaction.member.permissions.has("MANAGE_GUILD")) {
       row.addComponents(
        new MessageButton() // Prettier
         .setURL(`${process.env.DOMAIN}/dashboard/${interaction.guild.id}`)
         .setLabel("Manage this server")
         .setStyle("LINK")
       );
      }
      await msg.edit({ embeds: [embed], components: [row] });
     })();
    });
   }
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
