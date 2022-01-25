const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "poker-night",
 aliases: [],
 description: "Play Poker Night (by Discord)",
 category: "Social",
 usage: "poker-night",
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
     target_application_id: "755827207812677713",
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
      return client.createError(message, `${client.bot_emojis.error} | Something went wrong while creating Poker Night invite! Please try again later!`);
     }
     const row = new MessageActionRow() // Prettier
      .addComponents(
       new MessageButton() // Prettier
        .setLabel("Poker Night!")
        .setStyle("LINK")
        .setURL(`https://discord.com/invite/${invite.code}`)
      );
     const embed = new MessageEmbed() // Prettier
      .setDescription(`> [**Click on the button to start playing Poker Night**](https://discord.com/invite/${invite.code})`)
      .setColor("GREEN");
     message.channel.send({ embeds: [embed], components: [row] });
    });
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
