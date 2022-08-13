module.exports = {
    name: 'david',
    aliases: ["Davidthepimp"],
    description: "this links to david's profile on spotify!",
    execute(message, args, client, Discord, ProfileData, user, userQuery){
        message.channel.send('https://open.spotify.com/artist/7eJcXGIs4xrmzWcvn8akEE?si=EaN3yT9hSAeE3d2JVAL21Q');
    }
}