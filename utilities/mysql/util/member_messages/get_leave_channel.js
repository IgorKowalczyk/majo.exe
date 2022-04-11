module.exports = async (client, guild, callback) => {
 const result = await client.database.query(`SELECT channelid AS res FROM \`leave\` WHERE guildid = ${guild.id}`);
 result.on("result", async function (row, index) {
  const row_id = row.res;
  if (!row_id) return callback(null);
  const channel = await guild.channels.fetch(row_id).catch(() => {});
  if (!channel) {
   await client.database.query(`DELETE FROM leave WHERE guildid = ${guild.id}`);
   return callback(null);
  }
  return callback(channel);
 });
};
