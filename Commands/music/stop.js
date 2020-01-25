module.exports = {
  name: 'stop',
  description: 'Arrête la musique',
  //aliases: ['s'],
  cooldown: 10,
  usage: '',
  //args: true,
  guildOnly: true,
  async execute(message, args, bot, embedfooter) {
  	function embeds(title, description) {
      let embed = new Discord.RichEmbed()
        .setColor('#FFFFFF')
        .setTitle(title)
        .setAuthor("AideEducation - Musique")
        .setURL('https://aideeducation.fr')
        .setDescription(description)  
        .setFooter(embedfooter + " | Musique")
      return embed;
    }
    const { queue } = message.client;
	 const serverQueue = queue.get(message.guild.id);
	 const voiceChannel = message.member.voiceChannel;
	 if (!message.member.voiceChannel) return message.channel.send(embeds("<:no:556392374172123137> | Une erreur est survenue.", "```diff\n- Vous n'êtes pas dans un salon vocal. \n```"));
	 if (!serverQueue) return message.channel.send(embeds("<:no:556392374172123137> | Une erreur est survenue.", "```diff\n- Je ne joue pas actuellement... \n```"));
	 serverQueue.songs = [];
   serverQueue.connection.dispatcher.end('STOP');
  },
};