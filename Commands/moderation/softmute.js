const ms = require("ms");
const Discord = require("discord.js");
module.exports = {
  name: 'softmute',
  description: 'Réduit au silence un utilisateur en l\'empechant aussi de voir les salons',
  aliases: ['smute', 'hmute'],
  cooldown: 5,
  usage: '[UTILISATEUR] [TEMPS] [RAISON]',
  args: true,
  guildOnly: true,
  async execute(message, args, bot, embedfooter) {
  	  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`<:no:556392374172123137>  |  ${message.author.username}, vous n'avez pas la permission d'utilisé cette commande !`);

  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.channel.send("<:no:556392374172123137> | Utilisateur non trouvé.");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("<:no:556392374172123137> | Je ne peux pas softmute un autre modo/admin!");
  let muterole = message.guild.roles.find(`name`, "Softmute");
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "Softmute",
        color: 0x4581E9,
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          VOICE_CONNECT: false,
          SPEAK: false,
          READ_MESSAGES: false,
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
  if(tomute.roles.has(muterole.id)) return message.channel.send("<:no:556392374172123137> | Cet utilisateur est déja softmute !");

  await(tomute.addRole(muterole.id));
  message.channel.send(`<:yes:556392507899117570><@${tomute.id}> a été softmute pendant ${ms(ms(mutetime))}`);
  const ssancembed = require('../../Fonctions/sanctionslog.js');
  ssancembed (embedfooter, bot, "SoftMute", tomute, rreason, message.author.username, "*Non définis*", mutetime)

  setTimeout(function() {
    tomute.removeRole(muterole.id);
  }, ms(mutetime));
  },
};