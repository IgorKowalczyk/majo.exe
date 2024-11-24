import { EmbedBuilder } from "discord.js";

export function createErrorEmbed(description: string, title?: string): EmbedBuilder {
 const embed = new EmbedBuilder() // prettier
  .setColor("#EF4444")
  .setDescription(`> ${description.slice(0, 2048)}${description.length > 2048 ? "..." : ""}`)
  .setTimestamp();
 if (title) embed.setTitle(`❌ ${title}`);

 return embed;
}
