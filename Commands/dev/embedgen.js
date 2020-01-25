const Discord = require("discord.js");
const botconfig = require("../../Config/botconfig.json")
const prefix = botconfig.prefix
module.exports = {
  name: 'embedgen',
  description: 'Permet de créer un embed',
  aliases: ['hackban'],
  cooldown: 5,
  usage: '[TITLE]§[DESCRIPTION]§<Field1 Title>§<Field1 Description>§<Field1 Inline>',
  args: true,
  guildOnly: true,
  execute(message, args, bot, embedfooter) {
  	const argse = message.content.slice(prefix.length).split("§"); //Define args
  	const argsf = args[1].split(" "); //Define args

  	var argsefieldlen = argse.length - 2;
  	argsefieldlen = argsefieldlen / 3;
  	var embedsfields = [];
  	var numberargs = 2
  	for(var x = 0; x < argsefieldlen; x++) {
  		console.log("execution")
  		embedsfields.push(
	  		{
	  			name:argse[x + numberargs],
	  			value:argse[x + numberargs + 1],
	  			inline:argse[x + numberargs + 2]
	  		}

  		)
  		numberargs = numberargs + 2;
  	}
  	console.log(argse)
  	console.log(`LOG INFO : ${argsefieldlen}`)

  	const embedgen = {
		color: 0x0099ff,
		title: argsf[0],
		description: argse[1],
		fields: embedsfields,
		timestamp: new Date(),
		footer: {
			text: 'AE',
		},
	};
	message.channel.send({embed: embedgen})
	console.log(embedgen)
  },
};