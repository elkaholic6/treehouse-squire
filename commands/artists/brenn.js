module.exports = {
    name: 'brenn',
    aliases: ["Bill-eguns"],
    description: "this links to brenn's profile on spotify!",
    execute(message, args, client, Discord, ProfileData, user, userQuery){
        message.channel.send('https://open.spotify.com/artist/74slMAMk8L6oMf6OhNyZ8Q?si=VrX2YGNuT22uoTGrCrC83Q');
    }
}