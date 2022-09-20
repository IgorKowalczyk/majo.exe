const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "activities",
 description: `🚀 Start Discord games and activities in voice channels`,
 usage: "/8ball <channel> <activity type>",
 category: "Fun",
 options: [
  {
   name: "channel",
   description: "Select the voice channel you want.",
   required: true,
   channel_types: [2],
   type: 7,
  },
  {
   name: "type",
   description: "Type of activity",
   required: true,
   type: 3,
   choices: [
    {
     name: "Betrayal.io",
     value: "bio",
    },
    {
     name: "Chess",
     value: "chess",
    },
    {
     name: "Fishington.io",
     value: "fio",
    },
    {
     name: "Poker Night",
     value: "pn",
    },
    {
     name: "YouTube Together",
     value: "yt",
    },
   ],
  },
 ],
 run: async (client, interaction, args) => {
  try {
   let activities = {
    bio: "773336526917861400",
    chess: "832012774040141894",
    fio: "814288819477020702",
    pn: "755827207812677713",
    yt: "755600276941176913",
   };
   let activities_names = {
    bio: "Betrayal.io",
    chess: "Chess in the Park",
    fio: "Fishington.io",
    pn: "Poker Night",
    yt: "YouTube Together",
   };
   let channel = client.channels.cache.get(args[0]);
   if (!channel) {
    return client.createSlashError(interaction, `❌ | Please select vaild voice channel!`);
   }
   if (channel.type !== "GUILD_VOICE") {
    return client.createSlashError(interaction, `❌ | Channel must be a voice channel!`);
   }
   fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
    method: "POST",
    body: JSON.stringify({
     max_age: 86400,
     max_uses: 0,
     target_application_id: activities[args[1]],
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
      return client.createSlashError(interaction, `❌ | Something went wrong while creating ${activities_names[args[1]]} invite! Please try again later!`);
     }
     const row = new MessageActionRow() // Prettier
      .addComponents(
       new MessageButton() // Prettier
        .setLabel(activities_names[args[1]])
        .setStyle("LINK")
        .setURL(`https://discord.com/invite/${invite.code}`)
      );
     const embed = new MessageEmbed() // Prettier
      .setDescription(`> [**Click on the button to start playing ${activities_names[args[1]]}**](https://discord.com/invite/${invite.code}) on ${channel}`)
      .setColor("GREEN");
     interaction.followUp({ ephemeral: false, embeds: [embed], components: [row] });
    });
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
