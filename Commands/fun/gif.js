const gifSearch = require("gif-search");
const Discord = require("discord.js");
module.exports = {
  name: 'gif',
  description: 'Rechercher un GIF',
  aliases: ['searchgif', 'sg'],
  cooldown: 5,
  usage: '[RECHERCHE]',
  args: true,
  guildOnly: false,
  execute(message, args, bot, embedfooter) {
    gifSearch.random(args[0]).then(
         gifUrl => {

         let randomcolor = ((1 << 24) * Math.random() | 0).toString(16) //Optional
         var embed = new Discord.RichEmbed()
             .setColor(`#${randomcolor}`)
             .setImage(gifUrl)
             .setFooter(embedfooter + "| GIF")
         message.channel.send(embed);
     });
  },
};