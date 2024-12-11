const { EmbedBuilder } = require('discord.js');


const profileModel = require('../../models/profileSchema');
const duckCooldownSchema = require('../../models/duckCooldownSchema');
const humanizeTime = require('../../globalFunctions/humanizeTime');


module.exports = {
    name: "duck",
    aliases: [],
    permissions: [],
    description: "Enter for a chance to win the goose!",
    async execute(message, args, client, Discord, ProfileData, user, userQuery, rouletteCooldownData, workCooldownData, searchCooldownData, duckCooldownData) {
        const checkCooldown = async () => {
            const now = Date.now();
            const conditional = {
                expires: {
                    $lt: now
                },
                current: true
            }     
            const results = await duckCooldownSchema.find(conditional)
            if(results && results.length) {
                await duckCooldownSchema.deleteMany({})
            }
            setTimeout(checkCooldown, 1000)
        }
    
        const current_time = Date.now();

        if(!duckCooldownData && message.channel.id === '1315510066971017286'){        
            const assignedNumber = Math.floor(Math.random() * 30) + 1;
            const drawnNumber = Math.floor(Math.random() * 30) + 1;
            if(assignedNumber === drawnNumber) {
                const randomNumber = Math.floor(Math.random() * 5000) + 5000;
                const response = await profileModel.findOneAndUpdate({
                    userID: message.author.id,
                }, {
                    $inc: {
                        coins: randomNumber,
                    }
                });
                const embed = new EmbedBuilder()
                .setColor('#4CAF50')
                .setDescription(`${message.author.username}, you've been GOOSED and have been gifted \`${randomNumber}\` 🪙!!`)
                .setImage('https://i.pinimg.com/originals/62/df/a4/62dfa46d3f6d3db12ed4254ab1c46895.jpg')

                message.channel.send({ embeds: [embed] });

            } else {
            const embed = new EmbedBuilder()
            .setColor('#4CAF50')
            .setDescription(`${message.author.username}, you were not goosed...`)

            message.channel.send({ embeds: [embed] });
            }

        };

        if(message.channel.id !== '971788652722126958' && message.channel.id !== '1315510066971017286') {
            return message.reply('The command cannot be used in this channel. Go to <#971788652722126958> ')
        };

        if (duckCooldownData && duckCooldownData.expires > current_time) {
            checkCooldown();

            return message.reply(`** 🦆 ${message.author.username}**, sadly you must wait ${humanizeTime.millisToMinutesAndSeconds((duckCooldownData.expires) - current_time)} to have another chance at being goosed...`);
        }; 
        if (duckCooldownData && duckCooldownData.expires < current_time) {
            checkCooldown();


            return message.reply(`** 🚨 ${message.author.username}** Sorry, I wasn't ready to play duck-duck-goose... Please run that command again.`);
        }; 
        
    },
};
