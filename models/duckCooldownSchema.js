const mongoose = require('mongoose');

const duckSchema = new mongoose.Schema({
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

const duckCooldownSchema = mongoose.model('Duck-Duck-Goose Cooldowns', duckSchema);

module.exports = duckCooldownSchema;