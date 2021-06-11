module.exports = async (client) => {
 client.on("guildChannelPermissionsUpdate", (channel, oldPermissions, newPermissions) => {
  console.log(channel.name + "'s permissions updated! 3");
 });
};
