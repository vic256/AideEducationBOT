const ms = require("ms");
const Discord = require("discord.js");
module.exports = {
  name: 'softunmute',
  description: 'Annule le softmute',
  aliases: ['sunmute'],
  cooldown: 5,
  usage: '[UTILISATEUR]',
  args: true,
  guildOnly: true,
  async execute(message, args, bot, embedfooter) {
      if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`<:no:556392374172123137>  |  ${message.author.username}, vous n'avez pas la permission d'utiliser cette commande !`);

      let tounmute = message.guild.member(message.mentions.users.first());
      if(!tounmute) return message.channel.send("<:no:556392374172123137>  | Utilisateur non trouvé.");
      let unmuterole = message.guild.roles.find(`name`, "Softmute");
      if (tounmute.id === message.author.id || tounmute.id === message.guild.ownerID || tounmute.bot) {
              message.channel.send(`<:no:556392374172123137>  |  ${message.author.username}, vous n'avez pas la permission d'utiliser cette commande sur cette personne !`);
              return message.delete();
            }


      if(!tounmute.roles.has(unmuterole.id)) return message.channel.send("<:no:556392374172123137> | Cet utilisateur n'est pas softmute !");
      await(tounmute.removeRole(unmuterole.id));
      message.channel.send(`<:yes:556392507899117570><@${tounmute.id}> a été unsoftmute`);

    
  },
};