module.exports = {
    name: 'elijah',
    aliases: ["officervibe"],
    description: "this links to elijah's profile on spotify!",
    execute(message, args, client, Discord, ProfileData, user, userQuery){
        message.channel.send('https://open.spotify.com/artist/2AM2OobTahezifO1o3hvKJ?si=amsk_3pXSeaFXv3ALFIwsA');
    }
}