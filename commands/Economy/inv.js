const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "items",
  async execute(message, args, client, Discord, ProfileData, user, userQuery) {
    if (message.channel.id === '1315515295196254338') {
      console.log("User inventory:", user.inventory); // Debug user inventory

      // Map and count items in inventory
      let temp_items = user.inventory.map(item => item.name);
      let items = [];

      temp_items.forEach(itemName => {
        if (!items.find(v => v.name === itemName)) {
          items.push({
            amount: temp_items.filter(temp_item => temp_item === itemName).length,
            name: itemName,
          });
        }
      });

      items = items.map(item => `**${item.name}** x\`${item.amount}\``);
      console.log("Processed items:", items); // Debug processed items

      const embed = new EmbedBuilder()
        .setColor('#7255ba')
        .setTitle("Inventory")
        .setAuthor({
          name: message.author.username || "Unknown User",
          iconURL: message.author.avatarURL() || undefined,
        })
        .setDescription(items.length > 0 ? items.join('\n\t') : "Your inventory is empty.");

      await message.channel.send({ embeds: [embed] });
    } else {
      return message.reply(
        'The command cannot be used in this channel. Go to <#1315515295196254338> '
      );
    }
  },
};
