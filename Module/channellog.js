
const Discord = require("discord.js");
const bot = new Discord.Client();

function channellog(type, logmessage, author, color) {



      bot.channels.get('545955391079579649').send("", {
        embed: new Discord.RichEmbed()
        .setAuthor(author)
        .setTitle(type)
        .setDescription(logmessage)
        .setColor(color)
        .setTimestamp()
        .setFooter(`QB-Log | By vic256#4589`)
    });
    
    


}
module.exports = channellog;  
