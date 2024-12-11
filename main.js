const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js'); // Use updated imports
require("dotenv").config();
const mongoose = require("mongoose");
const fs = require('fs');
const ProfileData = require('./models/profileSchema');

// Initialize the client with updated intents and partials
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, // Replaces "GUILDS"
        GatewayIntentBits.GuildMessages, // Replaces "GUILD_MESSAGES"
        GatewayIntentBits.MessageContent // Needed if your bot reads message content
    ],
    partials: [
        Partials.Message, // Replaces "MESSAGE"
        Partials.Channel, // Replaces "CHANNEL"
        Partials.Reaction // Replaces "REACTION"
    ],
});

client.commands = new Collection();
client.events = new Collection();

const handler_req = {
    Discord: require('discord.js'),
    client,
    ProfileData,
    fs
};

const handlers = ['command_handler', 'event_handler'];

handlers.forEach(handler => {
    require(`./handlers/${handler}`)(handler_req);
});

// Connect to the MongoDB database
mongoose.connect(process.env.MONGODB_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to the database!');
}).catch((err) => {
    console.error(err);
});

// Log in to the bot
client.login(process.env.DISCORD_TOKEN);
