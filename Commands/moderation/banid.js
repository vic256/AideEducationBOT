const Discord = require("discord.js");
const errorembed = require("../../Fonctions/errorembed.js")
module.exports = {
  name: 'banid',
  description: 'Bannir un utilisateur avec son identifiant',
  aliases: ['hackban'],
  cooldown: 5,
  usage: '[UTILISATEUR] [RAISON]',
  args: true,
  guildOnly: true,
  execute(message, args, bot, embedfooter) {
      /*if (!message.guild.bot.user.hasPermission("BAN_MEMBERS")) {
       return message.channel.send(`<:no:556392374172123137>  |  ${message.author.username}, j'ai besoin de la permission de **ban** pour effectuez ceci !`);
     }*/
  if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(errorembed("Vous n'avez pas la permission : BANNIR UN UTILISATEUR"));

     if(!args[0]) return message.channel.send(errorembed("L'utilisateur n'éxiste pas."));

     var reason = args.join(" ").slice(18) || "Aucune raison";

  message.guild.ban(args[0], reason).then(user => {
       message.channel.send(`<:yes:556392507899117570> | ${user.tag || user.id || args[0]}` + " à été ban");
       const ssancembed = require('../../Fonctions/sanctionslog.js');
       ssancembed (embedfooter, bot, "BanID", `${user.tag || user.id || args[0]}`, reason, message.author.username, "*Non définis*", "PERMANENT")
   })
        if(args[0].kickable) {
          return message.channel.send(errorembed("Je ne peux pas bannir cet utilisateur."))
        }

      if (!args[0]) {
           return message.channel.send(errorembed("."));
         }
  },
};