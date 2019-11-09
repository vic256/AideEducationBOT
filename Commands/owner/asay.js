
const Discord = require("discord.js");
module.exports = {
  name: 'asay',
  description: 'Faire parler le bot (Commande Admin)',
  cooldown: 5,
  usage: '[TEXTE]',
  args: true,
  guildOnly: true,
  execute(message, args, bot, embedfooter) {
  	if(!message.author.id === '316450218440654849') return message.reply(`<:no:556392374172123137>  |  ${message.author.username}, seul le créateur du bot peux faire ceci !`);
  	let botmessage = args.join(" ");
  	message.delete().catch();
  	message.channel.send(botmessage);
  },
};