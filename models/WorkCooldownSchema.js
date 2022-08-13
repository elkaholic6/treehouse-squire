const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
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

const workCooldownSchema = mongoose.model('Work Cooldown', workSchema);

module.exports = workCooldownSchema;