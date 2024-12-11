const { EmbedBuilder } = require('discord.js');

const fs = require('fs');

module.exports = {
  name: "buy",
  async execute(message, args, client, Discord, ProfileData, user, userQuery){
    if(message.channel.id === '1315515295196254338') {
      let shop_data = JSON.parse(Buffer.from(fs.readFileSync('./shop.json')).toString());

      let temp_items = Object.keys(shop_data.pages)
      .map(v => shop_data.pages[v].items);
      let items = [];

      temp_items.forEach(tmp_items => {
        items = items.concat(tmp_items)
      });
      let item = items.find(v => v.name === args[0]/*.toLowerCase()*/);

      if(!item){
        return message.channel.send("no item found");
      }

      if(item.cost > user.coins){
        return message.channel.send("you cannot afford this item");
      } else {
        await ProfileData.updateOne(userQuery,{
          "$inc": {
            "coins": -item.cost
          },
          "$push": {
            "inventory": item
          }
        });

        const embed = new EmbedBuilder()
        .setColor('#4ebe62')
        .setDescription(`You have just bought **${item.name}**!`)


        message.channel.send({ embeds: [embed] });
      };
    } else {
      return message.reply('The command cannot be used in this channel. Go to <#1315515295196254338> ')
    };
  }
};
