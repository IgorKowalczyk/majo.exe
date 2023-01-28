import Filter from "bad-words";
const filter = new Filter();
import { EmbedBuilder } from "discord.js";
import { CreateAvatar } from "../../util/functions.js";
import { fetchProfanity } from "@majoexe/util/src/settings/fetchProfanity.js";

export async function messageCreate(client, message) {
 if (message.content) {
  const guild = client.guilds.cache.get(message.guild.id);
  await fetchProfanity(guild.id);
  if (filter.isProfane(message.content)) {
   await message.delete();
   const embed = new EmbedBuilder()
    .setTitle("❗ Bad word detected")
    .setDescription(`<@${message.author.id}> message has been deleted for using a bad word.\n\n**Message ID**: \`${message.id}\`\n**User ID**: \`${message.author.id}\``)
    .setColor("#EF4444")
    .setTimestamp()
    .setFooter({ iconURL: CreateAvatar(client.user, "44"), text: `The filter was applied because message scanning was enabled on the server!` });
   await message.channel.send({ embeds: [embed] });
  }
 }
}
