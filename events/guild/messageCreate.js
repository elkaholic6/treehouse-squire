let rouletteCooldownSchema = require('../../models/rouletteCooldownSchema');
let workCooldownSchema = require('../../models/WorkCooldownSchema');
let searchCooldownSchema = require('../../models/searchCooldownSchema');
let duckCooldownSchema = require('../../models/duckCooldownSchema');



module.exports = async (Discord, client, ProfileData, message) => {
    const prefix = process.env.PREFIX;

    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) || client.commands.find((a) => a.aliases && a.aliases.includes(cmd));

    if (!command){
        return message.channel.send("This command doesn't exist!");
      } 



    let userQuery = { userID: message.author.id }

    let user = await ProfileData.findOne(userQuery);

    if(!user){
        let new_user = await ProfileData.create({
            userID: message.author.id,
            username: message.author.username,
            serverID: message.guild.id,
            coins: 0
        })
        new_user.save();
    };



    let rouletteCooldownData = await rouletteCooldownSchema.findOne(userQuery);

    if (!rouletteCooldownData && command.name === 'roulette' && message.channel.id === '1315510066971017286') {
        let cooldownDB = await rouletteCooldownSchema.create({
            userID: message.author.id,
            username: message.author.username,
            serverID: message.guild.id,
            expires: (message.createdTimestamp + (1000 * 60)),
            current: true,
        });
        cooldownDB.save();
    };

    let workCooldownData = await workCooldownSchema.findOne(userQuery);

    if (!workCooldownData && command.name === 'work' && message.channel.id === '1315510066971017286') {
        let cooldownDB = await workCooldownSchema.create({
            userID: message.author.id,
            username: message.author.username,
            serverID: message.guild.id,
            expires: (message.createdTimestamp + (1000 * 60 * 60)),
            current: true,
        });
        cooldownDB.save();
    };

    let searchCooldownData = await searchCooldownSchema.findOne(userQuery);

    if (!searchCooldownData && command.name === 'search' && message.channel.id === '971788652722126958' && message.channel.id === '1315510066971017286') {
        let cooldownDB = await searchCooldownSchema.create({
            userID: message.author.id,
            username: message.author.username,
            serverID: message.guild.id,
            expires: (message.createdTimestamp + (1000 * 60 * 60 * 4)),
            current: true,
        });
        cooldownDB.save();
    };

    let duckCooldownData = await duckCooldownSchema.findOne(userQuery);

    if (!duckCooldownData && command.name === 'duck' && message.channel.id === '971788652722126958' && message.channel.id === '1315510066971017286') {
        let cooldownDB = await duckCooldownSchema.create({
            userID: message.author.id,
            username: message.author.username,
            serverID: message.guild.id,
            expires: (message.createdTimestamp + (1000 * 60 * 60 * 24)),
            current: true,
        });
        cooldownDB.save();
    };

    command.execute(message, args, client, Discord, ProfileData, user, userQuery, rouletteCooldownData, workCooldownData, searchCooldownData, duckCooldownData);
};


