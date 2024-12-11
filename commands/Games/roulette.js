const profileModel = require('../../models/profileSchema');
const rouletteCooldownSchema = require('../../models/rouletteCooldownSchema');
const humanizeTime = require('../../globalFunctions/humanizeTime');
const { EmbedBuilder } = require('discord.js');


module.exports = {
    name: 'roulette',
    description: 'Play for a chance to win tokens or lose tokens... if you dare.',
    async execute(message, args, client, Discord, ProfileData, user, userQuery, rouletteCooldownData, workCooldownData, searchCooldownData, duckCooldownData) {
        let gambleAmount = args[0];
        const deleteFalseStart = async () => {
            const conditional = {
                current: true
            }
            const results = await rouletteCooldownSchema.find(conditional)
            if(results && results.length){
                await rouletteCooldownSchema.deleteMany({})
            }
        };
        if(gambleAmount % 1 != 0 || gambleAmount <= 0) { 
                deleteFalseStart();
                return message.channel.send('You must gamble a positive whole number less than or equal to 333 and greater than 0.');             
            
        } else if(gambleAmount >= 334)  {
                deleteFalseStart();
                return message.channel.send('Someone is feeling a little greedy, eh? 😈 Try a number less than or equal to 333'); 

        } else if (gambleAmount > ProfileData.coins) {
                deleteFalseStart();
                return message.channel.send("You don't have enough coins to gamble that amount.");
        } else { 
            // const updateCooldown = async () => {
            //     const userID = {
            //         userID: message.author.id
            //     };
            //     const results = await rouletteCooldownSchema.find(userID)
            //     if(results && results.length) {
            //         await rouletteCooldownSchema.updateMany(userID, {
            //             updatedAt: Date.now()
            //         })
            //     }
            //     setTimeout(updateCooldown, 1000)
            // }

            const checkCooldown = async () => {
                const now = Date.now();
                const conditional = {
                    expires: {
                        $lt: now
                    },
                    current: true
                }     
                const results = await rouletteCooldownSchema.find(conditional)
                if(results && results.length) {
                    await rouletteCooldownSchema.deleteMany({})
                }
                setTimeout(checkCooldown, 1000)
            }
            
        
            const current_time = Date.now();

            if (!rouletteCooldownData && message.channel.id === '1315510066971017286') {
                function shuffleChamber(array) {
                    let totalChamberAmount = array.length;
                    while (0 !== totalChamberAmount) { 
                        let randBullet = Math.floor(Math.random() * totalChamberAmount);
                        totalChamberAmount -= 1;
                        let tmp = array[totalChamberAmount];
                        array[totalChamberAmount] = array[randBullet];
                        array[randBullet] = tmp;
                    }
                    return array;
                    }

                let revolverChamber = [' click',  ' click',  ' boom',  ' click',  ' click',  ' click'];
                revolverChamber = shuffleChamber(revolverChamber);


                let multiplyGambleAmt = [
                    `${Math.floor(gambleAmount * 1.2)}`, 
                    `${Math.floor(gambleAmount * 1.4)}`, 
                    `${Math.floor(gambleAmount * 1.9)}`, 
                    `${Math.floor(gambleAmount * 2.5)}`, 
                    `${Math.floor(gambleAmount * 3.3)}`]


                const continueCommand = 'continue';
                const filter = ({author, content}) => message.author == author && continueCommand == content && revolverChamber[0] !== ' boom'; 

                const suspenseFunc = () => {
                    const embed = new EmbedBuilder()
                    .setDescription(`${message.author.username} is pulling the trigger...`)
                    message.channel.send({embeds: [embed]});
                    return;
                };

                const loserTimeout = () => {
                    const embed = new EmbedBuilder()
                    .setDescription(`💀 Oh no! ${message.author.username} You lost ${Math.floor(gambleAmount)} 🪙`);
                    message.channel.send({embeds: [embed]});
                    return;
                };

                const _loserTimeout = () => {
                    const embed = new EmbedBuilder()
                    .setDescription(`💀 Oh no! ${message.author.username} lost ${Math.floor((multiplyGambleAmt[0]) * 1.5)} 🪙`);
                    message.channel.send({embeds: [embed]});
                    return;
                };

                const winnerTimeout = () => {
                    const _embed = new EmbedBuilder()
                    .setDescription(`🥵 So far ${message.author.username} has earned ${multiplyGambleAmt[0]} 🪙\nWant to increase your winnings to ${multiplyGambleAmt[1]} 🪙? Type \`continue\` to pull the trigger again.`)
                    message.channel.send({embeds: [_embed]});
                    return;
                };

                const gameWinner = () => {
                    const embed4 = new EmbedBuilder()
                    .setDescription(`🤑 Congratulations! ${message.author.username} has won ${multiplyGambleAmt[1]} 🪙 for winning the game!`)
                    message.channel.send({ embeds: [embed4] });
                    return;
                };

                if(revolverChamber[0] === ' boom') {
                    suspenseFunc();
                    setTimeout(loserTimeout, 2000);
               
                    await profileModel.findOneAndUpdate(
                        {
                            userID: message.author.id,
                        },
                        {
                            $inc: {
                                coins: -(Math.floor(gambleAmount)),
                            },
                        });
                } else {
                    suspenseFunc();
                    setTimeout(winnerTimeout, 3000);

                    await profileModel.findOneAndUpdate(
                        {
                            userID: message.author.id,
                        },
                        {
                            $inc: {
                                coins: (multiplyGambleAmt[0]),
                            },
                        });
                    };



                const collector = message.channel.createMessageCollector({filter, max: 4, time: 120000});


                collector.on('collect', async (m) => {
                    revolverChamber.shift();          
                    if(revolverChamber[0] === ' boom') {
                        suspenseFunc();
                        setTimeout(_loserTimeout, 2000);

                        await profileModel.findOneAndUpdate(
                            {
                                userID: message.author.id,
                            },
                            {
                                $inc: {
                                    coins: -(Math.floor((multiplyGambleAmt[0]) * 1.5)),
                                },
                            });
                    } else if(revolverChamber.length === 2) {

                    collector.stop();
                    } else {
                        suspenseFunc();
                        setTimeout(winnerTimeout, 3000);

                        await profileModel.findOneAndUpdate(
                            {
                                userID: message.author.id,
                            },
                            {
                                $inc: {
                                    coins: (multiplyGambleAmt[1] - multiplyGambleAmt[0]),
                                },
                            });

                        multiplyGambleAmt.shift();
                    };
                
                });

                collector.on('end', async (collected) => {
                        if(collected.size === 4 && revolverChamber[0] !== ' boom'){
                            suspenseFunc();
                            setTimeout(gameWinner, 3000);
  
                            await profileModel.findOneAndUpdate(
                                {
                                    userID: message.author.id,
                                },
                                {
                                    $inc: {
                                        coins: (multiplyGambleAmt[1] - multiplyGambleAmt[0]),
                                    },
                                });
                        }
                        
                });
                // updateCooldown();
                checkCooldown();

            };
            if(message.channel.id !== '971788652722126958' && message.channel.id !== '1315510066971017286') {
                return message.reply('The command cannot be used in this channel. Go to <#971788652722126958> ')
            };

            if (rouletteCooldownData && rouletteCooldownData.expires > current_time) {
                // updateCooldown();
                checkCooldown();

                return message.reply(`** 🚫 ${message.author.username}**, you must wait ${humanizeTime.millisToMinutesAndSeconds((rouletteCooldownData.expires) - current_time)} before playing ${this.name} again.`);
            } 
            if (rouletteCooldownData && rouletteCooldownData.expires < current_time) {
                checkCooldown();

    
                return message.reply(`** 🚨 ${message.author.username}** Loading of gun initializing... Please run that command again.`);
            }        
        };  
    }
}


