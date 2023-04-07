import { getAvatar } from "@majoexe/util/src/functions/getAvatar.js";
import { fetchProfanity } from "@majoexe/util/src/settings/fetchProfanity.js";
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
   iconURL: getAvatar(client.user, "44"),
   text: "The filter was applied because message scanning was enabled on the server!",
  });
 await message.channel.send({ embeds: [embed] });
}
