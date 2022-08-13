module.exports = {
    name: 'wyatt',
    aliases: ["elkaholic6"],
    description: "this links to wyatt's song on spotify!",
    execute(message, args, client, Discord, ProfileData, user, userQuery){
        message.channel.send('https://open.spotify.com/track/0oBhMBx3slhC3uDsiqAgKC?si=1fd2b007e3c04843');
    }
}