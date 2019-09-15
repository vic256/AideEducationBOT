const Discord = require("discord.js");
const botconfig = require("../Config/botconfig.json");
function errorreport(error, command, message, bot) {
	const errorembeds = new Discord.RichEmbed()
      .setColor('#ff0000')
      .setTitle('Détéction d\'une erreur')
      .setAuthor('AE-Err', 'http://vic256.zd.fr/files/AE/modemote.png')
      .setDescription("**Une erreur est survenue !**\n**Serveur: **" + message.guild.name + "\n**Commande:** " + command + "\n**Message:** " + message.content + "\n**Erreur:** ```" + error + "```")
    let logchannel = bot.channels.find("id", botconfig.deverror)
    logchannel.send(errorembeds)
    console.log('[AE] Error report.')
}
module.exports = errorreport; 