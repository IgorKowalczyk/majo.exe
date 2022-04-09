module.exports = {
 name: "backup",
 description: "🔐 Create or load backup for this server",
 usage: "/backup create| /backup load <backup id> | /backup info <backup id>",
 category: "Moderation",
 container: true,
 options: [
  {
   name: "create",
   description: "🔐 Create backup for this server",
   type: 1,
   usage: `/backup create`,
   category: "Moderation",
   orgin: "backup",
  },
  {
   name: "load",
   description: "🔐 Load backup for this server",
   type: 1,
   usage: `/backup load <backup id>`,
   category: "Moderation",
   orgin: "backup",
   options: [
    {
     name: "backup_id",
     description: "The ID of the backup to load",
     required: true,
     type: 3,
    },
   ],
  },
  {
   name: "info",
   description: "🔐 Get info about a backup",
   type: 1,
   usage: `/backup info <backup id>`,
   category: "Moderation",
   orgin: "backup",
   options: [
    {
     name: "backup_id",
     description: "The ID of the backup to get info about",
     required: true,
     type: 3,
    },
   ],
  },
  {
   name: "delete",
   description: "🔐 Delete a backup",
   type: 1,
   usage: `/backup delete <backup id>`,
   category: "Moderation",
   orgin: "backup",
   options: [
    {
     name: "backup_id",
     description: "The ID of the backup to delete",
     required: true,
     type: 3,
    },
   ],
  },
 ],
 run: async (client, interaction, args) => {
  try {
   if (args[0] == "create") {
    require("./modules/backup/create")(client, interaction, args);
   } else if (args[0] == "load") {
    require("./modules/backup/load")(client, interaction, args);
   } else if (args[0] == "info") {
    require("./modules/backup/info")(client, interaction, args);
   } else if (args[0] == "delete") {
    require("./modules/backup/delete")(client, interaction, args);
   }
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
