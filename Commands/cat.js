const superagent = require("superagent");
const Discord = require("discord.js");
module.exports = {
  name: 'cat',
  description: 'Envois une image de chat',
  aliases: ['chat'],
  cooldown: 5,
  //usage: '[TEXTE]',
  args: false,
  guildOnly: false,
 async execute (message, args, bot, embedfooter) {
  	let {body} = await superagent
	  .get(`https://aws.random.cat/meow`)

	  let catembed = new Discord.RichEmbed()
	  .setColor("#ff9900")
	  .setTitle("Cat :cat:")
	  .setImage(body.file);

	  message.channel.send(catembed)
  },
};