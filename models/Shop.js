const mongoose = require("mongoose");

const schema = mongoose.Schema({
    itemName: String,
    userID: String,
    guildID: String,
    userUsername: String,
    price: {
        type: Number,
        default: 100
    },
    itemTier: {
        type: Number,
        default: 1
    }
});

module.exports = mongoose.model("Shop", schema);