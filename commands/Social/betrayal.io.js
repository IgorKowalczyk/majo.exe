const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "betrayal.io",
 aliases: [],
 description: "Play Betrayal.io",
 category: "Social",
 usage: "betrayal.io",
 run: async (client, message, args) => {
  try {
   const channel = message.member.voice.channel;
   if (!channel) {
    return client.createError(message, `${client.bot_emojis.error} | You must be connected to a voice channel to use this command!`);
   }
   fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
    method: "POST",
    body: JSON.stringify({
     max_age: 86400,
     max_uses: 0,
     target_application_id: "773336526917861400",
     target_type: 2,
     temporary: false,
     validate: null,
    }),
    headers: {
     Authorization: `Bot ${client.token}`,
     "Content-Type": "application/json",
    },
   })
    .then((res) => res.json())
    .then((invite) => {
     if (!invite.code) {
      return client.createError(message, `${client.bot_emojis.error} | Something went wrong while creating Betrayal.io invite! Please try again later!`);
     }
     const row = new MessageActionRow() // Prettier
      .addComponents(
       new MessageButton() // Prettier
        .setLabel("Betrayal.io!")
        .setStyle("LINK")
        .setURL(`https://discord.com/invite/${invite.code}`)
      );
     const embed = new MessageEmbed() // Prettier
      .setDescription(`> [**Click on the button to start playing Betrayal.io**](https://discord.com/invite/${invite.code})`)
      .setColor("GREEN");
     message.channel.send({ embeds: [embed], components: [row] });
    });
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
