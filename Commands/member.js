const Discord = require("discord.js");
module.exports = {
  name: 'member',
  description: 'Te donne le nombre de membre du serveur',
  aliases: ['mc', 'membercount'],
  cooldown: 5,
  //usage: '[TEXTE]',
  args: false,
  guildOnly: true,
  execute(message, args, bot, embedfooter) {
  	var nobot = message.guild.members.filter(member => !member.user.bot).size;
  	var bot = message.guild.members.filter(member => member.user.bot).size;
  	var onlineCount = message.guild.members.filter(m => m.presence.status === 'online').size
    const memberembed = new Discord.RichEmbed()
  	  .setColor('RANDOM')
  	  .setTitle(message.guild.name)
  	  .setURL('https://aideeducation.fr')
  	  .addField('Utilisateurs total', message.guild.memberCount, true)
  	  .addField('Utilisateurs connectés', onlineCount, true)
  	  .addField('Humains', nobot, true)
  	  .addField('Bots', bot, true)
	message.channel.send(memberembed)
  },
};