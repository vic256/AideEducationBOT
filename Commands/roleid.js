const Discord = require("discord.js");
module.exports = {
  name: 'roleid',
  description: 'Donne l\'id de tout les roles',
  aliases: ['rid'],
  cooldown: 5,
  //usage: '[TEXTE]',
  args: false,
  guildOnly: true,
  execute(message, args, bot, embedfooter) {
  	if (!message.member.hasPermission("MANAGE_GUILDS")) return message.channel.send(`<:no:442815282906529792>  |  ${message.author.username}, vous n'avez pas la permission d'utiliser cette commande !`)
  let content = '';

  for (const role of message.guild.roles.values()) {
    if (role.id === message.guild.defaultRole.id) {
      continue;
    }

    content += role.name + ': ' + role.id + '\n';
  }

  return message.channel.send(content, { split: true });


  },
};