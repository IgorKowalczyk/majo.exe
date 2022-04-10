const create_welcome_card = require("../../../utilities/cards/welcome.js");
const get_welcome_channel = require("../../../utilities/mysql/util/member_messages/get_welcome_channel.js");
const server_stats = require("../../../utilities/mysql/util/server_stats/join.js");

module.exports = async (client, member) => {
 try {
  if (!member) return;
  if (!member.guild) return;
  if (!member.guild.available) return;
  await server_stats(client, member.guild);
  await get_welcome_channel(client, member.guild, function (channel) {
   if (!channel) return;
   create_welcome_card(client, member, channel);
  });
 } catch (err) {
  console.log(err);
 }
};
