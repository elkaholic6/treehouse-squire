const mongoose = require('mongoose');

const Item = new mongoose.Schema({
    name: { type: String, require: true },
    aliases: { type: Array, default: [] },
    description: String,
    cost: { type: Number, required: true },
});


const profileSchema = new mongoose.Schema({
    userID: { type: String, require: true, unique: true},
    username: {type: String},
    serverID: { type: String, require: true},
    coins: { type: Number, default: 0},
    inventory: [Item],
})

const model = mongoose.model('ProfileModels', profileSchema);

module.exports = model;
