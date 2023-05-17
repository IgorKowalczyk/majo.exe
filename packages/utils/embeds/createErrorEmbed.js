import { EmbedBuilder } from "discord.js";

/**
 * @param {string} error The error to display.
 * @returns {EmbedBuilder}
 * @example const errorEmbed = createErrorEmbed("Error");
 * */
export function createErrorEmbed(error) {
 return new EmbedBuilder().setTitle("Error").setDescription(error).setColor("#EF4444").setTimestamp(new Date());
}
