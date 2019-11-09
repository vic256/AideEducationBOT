const cows = require('cows');
const rn = require('random-number');
const Discord = require("discord.js");
module.exports = {
  name: 'cow',
  description: 'Envois une vache',
  aliases: ['vache', 'meuh'],
  cooldown: 5,
  //usage: '[TEXTE]',
  args: false,
  guildOnly: false,
  execute(message, args, bot, embedfooter) {
    var options = {
          min: 0,
          max: cows().length - 1,
          integer: true
      }
      let random = rn(options);
      message.channel.sendCode("", cows()[random])
  },
};