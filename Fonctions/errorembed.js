const Discord = require("discord.js");
const config = require("../Config/config.js");
function errorembed() {
	let errorlist = []
	for (var i = 0; i < arguments.length; i++) {
		errorlist.push("```diff\n- " + arguments[i] + "\n```\n")
	}
     let embed = new Discord.RichEmbed()
     	.setColor('#FF0000')
        .setTitle(config.emojis.error.em + " | Une erreur est survenue...")
        .setAuthor("AideEducation - ERREUR")
        .setURL('https://aideeducation.fr')
        .setDescription(errorlist)  
        .setFooter("AideEducation | ERREUR")
      return embed;
 }
module.exports = errorembed; 

