const ms = require("ms");
const Discord = require("discord.js");
module.exports = {
  name: 'mute',
  description: 'Réduit au silence un utilisateur',
  aliases: ['chut'],
  cooldown: 5,
  usage: '[UTILISATEUR] [TEMPS]',
  args: true,
  guildOnly: true,
  async execute(message, args, bot, embedfooter) {
      if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`<:no:556392374172123137>  |  ${message.author.username}, vous n'avez pas la permission d'utilisé cette commande !`);

  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.channel.send("<:no:556392374172123137> | Utilisateur non trouvé.");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("<:stafftools:442824123996176385> | Je ne peux pas mute un autre staff.");
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
  let rreason = args.slice(2).join(" ")
  if(!rreason) return message.channel.send(`<:no:556392374172123137>  |  ${message.author.username}, merci de renseigner une raison !`);
  let mutetime = args[1];
  if(!mutetime) return message.channel.send("<:no:556392374172123137> | Vous devez spécifiez un temps!");
  if(tomute.roles.has(muterole.id)) return message.channel.send("<:no:556392374172123137> | Cet utilisateur est déja mute !");
  await(tomute.addRole(muterole.id));
  message.channel.send(`<:yes:556392507899117570><@${tomute.id}> a été mute pendant ${ms(ms(mutetime))}`);
  const ssancembed = require('../Fonctions/sanctionslog.js');
  ssancembed (embedfooter, message, "Mute", tomute, rreason, message.author.username, "*Non définis*", mutetime)

  setTimeout(function() {
    tomute.removeRole(muterole.id);
  }, ms(mutetime));
  },
};