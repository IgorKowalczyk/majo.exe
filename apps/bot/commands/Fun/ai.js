import { createErrorEmbed } from "@majoexe/util/embeds";
import { shortenText } from "@majoexe/util/functions";
import { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } from "discord.js";

export default {
 name: "ai",
 description: "🤖 Talk with the Artificial Intelligence",
 type: ApplicationCommandType.ChatInput,
 cooldown: 10000,
 dm_permission: true,
 usage: "/ai chat <message>",
 options: [
  {
   name: "chat",
   description: "🤖 Chat with the Artificial Intelligence",
   type: ApplicationCommandOptionType.Subcommand,
   options: [
    {
     name: "message",
     description: "Message to send",
     type: ApplicationCommandOptionType.String,
     required: true,
     max_length: 256,
    },
   ],
  },
 ],
 run: async (client, interaction, guildSettings) => {
  const command = interaction.options.getSubcommand();
  const query = interaction.options.getString("message");

  if (!process.env.AI_TOKEN || process.env.AI_TOKEN === "" || !process.env.AI_DOMAIN || process.env.AI_DOMAIN === "") {
   return client.errorMessages.createSlashError(interaction, "❌ This command is currently disabled by the developer! Please try again later.");
  }

  if (command === "chat") {
   const waitEmbed = new EmbedBuilder().setColor(guildSettings?.embedColor || client.config.defaultColor).setDescription(`${client.config.emojis.loading} Generating AI response... This may take a while.`);
   const message = await interaction.followUp({ embeds: [waitEmbed] });

   const request = await fetch(`${process.env.AI_DOMAIN}/?message=${query}&token=${process.env.AI_TOKEN}`);

   if (!request || !request.ok) {
    const embed = createErrorEmbed("❌ Couldn't generate a response. Please try again later.");
    return message.edit({ embeds: [embed] });
   }
   const json = await request.json();

   if (!json || !json.message) {
    const embed = createErrorEmbed("❌ Couldn't generate a response. Please try again later.");
    return message.edit({ embeds: [embed] });
   }

   const content = json.message.length > 1900 ? json.message.slice(0, 1900) + "..." : json.message;

   const embed = new EmbedBuilder()
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setTimestamp()
    .setTitle(shortenText(query, 128))
    .setDescription(`>>> ${content}`)
    .setFooter({
     text: `Messages left today: ∞/50 • Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
     iconURL: interaction.member.user.displayAvatarURL({
      size: 256,
     }),
    });
   return message.edit({ embeds: [embed] });
  }
 },
};
