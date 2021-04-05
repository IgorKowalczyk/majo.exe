const mongoose = require("mongoose");

const schema = mongoose.Schema({
    userID: {
        type: String,
        required: true,
        unique: true
    },
    guildID: String,
    Premium: [String],  
    Tier: {
        type: String,
        default: "free"
    },
    admin: {
        type: Boolean,
        default: false
    },
    developer: {
        type: Boolean,
        default: false
    },
    userBio: {
        type: String,
        default: "The User Is Very Lonely"
    }
});

module.exports = mongoose.model("Premium", schema);