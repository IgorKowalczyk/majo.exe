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
   if (args[0] == "create") {
    require("./modules/emojis/create")(client, interaction, args);
   }
   if (args[0] == "delete") {
    require("./modules/emojis/delete")(client, interaction, args);
   }
   if (args[0] == "info") {
    require("./modules/emojis/info")(client, interaction, args);
   }
   if (args[0] == "steal") {
    if (!args[1] || !args[2]) return interaction.channel.send("You need to provide an emoji name and url");
    let emoji_name = args[1];
    let emoji_url = args[2];
    let emoji = await interaction.channel.guild.createEmoji(emoji_url, emoji_name);
    interaction.channel.send(`Emoji created: ${emoji}`);
   }
   if (args[0] == "list") {
    let emojis = interaction.channel.guild.emojis.map((emoji) => emoji);
    interaction.channel.send(`Emojis: ${emojis}`);
   }
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
