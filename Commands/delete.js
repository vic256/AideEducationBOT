const fs = require('fs');
const Discord = require("discord.js");
module.exports = {
  name: 'moduledelete',
  description: 'Faire parler le bot (Commande Admin)',
  //aliases: ['essai', 'ccc'],
  cooldown: 5,
  usage: '[MODULE]',
  args: true,
  guildOnly: false,
  execute(message, args, bot, embedfooter) {
  	if (message.author.id !== '316450218440654849') {
    return message.channel.send("**<:no:556392374172123137>  Seul le créateur du bot a accès a cette commande.**")
  	}
  let botmessage = args.join(" ");
  fs.unlink(```./${botmessage}```, function(err) {
  	if (err) { throw err; message;reply('Houston, we have a problems')}
	message.channel.send(`Le module \`${botmessage}\` a été supprimé.`)
  	console.log('Module supprimé avec succès');
  });
  },
};