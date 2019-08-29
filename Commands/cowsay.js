const cowsay = require('cowsay');
const Discord = require("discord.js");
module.exports = {
  name: 'cowsay',
  description: 'Envois un message avec une vache',
  aliases: ['vachesay'],
  cooldown: 5,
  usage: '[TEXTE]',
  args: true,
  guildOnly: false,
  execute(message, args, bot, embedfooter) {
    let txt = message.content.split(' ').slice(1).join(' ');
    if (!txt) {
        return message.channel.send(`<:no:556392374172123137>  |  ${message.author.username}, message invalide !`);
    }
    message.channel.send(cowsay.say({
        text: txt,
        e: 'oO'
    }), {code: 'css'});
  },
};