const Discord = require('discord.js');
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"], partials: ["MESSAGE", "CHANNEL", "REACTION" ]});
require("dotenv").config();
const mongoose = require("mongoose");
const fs = require('fs')
const ProfileData = require('./models/profileSchema');



client.commands = new Discord.Collection();
client.events = new Discord.Collection();

const handler_req = {
    Discord,
    client,
    ProfileData,
    fs
}

const handlers = ['command_handler', 'event_handler'];

handlers.forEach(handler => {
    require(`./handlers/${handler}`)(handler_req)
})



mongoose.connect(process.env.MONGODB_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to the database!');
}).catch((err) => {
    console.log(err);
});




client.login(process.env.DISCORD_TOKEN);