const Discord = require("discord.js");
const errorembed = require("../../Fonctions/errorembed.js")

module.exports = {
  name: 'kick',
  description: 'Expulse l\'utilisateur du serveur',
  aliases: ['expulse'],
  cooldown: 5,
  usage: '[UTILISATEUR] [RAISON]',
  args: true,
  guildOnly: true,
  execute(message, args, bot, embedfooter) {
      let has_kick = message.member.hasPermission("KICK_MEMBERS");
  let rreason = args.join(" ").slice(22);
  if (!message.mentions.users.first()) return message.channel.send(errorembed("Mentionnez une personne à expulser.")) 
  if(!rreason) return message.channel.send(errorembed("Merci d'indiquer une raison.")) 
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(errorembed("Ta cru ? Vous n'avez pas la permission...")) 

    let ment = message.mentions.users;
    let text = []
    ment.forEach(m => {
        if (!message.guild.member(m).kickable) {
            message.channel.send(errorembed("Il n'est pas possible d'expulser " + m.username)) 
        } else {
            message.guild.member(m).kick(rreason).then(() => {
                text.push(m.username)
            }).catch(err => message.channel.send(errorembed("Je n'ai pas réussi à expluser " + m.username))) 
        }
    });

    setTimeout(function() {
        if (text.length === 0) return;
        message.channel.send("<:yes:556392507899117570>" + text.join(", ")+" a été kick.", {split:true});
        const ssancembed = require('../../Fonctions/sanctionslog.js');
        ssancembed (embedfooter, bot, "Kick", text, rreason, message.author.username, "*Non définis*", "*Kick*")
    }, 1000);
  },
};