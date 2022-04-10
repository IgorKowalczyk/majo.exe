const create_leave_card = require("../../../utilities/cards/leave.js");
const get_leave_channel = require("../../../utilities/mysql/util/member_messages/get_leave_channel.js");
const server_stats = require("../../../utilities/mysql/util/server_stats/leave.js");

module.exports = async (client, member) => {
 try {
  if (!member) return;
  if (!member.guild) return;
  if (!member.guild.available) return;
  await server_stats(client, member.guild);
  await get_leave_channel(client, member.guild, function (channel) {
   if (!channel) return;
   create_leave_card(client, member, channel);
  });
 } catch (err) {
  console.log(err);
 }
};
