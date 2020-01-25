const shorten = require('isgd');
const Discord = require("discord.js");
const errorembed = require("../../Fonctions/errorembed.js")
module.exports = {
  name: 'shorten',
  description: 'Réduit une URL',
  aliases: ['link', 'isgd'],
  cooldown: 15,
  usage: '[URL] [TEXTE - Optionnel]',
  args: true,
  guildOnly: false,
  execute(message, args, bot, embedfooter) {
      if (!args[1]) {
        shorten.shorten(args[0], function(res) {
          if (res.startsWith('Error:')) return message.channel.send(errorembed("URL non valide..."));
          message.channel.send(`**<${res}>**`);
        })
      } else {
        shorten.custom(args[0], args[1], function(res) {
          if (res.startsWith('Error:')) return message.channel.send(errorembed("⚠️ L'erreur sera traduite prochainement..." + res));
          message.channel.send(`**<${res}>**`);
        })
      }

  },
};