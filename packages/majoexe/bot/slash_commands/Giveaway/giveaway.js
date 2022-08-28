const { MessageEmbed } = require("discord.js");

module.exports = {
 name: "giveaway",
 description: "🎉 Manage giveaway's",
 usage: "/giveaway <command>",
 category: "Giveaway",
 container: true,
 options: [
  {
   name: "start",
   description: "🎉 Start giveaway",
   type: 1,
   usage: `/giveaway start <time> <winners> <channel> <prize>`,
   category: "Giveaway",
   orgin: "giveaway",
   options: [
    {
     name: "time",
     description: "Time to end giveaway <d/h/m>",
     type: 3,
     required: true,
    },
    {
     name: "winners",
     description: "Winner count",
     type: 4,
     min_value: 1,
     max_value: 100,
     required: true,
    },
    {
     name: "channel",
     description: "Channel on which you want to create the giveaway",
     type: 7,
     channel_types: [0],
     required: true,
    },
    {
     name: "prize",
     description: "Prize of the giveaway",
     type: 3,
     required: true,
    },
   ],
  },
  {
   name: "drop",
   description: "🎉 Create a drop giveaway",
   type: 1,
   usage: `/drop-giveaway <winners> <channel> <prize>`,
   category: "Giveaway",
   orgin: "giveaway",
   options: [
    {
     name: "winners",
     description: "Winner count",
     type: 4,
     min_value: 1,
     max_value: 100,
     required: true,
    },
    {
     name: "channel",
     description: "Channel on which you want to create the giveaway",
     type: 7,
     channel_types: [0],
     required: true,
    },
    {
     name: "prize",
     description: "Prize of the giveaway",
     type: 3,
     required: true,
    },
   ],
  },

  {
   name: "end",
   description: "🎉 End a giveaway",
   type: 1,
   usage: `/giveaway end <giveaway id/giveaway prize>`,
   category: "Giveaway",
   orgin: "giveaway",
   options: [
    {
     name: "id-prize",
     description: "Giveaway ID or Giveaway Prize",
     type: 3,
     required: true,
    },
   ],
  },
  {
   name: "pause",
   description: "🎉 Pause a giveaway",
   type: 1,
   usage: `/giveaway pause <giveaway id/giveaway prize>`,
   category: "Giveaway",
   orgin: "giveaway",
   options: [
    {
     name: "id-prize",
     description: "Giveaway ID or Giveaway Prize",
     type: 3,
     required: true,
    },
   ],
  },
  {
   name: "resume",
   description: "🎉 Resume a giveaway",
   type: 1,
   usage: `/giveaway resume <giveaway id/giveaway prize>`,
   category: "Giveaway",
   orgin: "giveaway",
   options: [
    {
     name: "id-prize",
     description: "Giveaway ID or Giveaway Prize",
     type: 3,
     required: true,
    },
   ],
  },
  {
   name: "reroll",
   description: "🎉 Reroll a giveaway",
   type: 1,
   usage: `/giveaway reroll <giveaway id/giveaway prize>`,
   category: "Giveaway",
   orgin: "giveaway",
   options: [
    {
     name: "id-prize",
     description: "Giveaway ID or Giveaway Prize",
     type: 3,
     required: true,
    },
   ],
  },
 ],
 run: async (client, interaction, args) => {
  try {
   const arguments = args.slice(1);
   require(`./modules/${args[0]}`)(client, interaction, arguments);
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
