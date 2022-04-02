const { MessageEmbed } = require("discord.js");

module.exports = {
 name: "role",
 description: "🧩 Add/Remove role from user",
 usage: "/role add <role> <user> | /role remove <role> <user> | /role info <role>",
 category: "Moderation",
 container: true,
 options: [
  {
   name: "add",
   description: "🧩 Add role to user",
   type: 1,
   usage: `/role add <role> <user>`,
   category: "Moderation",
   orgin: "role",
   options: [
    {
     name: "role",
     description: "Role to add",
     required: true,
     type: 8,
    },
    {
     name: "user",
     description: "The user who should get the role",
     required: true,
     type: 6,
    },
    {
     name: "reason",
     description: "Reason for adding the role",
     required: false,
     type: 3,
    },
   ],
  },
  {
   name: "remove",
   description: "🧩 Remove role from user",
   type: 1,
   usage: `/role remove <role> <user>`,
   category: "Moderation",
   orgin: "role",
   options: [
    {
     name: "role",
     description: "Role to remove",
     required: true,
     type: 8,
    },
    {
     name: "user",
     description: "The user who should lose the role",
     required: true,
     type: 6,
    },
    {
     name: "reason",
     description: "Reason for adding the role",
     required: false,
     type: 3,
    },
   ],
  },
  {
   name: "info",
   description: "🧩 Check information about role",
   type: 1,
   usage: `/role info <role>`,
   category: "Moderation",
   orgin: "role",
   options: [
    {
     name: "role",
     description: "Role to get info for",
     required: true,
     type: 8,
    },
   ],
  },
 ],
 run: async (client, interaction, args) => {
  try {
   if (args[0] == "info") {
    require("./modules/roles/info")(client, interaction, args);
   } else if (args[0] == "add") {
    require("./modules/roles/add")(client, interaction, args);
   } else if (args[0] == "remove") {
    require("./modules/roles/remove")(client, interaction, args);
   }
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
