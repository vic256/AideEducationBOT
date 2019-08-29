const shorten = require('isgd');
const Discord = require("discord.js");
module.exports = {
  name: 'shorten',
  description: 'Faire parler le bot (Commande Admin)',
  aliases: ['link', 'isgd'],
  cooldown: 15,
  usage: '[URL] [TEXTE - Optionnel]',
  args: true,
  guildOnly: false,
  execute(message, args, bot, embedfooter) {
      if (!args[1]) {
        shorten.shorten(args[0], function(res) {
          if (res.startsWith('Error:')) return message.channel.send('<:no:556392374172123137> **URL non valide !L**');
          message.channel.send(`**<${res}>**`);
        })
      } else {
        shorten.custom(args[0], args[1], function(res) {
          if (res.startsWith('Error:')) return message.channel.send(`<:no:556392374172123137> Une erreur a été rencontré... \n **${res}**`);
          message.channel.send(`**<${res}>**`);
        })
      }

  },
};