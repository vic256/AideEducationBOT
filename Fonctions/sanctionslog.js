const Discord = require("discord.js");
const bot = new Discord.Client();
function ssancembed(embedfooter, message, sanction, user, raison, auteur, infcomp, time) {
  	  const cclog = bot.channels.find('id', "537302652350889984")
  	  message.guild.channels.get('537302652350889984').send("Informations en chargement...").then(messagex => {
	  	  let ssanc = new Discord.RichEmbed()
		  	  .setColor('#ff0000')
		  	  .setTitle('**SANCTION --> ' + sanction + "**")
		      .setAuthor("AideEducation", 'http://vic256.zd.fr/files/AE/modemote.png')
		  	  .setURL('https://aideeducation.fr')
		  	  //.setDescription(`**Utilisateur:** ${user.username}\n**Sanction:** ${sanction}\n**Motif :** ${raison}\n**Auteur :** ${auteur}\n**Information complémentaire** ${infcomp}\n**Sanction ID:** ${messagex.id}`)  
		  	  .addField('Utilisateur ', user, true)
		  	  .addField('Sanction ', sanction, true)
		  	  .addField('Motif', raison, true)
		  	  .addField('Auteur', auteur, true)
		  	  .addField('Temps ', time, true)
		  	  .addField('Information complémentaire ', infcomp, true)
		  	  .addField('\n\nSanction ID ', messagex.id)
		  	  .setImage("https://vic256.zd.fr/files/AE/NotScreen.png")
		  	  .setFooter(embedfooter + "| Sanctions")
      messagex.edit(ssanc);
    });
  	  //console.log(ssanc)

	   
}
module.exports = ssancembed;

