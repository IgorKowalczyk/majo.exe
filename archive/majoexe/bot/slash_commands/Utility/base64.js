const { MessageEmbed } = require("discord.js");

module.exports = {
 name: "base64",
 category: "Utility",
 description: "🗃️ Encode or decode text to Base64 format",
 usage: "/base64 <encode/decode> <text>",
 container: true,
 options: [
  {
   name: "encode",
   description: "🗃️ Encode text to Base64 format",
   type: 1,
   usage: `/base64 encode <text>`,
   category: "Utility",
   orgin: "base64",
   options: [
    {
     name: "text",
     description: "The text to encode",
     required: true,
     type: 3,
    },
   ],
  },
  {
   name: "decode",
   description: "🗃️ Decode Base64 text",
   type: 1,
   usage: `/base64 decode <text>`,
   category: "Utility",
   orgin: "base64",
   options: [
    {
     name: "text",
     description: "The text to decode",
     required: true,
     type: 3,
    },
   ],
  },
 ],
 run: async (client, interaction, args) => {
  try {
   if (args[0] === "encode") {
    require("./modules/base64/encode")(client, interaction, args);
   } else if (args[0] === "decode") {
    require("./modules/base64/decode")(client, interaction, args);
   }
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
