module.exports = {
 name: "debug",
 description: "🎛️ View advanced information for devs about the bot",
 usage: "/debug <query>",
 category: "General",
 container: true,
 timeout: 5000,
 options: [
  {
   name: "query",
   required: true,
   description: "Thing to debug",
   type: 3,
   choices: [
    {
     name: "Debug bot permissions on this server",
     value: "bot",
    },
    {
     name: "Debug the server (host) where the bot is hosted",
     value: "host",
    },
    {
     name: "Debug the bandwitch on the bot hosting server",
     value: "bandwidth",
    },
    {
     name: "Debug the external packages that the bot uses",
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
   } else if (args[0] == "bandwidth") {
    require("./modules/debug_bandwidth")(client, interaction, args);
   }
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
