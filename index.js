/*
AideEducation BOT
BETA 0.2
*/

//Define the configs files
const config = require("./Config/config.js")
const tokenfile = require("./Config/token.json");

//Define modules
const Discord = require("discord.js");
const fs = require("fs");

//Define prefix
const prefix = config.prefix

//Define client
const bot = new Discord.Client();

//Define Error Client Report
const errorembed = require("./Fonctions/errorembed.js")

//Event Handler
fs.readdir("./Events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./Events/${file}`);
    let eventName = file.split(".")[0];
    bot.on(eventName, event.bind(null, bot));
  });
});

//Define commands
bot.commands = new Discord.Collection();
bot.queue = new Map();

//Define categories & load commands
const categories = ['moderation', 'fun', 'general'];

categories.forEach(c => {
	const commandFiles = fs.readdirSync(`./Commands/${c}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./Commands/${c}/${file}`);
		bot.commands.set(command.name, command);
		console.log('[AE] - ' + file + ' charged in ' + c + ' !')
	}

})


//Define cooldowns
const cooldowns = new Discord.Collection();

//Execute command on message
bot.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return; //Chek if message contains prefix and if the author is a bot

	const args = message.content.slice(prefix.length).split(/ +/); //Define args
	const commandName = args.shift().toLowerCase(); //Define command name 

	const command = bot.commands.get(commandName) 
			|| bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName)); //Search command

	if (!command) return;  

	//Check the parameters of the command
	if (command.guildOnly && message.channel.type !== 'text') { 
		return message.channel.send(errorembed("Je ne peux pas éxectuter cette commande dans un salon privé."))
	}

	if (command.args && !args.length) {
		let reply = `Vous avez oublier les arguments, ${message.author} !`;

		if (command.usage) {
			reply += `\nUtilisez: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(errorembed(reply));
	}

	//Check cooldowns
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
      return message.channel.send(errorembed(`Merci d'attendre ${timeLeft.toFixed(1)} secondes avant d'éxécutez "${command.name}".`))
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
    	let embedfooter = "AideEducation BETA "
		command.execute(message, args, bot, embedfooter);
	} catch (error) {
		message.channel.send(errorembed("Une erreur est survenue lors de l'éxécution de la commande. Le support a été prévenu."));
    console.error(error);
    const errorreport = require('./Fonctions/errorlog.js');
    errorreport(error, commandName, message, bot)
	}
});

/*Badwords
bot.on('message', async message => {
  if(message.channel.type === 'dm') return;
  //Define embed
  const infraction = new Discord.RichEmbed()
	  .setColor('#ff0000')
	  .setTitle('Détéction d\'une infraction')
	  .setAuthor('AE-MOD', 'http://vic256.zd.fr/files/AE/modemote.png')
	  .setDescription(message.author + " a dit un mot pas gentil :cry:\nPour calmer les esprits voici une photo")
	  .setImage('http://vic256.zd.fr/files/AE/chat.jpg')
  //Define lists
  let banwords = require("./DataBase/words.json")
  let bwl1 = banwords.ListeL1
  let bwl2 = banwords.ListeL2
  let bwl3 = banwords.ListeL3
  let bwl4 = banwords.ListeL4

  //Define roles
  //let muterole = bot.guilds.get(botconfig.serverID).roles.find('id', botconfig.muteroleID)
  let muterole = bot.guilds.get(botconfig.serverID).roles.find(muterole => muterole.id === botconfig.muteroleID)

  //Check if the word is in one of the lists
  if (bwl4.some(x => message.content.toLowerCase().split(/\s+/).includes(x))) {     
    if(message.member.hasPermission('MANAGE_MESSAGES')) { message.reply('Surveillez votre language... L\'équipe doit être exemplaire !'); message.delete(message.author) } else {
    lvlembed(message.content, "N4", "Réduction au silence de 2H30")
    message.delete(message.author); message.channel.send(infraction); let member = message.member; member.addRole(muterole)
    setTimeout(function() {member.removeRole(muterole);}, 9000000);
    logam(message.author, "Mute 2H30", "N4", message.content)
    }
  } else if (bwl3.some(x => message.content.toLowerCase().split(/\s+/).includes(x))) {     
    if(message.member.hasPermission('MANAGE_MESSAGES')) { message.reply('Surveillez votre language... L\'équipe doit être exemplaire !'); message.delete(message.author) } else {
    lvlembed(message.content, "N3", "Réduction au silence de 1H30")
    message.delete(message.author); message.channel.send(infraction); let member = message.member; member.addRole(muterole)
    setTimeout(function() {member.removeRole(muterole);}, 5400000);
    logam(message.author, "Mute 1H30", "N3", message.content)
    }
  } else if (bwl2.some(x => message.content.toLowerCase().split(/\s+/).includes(x))) {     
    if(message.member.hasPermission('MANAGE_MESSAGES')) { message.reply('Surveillez votre language... L\'équipe doit être exemplaire !'); message.delete(message.author) } else {
    lvlembed(message.content, "N2", "Réduction au silence de 30Min")
    message.delete(message.author); message.channel.send(infraction); let member = message.member; member.addRole(muterole)
    setTimeout(function() {member.removeRole(muterole);}, 1800000);
    logam(message.author, "Mute 30Min", "N2", message.content)
    }
  } else if (bwl1.some(x => message.content.toLowerCase().split(/\s+/).includes(x))) {     
    if(message.member.hasPermission('MANAGE_MESSAGES')) { message.reply('Surveillez votre language... L\'équipe doit être exemplaire !'); message.delete(message.author) } else {
    lvlembed(message.content, "N1", "Avertissement MP")
    message.delete(message.author); message.channel.send(infraction); 
    logam(message.author, "Avertissement MP", "N1", message.content)
    }
  }

  //Logs embeds
  function logam(utilisateur, sanction, level, msg) {
    const logmsg = new Discord.RichEmbed()
    .setColor('#ff0000')
    .setTitle('**INFRACTION --> MOTS INTERDIT**')
    .setAuthor('AEMOD-LOG', 'http://vic256.zd.fr/files/AE/modemote.png')
    .setDescription(`**Utilisateur:** ${utilisateur}\n**Sanction:** ${sanction}\n**Message:** ${msg}`)  
    bot.channels.get(botconfig.sanctionlog).send(logmsg)
  }
  //Warn embds
  function lvlembed(msgc, level, sanction) {
    const lvlmsg = new Discord.RichEmbed()
      .setColor('#ff0000')
      .setTitle('Détéction d\'une infraction')
      .setAuthor('AE-MOD', 'http://vic256.zd.fr/files/AE/modemote.png')
      .setDescription("Vous avez utilisé un mot sur liste noire\n**Niveau:** "+ level + "\n**Message: **" + msgc + "\n**Sanction:** " + sanction + "\n\nSi vous pensez qu'il s'agit d'une erreur contactez notre équipe en message privé.")
      .addField('Rappel des niveaux :', "**Niveau 1 (N1):** Langage incorect - Avertissement MP\n**Niveau 2 (N2):** Insulte moyenne, langage très incorect - Mute 30Min\n**Niveau 3 (N3):** Insulte grave - Mute 1H30\n**Niveau 4 (N4):** Insule très grave, contenu sexuellement explicite - Mute 2H30")
      message.author.send(lvlmsg)
  }

}) */

//Bot login
bot.login(tokenfile.token);
