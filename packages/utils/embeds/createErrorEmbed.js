import { EmbedBuilder } from "discord.js";

/**
 * @param {string} description The error to display.
 * @param {string} title The title of the embed.
 * @returns {EmbedBuilder} The error embed.
 * @example const errorEmbed = createErrorEmbed("Error");
 * */
export function createErrorEmbed(description, title) {
 const embed = new EmbedBuilder() // prettier
  .setColor("#EF4444")
  .setDescription(`> ${description.slice(0, 2048)}${description.length > 2048 ? "..." : ""}`)
  .setTimestamp();
 if (title) embed.setTitle(`❌ ${title}`);

 return embed;
}
