module.exports = {
 name: "member",
 description: "👋 Modify user on this server",
 usage: "/member ban <reason> | /member unban <reason> | /member kick <reason> | /member info <user>",
 category: "Moderation",
 container: true,
 options: [
  {
   name: "ban",
   description: "🔐 Ban user from this server",
   type: 1,
   usage: `/member ban <reason>`,
   category: "Moderation",
   orgin: "member",
   options: [
    {
     name: "user",
     description: "The user who should be banned",
     required: true,
     type: 6,
    },
    {
     name: "reason",
     description: "Reason for banning the user",
     required: false,
     type: 3,
    },
   ],
  },
  {
   name: "unban",
   description: "🔐 Unban user from this server",
   type: 1,
   usage: `/member unban <reason>`,
   category: "Moderation",
   orgin: "member",
   options: [
    {
     name: "user_id",
     description: "The user who should be unbanned",
     required: true,
     type: 3,
    },
    {
     name: "reason",
     description: "Reason for unbanning the user",
     required: false,
     type: 3,
    },
   ],
  },
  {
   name: "kick",
   description: "🔐 Kick user from this server",
   type: 1,
   usage: `/member kick <reason>`,
   category: "Moderation",
   orgin: "member",
   options: [
    {
     name: "user",
     description: "The user who should be kicked",
     required: true,
     type: 6,
    },
    {
     name: "reason",
     description: "Reason for kicking the user",
     required: false,
     type: 3,
    },
   ],
  },
  {
   name: "info",
   description: "👋 Check information about user",
   type: 1,
   usage: `/member info <user>`,
   category: "Moderation",
   orgin: "member",
   options: [
    {
     name: "user",
     description: "The user who should be checked",
     required: true,
     type: 6,
    },
   ],
  },
 ],
 run: async (client, interaction, args) => {
  try {
   if (args[0] == "ban") {
    require("./modules/member/ban")(client, interaction, args);
   } else if (args[0] == "unban") {
    require("./modules/member/unban")(client, interaction, args);
   } else if (args[0] == "kick") {
    require("./modules/member/kick")(client, interaction, args);
   } else if (args[0] == "info") {
    require("./modules/member/info")(client, interaction, args);
   } else {
    return client.createSlashError(interaction, `${client.bot_emojis.error} | You need to specify a vaild command!`);
   }
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
