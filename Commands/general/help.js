const config = require("../../Config/config.js")
const Discord = require("discord.js");
const errorembed = require("../../Fonctions/errorembed.js")
module.exports = {
  name: 'help',
  description: 'Affiche toute les commandes du bot',
  aliases: ['aide', 'cmd'],
  cooldown: 5,
  usage: '[COMMANDE - Optionnel]',
  args: false,
  guildOnly: false,
  execute(message, args, bot, embedfooter) {
    const { commands } = message.client;
    
    if(!args[0]) {
      var embedhelpmember = new Discord.RichEmbed() //EMBED
                 .setTitle("**Liste des commandes**\n") // Titre
                 .setDescription('Le prefix est `<`, pour plus d\'information utilisez <help [COMMANDE] !')
                 .addField(":tools: | Modération\n``mute``, ``unmute``, ``kick``, ``ban``, ``banid``", "** **")
                 .addField(":hammer_pick: | Administration\n``say``", "** **")
                 .addField(":ok_hand: | Utile\n``help``, ``ping``, ``userinfo``, ``member``, ``stats``, ``pp``, ``qrcode``, ``shorten``", "** **")
                 .addField(":smile: | Fun\n``dog``, ``cat``, ``cow``, ``cowsay``, ``kiss``, ``hug``, ``succes``", "** **")
                 .addField(":gift:  | New !\n``...``", "** **")
                 .setColor('RANDOM') // Couleur aléatoire
                 .setFooter("AideEducation | <help [commande]") 
             message.author.send(embedhelpmember); // Envoie de l'embed en mp
             message.channel.send("**<:yes:556392507899117570> L'aide vous a été envoyé par message privé.**")
      var msgp = new Discord.RichEmbed()
      .setAuthor("AideEducation - Informations complémentaire")
      .setColor('RANDOM')
      .addField("Site web :", "https://aideeducation.fr", true)
      .addField("Plateforme de cours :", "https://cours.aideeducation.fr", true)
      .addField("Twitter :", "https://twitter.com/AideEducationGD", true)
      .setFooter(embedfooter + " | Aide");
      //var guildmp = args[2]
      message.author.send(msgp)

    } else {
      
      const cmdf = args[0].toLowerCase();
      const command = commands.get(cmdf) || commands.find(c => c.aliases && c.aliases.includes(cmdf));
     if (!command) { return message.channel.send(errorembed("La commande n'existe pas...")) }
      var commandal = "*Aucun alias*"
      var commandex = "*Aucun exemple*"
      var commandusage = config.prefix + command.name
      var commanddesc = "*Aucune description*"
      
      if (command.aliases) commandal = command.aliases.join(',\n')
      if (command.description) commanddesc = command.description
      if (command.usage) commandusage = config.prefix + command.name + " " + command.usage
      var commandembed = new Discord.RichEmbed() //EMBED
                 .setTitle("Commande : " + command.name) // Titre
                 .setURL('https://aideeducation.fr')
                 .setThumbnail('http://vic256.zd.fr/files/AE/helpicon.png')
                 .addField("**Description : **", commanddesc)
                 .addField("**Usage : **", commandusage)
                 .addField("**Alias : **", commandal)
                 .addField('**Exemples :**', commandex)
                 .setColor('RANDOM') // Couleur aléatoire
                 .setFooter("AideEduation | Les crochets ne sont pas a réutiliser dans les commandes.") 
      message.channel.send(commandembed)

    } 

  },
};
