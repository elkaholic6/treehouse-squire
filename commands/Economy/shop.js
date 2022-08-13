const fs = require('fs');
module.exports = {
  name: "shop",
  async execute(message, args, client, Discord, ProfileData, user, userQuery){
    if(message.channel.id === '971788932402544701') {
      let shop_data = JSON.parse(Buffer.from(fs.readFileSync('./shop.json')).toString());
      let index = (args[0] || "1");
      let page = shop_data.pages[index];

      if(!page) {
        return message.channel.send("no page found")
      }

      const embed = new Discord.MessageEmbed()
      .setTitle("Invisible Treehouse Marketplace")
      .setColor("#a51515")
      .setDescription("To purchase an item type: `!buy \<item name>\` \nTo see the items in your inventory type: `!items` \n\n**__Here are the items available:__**");


      for(let item of page.items){
        console.log(item);
        if('hidden' in item){
          if(!item.hidden){
            continue;
          }
        }
        embed.addField(`${item.name}`, `Description: \`${item.description || "None"}\`\nCost: \`${item.cost || "Null"}\` 🪙`);
      }

      await message.channel.send({ embeds: [embed] });
    } else {
      return message.reply('The command cannot be used in this channel. Go to <#971788932402544701>')
    };
  }
};
