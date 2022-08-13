module.exports = {
  name: "items",
  async execute(message, args, client, Discord, ProfileData, user, userQuery){
    if(message.channel.id === '971788932402544701') {
      let temp_items = user.inventory.map(item => item.name);
      let items = [];
  
      temp_items.forEach(itemName => {
        if(!items.find(v => v.name === itemName)){
          items.push({
            amount: temp_items.filter(temp_item => temp_item === itemName).length,
            name: itemName
          });
        }
      });
  
      items = items.map(item => `**${item.name}** x\`${item.amount}\``)
  
      const embed = new Discord.MessageEmbed()
      .setColor('#7255ba')
      .setTitle("Inventory")
      .setAuthor(message.author.username, message.author.avatarURL())
      .setDescription(`${items.join('\n\t')}`)
  
      await message.channel.send({ embeds: [embed] });
    } else {
      return message.reply('The command cannot be used in this channel. Go to <#971788932402544701> ')
    };
  }
};
  