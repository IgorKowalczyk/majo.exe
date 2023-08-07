import { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } from "discord.js";

export default {
 name: "base64",
 description: "🔒 Encode or decode base64",
 type: ApplicationCommandType.ChatInput,
 cooldown: 5000,
 dm_permission: false,
 usage: "/base64 <encode/decode> <text>",
 options: [
  {
   name: "encode",
   description: "🗃️ Encode text to Base64 format",
   type: ApplicationCommandOptionType.Subcommand,
   usage: "/base64 encode <text>",
   options: [
    {
     name: "text",
     description: "The text to encode",
     required: true,
     type: ApplicationCommandOptionType.String,
    },
   ],
  },
  {
   name: "decode",
   description: "🗃️ Decode Base64 text",
   type: ApplicationCommandOptionType.Subcommand,
   usage: "/base64 decode <text>",
   options: [
    {
     name: "text",
     description: "The text to decode",
     required: true,
     type: ApplicationCommandOptionType.String,
    },
   ],
  },
 ],
 run: async (client, interaction, guildSettings) => {
  const type = interaction.options.getSubcommand();

  if (type === "encode") {
   const text = interaction.options.getString("text");

   if (text.length > 500) {
    const embed = new EmbedBuilder()
     .setColor("#EF4444")
     .setTimestamp()
     .setTitle("❌ Invalid text")
     .setDescription("> The text you provided is too long")
     .setFooter({
      text: `Requested by ${interaction.member?.user?.username}`,
      iconURL: interaction.member?.user?.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     });
    return interaction.followUp({ ephemeral: true, embeds: [embed] });
   }

   const encoded = Buffer.from(text).toString("base64");

   const embed = new EmbedBuilder()
    .setColor(guildSettings?.embedColor || client.config.global.defaultColor)
    .setTimestamp()
    .setTitle("🗃️ Encode Base64")
    .setDescription(`> \`${encoded}\``)
    .setFooter({
     text: `Requested by ${interaction.member?.user?.username}`,
     iconURL: interaction.member?.user?.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    });

   return interaction.followUp({ ephemeral: true, embeds: [embed] });
  } else if (type === "decode") {
   const text = interaction.options.getString("text");

   if (text.length > 500) {
    const embed = new EmbedBuilder()
     .setColor("#EF4444")
     .setTimestamp()
     .setTitle("❌ Invalid text")
     .setDescription("> The text you provided is too long")
     .setFooter({
      text: `Requested by ${interaction.member?.user?.username}`,
      iconURL: interaction.member?.user?.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     });
    return interaction.followUp({ ephemeral: true, embeds: [embed] });
   }

   const decoded = Buffer.from(text, "base64").toString("utf-8");

   const embed = new EmbedBuilder()
    .setColor(guildSettings?.embedColor || client.config.global.defaultColor)
    .setTimestamp()
    .setTitle("🗃️ Decode Base64")
    .setDescription(`> \`${decoded}\``)
    .setFooter({
     text: `Requested by ${interaction.member?.user?.username}`,
     iconURL: interaction.member?.user?.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    });

   return interaction.followUp({ ephemeral: true, embeds: [embed] });
  }
 },
};
