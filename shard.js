const Discord = require("discord.js");
const config = require("./config");
const token = config.token;

const client = new Discord.ShardingManager('./index.js', {
 token: token
});
const shards = 20;
client.spawn(shards, 15000, false);