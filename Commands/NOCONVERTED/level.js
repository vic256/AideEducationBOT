const Discord = require("discord.js");
const botconfig = require("../Config/botconfig.json");
let xp = require("../Db/xp.json");
let coins = require("../Db/coins.json");

module.exports.run = async (bot, message, args) => {

  if(!xp[message.author.id]){
   xp[message.author.id] = {
     xp: 1,
     level: 1
  };
}
  let curxp = xp[message.author.id].xp;
  let curcoins = coins[message.author.id].coins;
  let curlvl = xp[message.author.id].level;
  let nxtLvlXp = curlvl * 1000;
  let difference = nxtLvlXp - curxp;

  let lvlEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor('RED')
  .addField("Level : ", curlvl, true)
  .addField("Coins : ", curcoins, true)
  .setFooter(`${difference} XP avant le prochain lvl`, message.author.displayAvatarURL);

  message.channel.send(lvlEmbed)
}

module.exports.help = {
  name: "level"
}
//COMMANDE DESACTIVE : MODULE LEVEL DESACTIVE EN BETA POUR RAISON DE SECURITE