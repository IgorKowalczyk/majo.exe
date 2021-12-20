const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
 name: "activities",
 description: "Start Discord activities",
 options: [
  {
   name: "channel",
   description: "Select the voice channel you want.",
   required: true,
   type: 2,
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
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
