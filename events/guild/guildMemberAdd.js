const profileModel = require('../../models/profileSchema');


module.exports = async (client, discord, member) => {
    let profile = await profileModel.create({
            userID: member.id,
            userName: member.username,
            serverID: member.guild.id,
            coins: 0
        });
    profile.save();
}

