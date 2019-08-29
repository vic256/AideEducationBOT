const superagent = require("superagent");
const Discord = require("discord.js");
module.exports = {
  name: 'dog',
  description: 'Envois une photo de chien',
  aliases: ['chien'],
  cooldown: 5,
  //usage: '[TEXTE]',
  args: false,
  guildOnly: false,
  async execute(message, args, bot, embedfooter) {
  	let {body} = await superagent
	  .get(`https://random.dog/woof.json`)

	  let dogembed = new Discord.RichEmbed()
	  .setColor("#ff9900")
	  .setTitle("Dog :dog:")
	  .setImage(body.url);
	 message.channel.send(dogembed)
  },
};