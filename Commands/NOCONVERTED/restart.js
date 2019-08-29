const Discord = require("discord.js")
const token = require('../Config/token.json')
const fs = require("fs");
const commands = require('../index.js')
const qrcode = require("qrcode");
const tempy = require("tempy");
module.exports.run = async (bot,message,args) => {

  function relancement(message, bot, args) {
      message.reply("<:yes:556392507899117570>Ok je redémarre!") 

      bot.destroy();
      bot.login(token.token).then(() => {
          // We let the message author know we were able to ban the person
          message.reply(`[AB-SYS] - Houston ! Je suis lancé !`);
          commands(fs)
        }).catch(err => {
          // An error happened
          // This is generally due to the bot not being able to ban the member,
          // either due to missing permissions or role hierarchy
          message.reply('Houston on a un probleme...');
          // Log the error
          console.error(err);
        })
      }
  
    if(message.author.id === "316450218440654849") {
        relancement(message, bot, args)
  }else {
    if(message.author.id === "409781688214880281") {
      relancement(message, bot, args)
    } else {
      return message.reply("<:no:556392374172123137> | Il se trouve que ce bot est sécurisé :)")
      }
  
  }
}


module.exports.help = {
    name: "restart"
  }
  