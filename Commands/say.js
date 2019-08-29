const Discord = require("discord.js");
module.exports = {
  name: 'say',
  description: 'Faire parler le bot',
  aliases: ['dit'],
  cooldown: 5,
  usage: '[TEXTE]',
  args: true,
  guildOnly: true,
  execute(message, args, bot, embedfooter) {
  	if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`<:no:556392374172123137>  |  ${message.author.username}, vous n'avez pas la permission **MANAGE_MESSAGES** pour effectuez ceci !`);
	  let botmessage = args.join(" ");
	  message.delete().catch();
	  message.channel.send(botmessage);
  },
};