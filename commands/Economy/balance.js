
module.exports = {
    name: "balance",
    aliases: ["bal", "bl"],
    permissions: [],
    description: "Check the user balance",
    async execute(message, args, client, Discord, ProfileData, user, userQuery) {
        if(message.channel.id === '971789265258287176') {
            const embed = new Discord.MessageEmbed()
            .setTitle(`Your wallet balance`)
            .setColor('#d7a715')
            .setAuthor(message.author.username, message.author.avatarURL())
            .setDescription(`${user.coins} 🪙`)
            
            await message.channel.send({ embeds: [embed] });
        } else {
            return message.reply('The command cannot be used in this channel. Go to <#971789265258287176> ')
        }
    },
};
