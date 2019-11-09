const ms = require("ms");
const Discord = require("discord.js");
module.exports = {
  name: 'unban',
  description: 'Débannir un utilisateur',
  aliases: ['deban'],
  cooldown: 5,
  usage: '[UTILISATEUR/ID] [RAISON]',
  args: true,
  guildOnly: true,
  execute(message, args, bot, embedfooter) {
    const reason = args.slice(1).join(' ');
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`<:no:556392374172123137>  |  ${message.author.username}, vous n'avez pas la permission d'utilisé cette commande !`)
        bot.unbanReason = reason;
        bot.unbanAuth = message.author;
        const user = args[0];
        if (!user) return message.reply("Vous devez spécifiez l'id de l'utilisateur.").catch(console.error);
        if (reason.length < 1) return message.reply('Vous devez spécifié une raison pour le débanissement.');
        message.guild.unban(user);
        message.reply(`<:yes:556392507899117570> Débanissement de <@${user}> avec succes.`)

  },
};