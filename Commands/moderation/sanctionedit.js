const Discord = require("discord.js");
const botconfig = require("../../Config/botconfig.json");
module.exports = {
  name: 'sanctionedit',
  description: 'Faire parler le bot (Commande Admin)',
  aliases: ['sedit'],
  cooldown: 5,
  usage: '[SID] [INFO] [EDITION]',
  args: true,
  guildOnly: true,
  execute(message, args, bot, embedfooter) {
    const botconfig = require("../../Config/botconfig.json")
  	if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('Ceci est une commande en développement réservé au staff :neutral_face:'); //Pemission ? OK !
  	//Check edit
  	if(!args[1]) return message.channel.send(`<:no:556392374172123137>  |  ${message.author.username}, merci de rentrer une information a editer !`)

  	if(args[1] === "screen") {
      let Attachment = (message.attachments).array()
      if (!Attachment){ return message.channel.send(`<:no:556392374172123137>  |  ${message.author.username}, vous avez oublier l'image :neutral_face: !`) }
        let msgid = args[0]
        let ataurl = Attachment[0].url
        bot.channels.get(botconfig.sancID).fetchMessages({around: msgid, limit: 1})
          .then(msg => {
            const fetchedMsg = msg.first();
            //console.log(fetchedMsg.embeds[0])
            let newembds = new Discord.RichEmbed()
              .setColor('#ff0000')
              .setTitle(fetchedMsg.embeds[0].title)
              .setAuthor(fetchedMsg.embeds[0].author, fetchedMsg.embeds[0].author.iconURL)
              .setURL(fetchedMsg.embeds[0].url)
              .addField(fetchedMsg.embeds[0].fields[0].name, fetchedMsg.embeds[0].fields[0].value, fetchedMsg.embeds[0].fields[0].inline)
              .addField(fetchedMsg.embeds[0].fields[1].name, fetchedMsg.embeds[0].fields[1].value, fetchedMsg.embeds[0].fields[1].inline)
              .addField(fetchedMsg.embeds[0].fields[2].name, fetchedMsg.embeds[0].fields[2].value, fetchedMsg.embeds[0].fields[2].inline)
              .addField(fetchedMsg.embeds[0].fields[3].name, fetchedMsg.embeds[0].fields[3].value, fetchedMsg.embeds[0].fields[3].inline)
              .addField(fetchedMsg.embeds[0].fields[4].name, fetchedMsg.embeds[0].fields[4].value, fetchedMsg.embeds[0].fields[4].inline)
              .addField(fetchedMsg.embeds[0].fields[5].name, fetchedMsg.embeds[0].fields[5].value, fetchedMsg.embeds[0].fields[5].inline)
              .addField(fetchedMsg.embeds[0].fields[6].name, fetchedMsg.embeds[0].fields[6].value, fetchedMsg.embeds[0].fields[6].inline)
              .setImage(ataurl)
              .setFooter(embedfooter + "| Sanctions")
            fetchedMsg.edit(newembds)
            message.channel.send(`<:yes:556392507899117570> |  ${message.author.username}, Log edité avec succès !`)
           }).catch(err => {
              message.channel.send(`<:no:556392374172123137>  |  ${message.author.username}, une erreur est survenu.\n` + err)
           })
          
  	}
    if(args[1] === "info") {
      if (!args[2]){ return message.channel.send(`<:no:556392374172123137>  |  ${message.author.username}, vous avez oublier la nouvelles information :neutral_face: !`) }
        let msgid = args[0]
        bot.channels.get(botconfig.sancID).fetchMessages({around: msgid, limit: 1})
          .then(msg => {
            const fetchedMsg = msg.first();
            //console.log(fetchedMsg.embeds[0])
            let argu = args.join(" ").slice(3)
            let newembds = new Discord.RichEmbed()
              .setColor('#ff0000')
              .setTitle(fetchedMsg.embeds[0].title)
              .setAuthor(fetchedMsg.embeds[0].author[0], fetchedMsg.embeds[0].author[0])
              .setURL(fetchedMsg.embeds[0].url)
              .addField(fetchedMsg.embeds[0].fields[0].name, fetchedMsg.embeds[0].fields[0].value, fetchedMsg.embeds[0].fields[0].inline)
              .addField(fetchedMsg.embeds[0].fields[1].name, fetchedMsg.embeds[0].fields[1].value, fetchedMsg.embeds[0].fields[1].inline)
              .addField(fetchedMsg.embeds[0].fields[2].name, fetchedMsg.embeds[0].fields[2].value, fetchedMsg.embeds[0].fields[2].inline)
              .addField(fetchedMsg.embeds[0].fields[3].name, fetchedMsg.embeds[0].fields[3].value, fetchedMsg.embeds[0].fields[3].inline)
              .addField(fetchedMsg.embeds[0].fields[4].name, fetchedMsg.embeds[0].fields[4].value, fetchedMsg.embeds[0].fields[4].inline)
              .addField(fetchedMsg.embeds[0].fields[5].name, args.slice(2).join(" "), fetchedMsg.embeds[0].fields[5].inline)
              .addField(fetchedMsg.embeds[0].fields[6].name, fetchedMsg.embeds[0].fields[6].value, fetchedMsg.embeds[0].fields[6].inline)
              .setImage(fetchedMsg.embeds[0].image.url)
              .setFooter(embedfooter + "| Sanctions")
            fetchedMsg.edit(newembds)
            message.channel.send(`<:yes:556392507899117570> |  ${message.author.username}, Log edité avec succès !`)
           }).catch(err => {
              message.channel.send(`<:no:556392374172123137>  |  ${message.author.username}, une erreur est survenu.\n` + err)
           })
          
    }


  },
};