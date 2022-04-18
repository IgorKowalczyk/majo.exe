module.exports = {
 name: "emoji",
 description: "🎨 Manage emojis on this server",
 usage: "/emoji create <emoji name> <emoji url> | /emoji delete <emoji> | /emoji info <emoji> | /emoji steal <new emoji name> <emoji> | /emoji list",
 category: "Moderation",
 container: true,
 options: [
  {
   name: "create",
   description: "🎨 Create an emoji on this server",
   type: 1,
   usage: `/emoji create <emoji name> <emoji url>`,
   category: "Moderation",
   orgin: "emoji",
   options: [
    {
     name: "emoji_name",
     description: "The name of the emoji",
     required: true,
     type: 3,
    },
    {
     name: "emoji_url",
     description: "The URL of the emoji",
     required: true,
     type: 3,
    },
   ],
  },
  {
   name: "delete",
   description: "🎨 Delete an emoji from this server",
   type: 1,
   usage: `/emoji delete <emoji>`,
   category: "Moderation",
   orgin: "emoji",
   options: [
    {
     name: "emoji",

     description: "The name or id of the emoji",
     required: true,
     type: 3,
    },
   ],
  },
  {
   name: "info",
   description: "🎨 Get info about an emoji",
   type: 1,
   usage: `/emoji info <emoji>`,
   category: "Moderation",
   orgin: "emoji",
   options: [
    {
     name: "emoji",
     description: "The name or id of the emoji",
     required: true,
     type: 3,
    },
   ],
  },
  {
   name: "steal",
   description: "🎨 Steal an emoji from another server",
   type: 1,
   usage: `/emoji steal <emoji name> <emoji>`,
   category: "Moderation",
   orgin: "emoji",
   options: [
    {
     name: "new_name",
     description: "The name of the emoji",
     required: true,
     type: 3,
    },
    {
     name: "emoji",
     description: "The emoji to steal",
     required: true,
     type: 3,
    },
   ],
  },
  {
   name: "list",
   description: "🎨 List all emojis on this server",
   type: 1,
   usage: `/emoji list`,
   category: "Moderation",
   orgin: "emoji",
  },
 ],
 run: async (client, interaction, args) => {
  try {
   require(`./modules/emojis/${args[0]}.js`)(client, interaction, args);
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
