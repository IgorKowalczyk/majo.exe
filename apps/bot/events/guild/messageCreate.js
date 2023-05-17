import { fetchProfanity } from "@majoexe/util/settings/index.js";
import Filter from "bad-words";
import { EmbedBuilder } from "discord.js";

const filter = new Filter();

export async function messageCreate(client, message) {
 if (!message.content) return;
 const profanity = fetchProfanity(message.guild.id);
 if (!profanity) return;
 if (!filter.isProfane(message.content)) return;
 await message.delete();
 const embed = new EmbedBuilder()
  .setTitle("Bad word detected")
  .setDescription(`<@${message.author.id}> message has been deleted for using a bad word.\n\n**Message ID**: \`${message.id}\`\n**User ID**: \`${message.author.id}\``)
  .setColor("#EF4444")
  .setTimestamp()
  .setFooter({
   iconURL: client.user?.displayAvatarURL({
    dynamic: true,
    format: "png",
    size: 2048,
   }),
   text: "The filter was applied because message scanning was enabled on the server!",
  });
 await message.channel.send({ embeds: [embed] });
}
