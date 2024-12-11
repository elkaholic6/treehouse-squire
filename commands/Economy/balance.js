const { EmbedBuilder } = require('discord.js');


module.exports = {
    name: "balance",
    aliases: ["bal", "bl"],
    permissions: [],
    description: "Check the user balance",
    async execute(message, args, client, Discord, ProfileData, user, userQuery) {
        if(message.channel.id === '1315515373361037312') {
            const embed = new EmbedBuilder()
            .setTitle(`Your wallet balance`)
            .setColor('#d7a715')
            .setAuthor({name: message.author.username, url: message.author.avatarURL()})
            .setDescription(`${user.coins} 🪙`)
            
            await message.channel.send({ embeds: [embed] });
        } else {
            return message.reply('The command cannot be used in this channel. Go to <#1315515373361037312> ')
        }
    },
};
