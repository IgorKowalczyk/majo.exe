module.exports = {
 name: "debug",
 description: "🎛️ Debug bot",
 usage: "/debug <query>",
 category: "General",
 options: [
  {
   name: "query",
   required: true,
   description: "Thing to debug",
   type: 3,
   choices: [
    {
     name: "Debug permissions (in this server)",
     value: "bot",
    },
    {
     name: "Debug host (where the bot is hosted)",
     value: "host",
    },
    {
     name: "Debug dependencies (NPM packages)",
     value: "dependencies",
    },
   ],
  },
 ],
 run: async (client, interaction, args) => {
  try {
   if (args[0] == "bot") {
    require("./modules/debug_bot")(client, interaction, args);
   } else if (args[0] == "dependencies") {
    require("./modules/debug_dependencies")(client, interaction, args);
   } else if (args[0] == "host") {
    require("./modules/debug_host")(client, interaction, args);
   }
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
