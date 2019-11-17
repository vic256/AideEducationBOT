const Discord = require("discord.js");
module.exports = {
  name: 'example',
  description: 'Description',
  aliases: ['example2'],
  cooldown: 5,
  usage: '[USAGE]', //NE PAS SPECIFIER LA COMMANDE
  args: false,
  guildOnly: false,
  execute(message, args, bot, embedfooter) {
  	//Code
  },
};
