const botconfig = require('../../Config/botconfig.json')
const Discord = require("discord.js");
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
                 .addField(":tools: | Modération\n``mute``, ``unmute``, ``softmute``, ``sunmute``, ``kick``, ``ban``, ``banid``", "** **")
                 .addField(":hammer_pick: | Administration\n``say``, ``roleid``, ``checkinvites``", "** **")
                 .addField(":ok_hand: | Utile\n``help``, ``ping``, ``level``, ``userinfo``, ``member``, ``stats``, ``pp``, ``invite``, ``qrcode``, ``shorten``", "** **")
                 .addField(":smile: | Fun\n``dog``, ``cat``, ``cow``, ``cowsay``, ``kiss``, ``hug``, ``succes``", "** **")
                 .addField(":gift:  | New !\n``...``", "** **")
                 .setColor('RANDOM') // Couleur aléatoire
                 .setFooter("AideEducation | >help [commande]") 
             message.author.send(embedhelpmember); // Envoie de l'embed en mp
             message.channel.send("**<:yes:556392507899117570> Le help vous a été envoyé par message privé.**")
      var msgp = new Discord.RichEmbed()
      .setAuthor("AideEducation - Informations complémentaire")
      .setColor('RANDOM')
      .addField("Site web :", "https://aideeducation", true)
      .addField("Plateforme de cours :", "https://cours.aideeducation.fr", true)
      .addField("Twitter :", "https://twitter.com/AideEducationGD", true)
      .setFooter(embedfooter + " | Aide");
      //var guildmp = args[2]
      message.author.send(msgp)

    } else {
      
      const cmdf = args[0].toLowerCase();
      const command = commands.get(cmdf) || commands.find(c => c.aliases && c.aliases.includes(cmdf));
     if (!command) { return message.channel.send('<:no:556392374172123137> Veuillez utilisez une commande valide !') }
      var commandal = "*Aucun alias*"
      var commandex = "*Aucun exemple*"
      var commandusage = botconfig.prefix + command.name
      var commanddesc = "*Aucune description*"
      
      if (command.aliases) commandal = command.aliases.join(',\n')
      if (command.description) commanddesc = command.description
      if (command.usage) commandusage = botconfig.prefix + command.name + " " + command.usage
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