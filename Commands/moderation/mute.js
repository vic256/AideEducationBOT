const ms = require("ms");
const Discord = require("discord.js");
const errorembed = require("../../Fonctions/errorembed.js")
module.exports = {
  name: 'mute',
  description: 'Réduit au silence un utilisateur',
  aliases: ['chut'],
  cooldown: 5,
  usage: '[UTILISATEUR] [TEMPS] [RAISON]',
  args: true,
  guildOnly: true,
  async execute(message, args, bot, embedfooter) {
      if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(errorembed("Ta cru ? Vous n'avez pas la permission..."));

  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.channel.send(errorembed("Utilisateur inconnu..."));
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.channel.send(errorembed("Je ne peux pas mute un membre de l'équipe."))
  let muterole = message.guild.roles.find(`name`, "Muted");
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "Muted",
        color: 0x8cb4ff,
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
    let mutetime = args[1];
  if(!mutetime) return message.channel.send(errorembed("Merci d'indiquer le temps de la sanction"));
  let rreason = args.slice(2).join(" ")
  if(!rreason) return message.channel.send(errorembed("Merci d'indiquer une raison..."));
  if(tomute.roles.has(muterole.id)) return message.channel.send(errorembed("Cet utilisateur est déjà aux enfers... Le réduire au silence deux fois est inutile."));
  await(tomute.addRole(muterole.id));
  message.channel.send(`<:yes:556392507899117570><@${tomute.id}> a été mute pendant ${ms(ms(mutetime))}`);
  const ssancembed = require('../../Fonctions/sanctionslog.js');
  ssancembed (embedfooter, bot, "Mute", tomute, rreason, message.author.username, "*Non définis*", mutetime)

  setTimeout(function() {
    tomute.removeRole(muterole.id);
  }, ms(mutetime));
  },
};