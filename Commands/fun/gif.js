const gifSearch = require("gif-search");
const Discord = require("discord.js");
const giphy = require('giphy-api')('k0t2AnD8lWceA8SFGJ2mQIcitQ4r2vyR');
const fetchGifs = require('fetch-gifs');
const request = require('request');
module.exports = {
  name: 'gif',
  description: 'Rechercher un GIF',
  aliases: ['searchgif', 'sg'],
  cooldown: 5,
  usage: '[RECHERCHE]',
  args: true,
  guildOnly: false,
  execute(message, args, bot, embedfooter) {
    let term = args.join(' ')
    term = encodeURI(term)
    request('http://api.giphy.com/v1/gifs/search?q='+ term + '&rating=r&api_key=k0t2AnD8lWceA8SFGJ2mQIcitQ4r2vyR', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        let content =  JSON.parse(body)
        let item = Math.floor(Math.random() * content.data.length)
        if(!content.data[item]) return message.reply("Oh la la ! J'ai cherché partout dans ma grande bibliothèque mais je ne trouve pas votre gif... :cry: ");
        let gif = content.data[item].images.fixed_height.url
        
        message.channel.send("", {
        embed: new Discord.RichEmbed()
          .setTitle("Recherche de gif")
          .setDescription("Recherche : " + term)
          .setImage(gif)
          .setFooter(embedfooter + " | GIF")
          .setColor("#fffff")
          });
        }
         })
  },
};