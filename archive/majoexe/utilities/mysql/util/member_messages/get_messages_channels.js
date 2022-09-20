module.exports = async (client, guild, callback) => {
 client.database.query(`SELECT \`leave\`.\`guildid\` AS \`guild_id\`, \`leave\`.\`channelid\` AS \`leave\`, \`welcome\`.\`channelid\` AS \`welcome\` FROM \`leave\` INNER JOIN welcome ON \`leave\`.\`guildid\` = \`welcome\`.\`guildid\` WHERE \`leave\`.guildid = ${guild.id}`, async (err, result) => {
  if (!result) return callback(null);
  if (!result[0]) return callback(null);
  const welcome = result[0].welcome;
  const leave = result[0].leave;
  if (!welcome || !leave) return callback(null);
  const welcome_channel = await guild.channels.fetch(welcome).catch(() => {});
  const leave_channel = await guild.channels.fetch(leave).catch(() => {});
  if (!welcome_channel) {
   await client.database.query(`DELETE FROM welcome WHERE guildid = ${guild.id}`);
   return callback(null);
  }
  if (!leave_channel) {
   await client.database.query(`DELETE FROM welcome WHERE guildid = ${guild.id}`);
   return callback(null);
  }
  if (err) return console.log(err);
  callback({ welcome_channel, leave_channel });
 });
};
