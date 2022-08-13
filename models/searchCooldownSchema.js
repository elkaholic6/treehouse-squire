const mongoose = require('mongoose');

const searchSchema = new mongoose.Schema({
    userID: { type: String, require: true},
    username: {type: String},
    serverID: { type: String, require: true},
    expires: {
        type: Date,
        require: true
    },
    current: {
        type: Boolean
    }
}, {
    timestamps: true
});

const searchCooldownSchema = mongoose.model('Search Cooldowns', searchSchema);

module.exports = searchCooldownSchema;