module.exports = {
    name: "info",
    aliases: [], 
    permissions: [],
    description: "Info on all economy commands",
    async execute(message, args, client, Discord, ProfileData, user, userQuery, rouletteCooldownData, workCooldownData, searchCooldownData, duckCooldownData) {
        if(message.channel.id === '971791436594941993') {
            const embed = new Discord.MessageEmbed()
            .setTitle(`Economy Command Info:`)
            .setColor('#ffffff')
            .setDescription(`Treehouse Tokens 🪙 are the backbone of the Invisible Treehouse.
            \nThey are used to buy items from the marketplace and can be exchanged with others for goods and services.
            \nThere are a few different ways in which one can earn these tokens:
            \n
            \nIn <#971788652722126958>, type:
            \n\`!work\` To go to work for the treehouse once every hour.
            \n\`!roulette <number amount you would like to gamble>\` To play russian roulette. Can gamble up to 333 🪙. How far can you push your luck? 😈
            \n\`!search\` To search for items in different locations. Be careful though, some locations are a trap!
            \n\`!duck\` To play duck-duck-goose. 1 in 30 chance of winning but no risk involved.
            \n
            \nIn <#971788932402544701>, type:
            \n\`!shop\` To see the items available.
            \n\`!items\` To see the items you currently own.
            \n
            \nIn <#971789265258287176>, type:
            \n\`!bal\` To see your current balance.`)

            message.channel.send({ embeds: [embed] });
            
        };
        if(message.channel.id !== '971791436594941993') {
            return; 
        };
    },
};