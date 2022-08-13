module.exports = {
    name: 'jacob',
    aliases: ["yodadaddy"],
    description: "this links to jacob's profile on spotify!",
    execute(message, args, client, Discord, ProfileData, user, userQuery){
        message.channel.send('https://open.spotify.com/artist/0B2JDdsYKzFrqJO6hhJn2e?si=Wrz7KlebSpe5uZbZ501mQw');
    }
}