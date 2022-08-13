const mongoose = require('mongoose');

const cooldownSchema = new mongoose.Schema({
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

const rouletteCooldownInfo = mongoose.model('Roulette Cooldown', cooldownSchema);

module.exports = rouletteCooldownInfo;