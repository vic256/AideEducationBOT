const Discord = require("discord.js");
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
  if (!message.mentions.users.first()) return message.channel.send("<:no:556392374172123137> | Mentionné une ou plusieurs personne pour kick.")
  if(!rreason) return message.channel.send("<:no:556392374172123137> | Veuillez indiquez une raison.");
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(`<:no:556392374172123137>  |  ${message.author.username}, vous n'avez pas la permission d'utilisé cette commande !`)

    let ment = message.mentions.users;
    let text = []
    ment.forEach(m => {
        if (!message.guild.member(m).kickable) {
            message.channel.send("<:no:556392374172123137> | Une chose m'empeche de kick : "+m.username + ".");
        } else {
            message.guild.member(m).kick(rreason).then(() => {
                text.push(m.username)
            }).catch(err => message.channel.send("<:no:556392374172123137> | Une chose m'empeche de kick : "+m.username + "."))
        }
    });

    setTimeout(function() {
        if (text.length === 0) return;
        message.channel.send("<:yes:556392507899117570>" + text.join(", ")+" a été kick.", {split:true});
        const ssancembed = require('../Fonctions/sanctionslog.js');
        ssancembed (embedfooter, bot, "Kick", text, rreason, message.author.username, "*Non définis*", "*Kick*")
    }, 1000);
  },
};