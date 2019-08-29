const Discord = require("discord.js");
module.exports = {
  name: '8ball',
  description: 'Répond avec une réponse aléatoire',
  //aliases: ['essai', 'ccc'],
  cooldown: 5,
  usage: '[QUESTION]',
  args: true,
  guildOnly: false,
  execute(message, args, bot, embedfooter) {
        var result = Math.floor(Math.random() * 7);    
      if (result == 1) {
      message.reply(":8ball: | Oui ");
      } else if (result == 2) {
        message.reply(":8ball: | Non  ");
      } else if (result == 3) {
        message.reply(":8ball: | Plus ou moins");
      } else if (result == 4) {
      message.reply(":8ball: | Certainement ");
    } else if (result == 5) {
        message.reply(":8ball: | Certainement pas");
      } else if (result == 6) {
        message.reply(":8ball: | Sans doutes");
      } else if (result == 7) {
        message.reply(":8ball: | Peux être"); 
      }
  },
};