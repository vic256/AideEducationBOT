const Discord = require("discord.js");
module.exports = {
  name: 'mpserv',
  description: 'Envois un message privé a tout le serveur (Commande admin)',
  aliases: ['mpall'],
  cooldown: 5,
  usage: '[SERVEUR ID] [TEXTE]',
  args: true,
  guildOnly: true,
  execute(message, args, bot, embedfooter) {
  	if(message.author.id === "316450218440654849") {
        message.delete()
        let msgp = message.content.split(' ').slice(2).join(' ');
        //var guildmp = args[2]
        bot.guilds.get(args[0]).members.map(member => member.send(msgp))
    }
  },
};