const Discord = require("discord.js");
const config = require("../Config/config.js");
function errorreport(error, command, message, bot) {
	const errorembeds = new Discord.RichEmbed()
      .setColor('#ff0000')
      .setTitle('Détéction d\'une erreur')
      .setAuthor('AE-Err', 'http://vic256.zd.fr/files/AE/modemote.png')
      .setDescription("**Une erreur est survenue !**\n**Serveur: **" + message.guild.name + "\n**Commande:** " + command + "\n**Message:** " + message.content + "\n**Erreur:** ```" + error + "```")
    let logchannel = bot.channels.find("id", config.server[config.log].log)
    logchannel.send(errorembeds)
    console.log('[AE] Error report.')
}
module.exports = errorreport; 