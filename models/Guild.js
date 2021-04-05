const mongoose = require("mongoose");

const schema = mongoose.Schema({
    guildID: String,
    prefix: {
        type: String,
        default: process.env.PREFIX
    },
    welcomeChannel: {
        type: String,
        default: ''
    },
    levelUpChannel: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model("Guild", schema);