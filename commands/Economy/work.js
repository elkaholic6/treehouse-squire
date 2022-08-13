const profileModel = require('../../models/profileSchema');
const workCooldownSchema = require('../../models/WorkCooldownSchema');
const humanizeTime = require('../../globalFunctions/humanizeTime');


module.exports = {
    name: "work",
    aliases: [], 
    permissions: [],
    description: "Work for coins",
    async execute(message, args, client, Discord, ProfileData, user, userQuery, rouletteCooldownData, workCooldownData, searchCooldownData, duckCooldownData) {
        const checkCooldown = async () => {
            const now = Date.now();
            const conditional = {
                expires: {
                    $lt: now
                },
                current: true
            }     
            const results = await workCooldownSchema.find(conditional)
            if(results && results.length) {
                await workCooldownSchema.deleteMany({})
            }
            setTimeout(checkCooldown, 1000)
        };
    
        const current_time = Date.now();


        if(!workCooldownData && message.channel.id === '971788652722126958') {
            const randomNumber = Math.floor(Math.random() * 250) + 100;
            const response = await profileModel.findOneAndUpdate({
                userID: message.author.id,
            }, {
                $inc: {
                    coins: randomNumber,
                }
            });

            const embed = new Discord.MessageEmbed()
            .setColor('#4rte11')
            .setDescription(`${message.author.username}, you started working again. You gain \`${randomNumber}\` 🪙: from your last work. Come back in 1 hour to claim another paycheck.`)

            message.channel.send({ embeds: [embed] });
            checkCooldown();
        };
        if(message.channel.id !== '971788652722126958') {
            return message.reply('The command cannot be used in this channel. Go to <#971788652722126958> ')
        };

        if (workCooldownData && workCooldownData.expires > current_time) {
            checkCooldown();

            return message.reply(`** 🚫 ${message.author.username}**, you must wait ${humanizeTime.millisToMinutesAndSeconds((workCooldownData.expires) - current_time)} before you can ${this.name} again.`);
        };
         
        if (workCooldownData && workCooldownData.expires < current_time) {
            checkCooldown();


            return message.reply(`** 🚨 ${message.author.username}** Oh so you CAN work, eh?  Just to be sure, type that command again...`);
        }  
    },
};