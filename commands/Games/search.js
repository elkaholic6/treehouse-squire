const profileModel = require("../../models/profileSchema");
const searchCooldownSchema = require('../../models/searchCooldownSchema');
const humanizeTime = require('../../globalFunctions/humanizeTime');

module.exports = {
    name: "search",
    description: "search for some tokens!",
    async execute(message, args, client, Discord, ProfileData, user, userQuery, rouletteCooldownData, workCooldownData, searchCooldownData, duckCooldownData) {
        const checkCooldown = async () => {
            const now = Date.now();
            const conditional = {
                expires: {
                    $lt: now
                },
                current: true
            }     
            const results = await searchCooldownSchema.find(conditional)
            if(results && results.length) {
                await searchCooldownSchema.deleteMany({})
            }
            setTimeout(checkCooldown, 1000)
        }
    
    
        const current_time = Date.now();

        if(!searchCooldownData && message.channel.id === '971788652722126958') {


            const location = [
                "guitar case",
                "chest",
                "piano bench",
                "bucket",
                "drawer",
                "abandoned car",
                "Sam's underwear",
                "Under the fridge",
                "wolf's den",
                "Wyatt's underwear",
                "Jennifer Aniston's bikini",
                "pineapple under the sea",
                "toddler sized shark cage"
            ];

            const chosenLocations = location.sort(() => Math.random() - Math.random()).slice(0, 3);
 
            const filter = ({author, content}) => message.author == author && chosenLocations.some((location) => location.toLowerCase() == content.toLowerCase());

            const collector = message.channel.createMessageCollector({filter, max: 1, time: 60000});

            const earnings = Math.floor(Math.random() * (500 - 100 + 1)) + 100; //(MAX - MIN + 1) + MIN

            collector.on('collect', async (m) => {
                const randNumber = Math.floor(Math.random() * 3) + 1;
                console.log(randNumber);
        
                if(randNumber === 1) {
                    message.channel.send(`<@${message.author.id}>, you found ${earnings} tokens!`);
                    await profileModel.findOneAndUpdate(
                    {
                        userID: message.author.id,
                    },
                    {
                        $inc: {
                            coins: earnings,
                        },
                    });
                } else if(randNumber === 2){
                    message.channel.send(`Awe shucks! <@${message.author.id}>, you lost ${earnings} tokens..`);
                    await profileModel.findOneAndUpdate(
                    {
                        userID: message.author.id,
                    },
                    {
                        $inc: {
                            coins: -earnings,
                        },
                    });
                } else {
                    message.channel.send(`Hmm.. <@${message.author.id}>, I guess there isn't anything here.`);
                }
            });

            collector.on('end', (collected, reason) => {
                if(reason == "time"){
                    message.channel.send(`<@${message.author.id}>, You ran out of time...`);
                } 
            });

            message.channel.send(`<@${message.author.id}> Which location would you like to search?\n Type the location in this channel\n\`${chosenLocations.join('`\n`')}\``);
            checkCooldown();
        };
        if(message.channel.id !== '971788652722126958') {
            return message.reply('The command cannot be used in this channel. Go to <#971788652722126958> ')
        };
        if (searchCooldownData && searchCooldownData.expires > current_time) {
            checkCooldown();

            return message.reply(`** 🚫 ${message.author.username}**, you must wait ${humanizeTime.millisToMinutesAndSeconds((searchCooldownData.expires) - current_time)} before you can ${this.name} again.`);
        }; 
        if (searchCooldownData && searchCooldownData.expires < current_time) {
            checkCooldown();

            return message.reply(`** 🚨 ${message.author.username}** I'm sorry, did you say you want to search for something? Please type that command again...`);
        };  
    }
}
