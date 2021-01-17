const Discord = require("discord.js");
const config = require("./config");
const token = config.token;

const client = new Discord.ShardingManager('./index.js', {
 totalShards: 'auto',
 token: token
});

client.spawn();