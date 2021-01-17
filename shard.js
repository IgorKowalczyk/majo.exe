/* This is not used file, only for testing */
const { Discord } = require('discord.js');
const config = require("./config");
const token = config.token;

const client = new Discord('./index.js', {
 totalShards: 'auto',
 token: token
});

client.spawn();
