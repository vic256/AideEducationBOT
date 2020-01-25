const Discord = require("discord.js");
const errorembed = require("../../Fonctions/errorembed.js")
module.exports = {
  name: 'say',
  description: 'Faire parler le bot',
  aliases: ['dit'],
  cooldown: 5,
  usage: '[TEXTE]',
  args: true,
  guildOnly: true,
  execute(message, args, bot, embedfooter) {
  	if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(errorembed("Vous n'avez pas la permission GéREZ LES MESSAGES."));
	  let botmessage = args.join(" ");
	  message.delete().catch();
	  message.channel.send(botmessage);
  },
};