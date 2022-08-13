//const { User } = require("discord.js");

module.exports = {
    name: 'sam',
    description: "sam's creepy lover",
    execute(message, args, client, Discord, ProfileData, user, userQuery) {
        const embed = new Discord.MessageEmbed()
        .setTitle(`You have just summoned Sam's Lover`)
        .setColor('#ea47a7')
        .setDescription(`Oh looky here 😜.. Sam, I am coming for you!`)
        .setImage('https://i0.wp.com/bloody-disgusting.com/wp-content/uploads/2017/06/spong2.jpg')
        .setURL('https://open.spotify.com/artist/53ffun4L2bUDLr04MnwJVb?si=Y_GV-xNcStKT53Qhpif2Gg')
        
        message.channel.send({ embeds: [embed] });
    },
}