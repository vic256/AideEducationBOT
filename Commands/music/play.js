const botconfig = require('../../Config/botconfig.json')
const Discord = require("discord.js");
const bot = new Discord.Client();
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube("AIzaSyAYn4BNRQIS2euR3v9SfynlJ23MOvn3t9M");
const {
	Util
} = require('discord.js');

module.exports = {
  name: 'play',
  description: 'Joue de la musique',
  //aliases: ['', 'cmd'],
  cooldown: 10,
  usage: '[Titre/URL]',
  args: true,
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
	const searchString = args.slice(1).join(' ');
			const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
			const serverQueue = queue.get(message.guild.id);
			
			const voiceChannel = message.member.voiceChannel;
		if (!voiceChannel) return message.channel.send(embeds("<:no:556392374172123137> | Une erreur est survenue.", "```diff\n- Vous n'êtes pas dans un salon vocal. \n```"));
		const permissions = voiceChannel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT')) {
			return message.channel.send(embeds("<:no:556392374172123137> | Une erreur est survenue.", "```diff\n- Je n'ais pas la permission de rejoindre. \n```"));
		}
		if (!permissions.has('SPEAK')) {
			return message.channel.send(embeds("<:no:556392374172123137> | Une erreur est survenue.", "```diff\n- Je n'ais pas la permission de parler. \n```"));
		}

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			return message.channel.send(embeds("<:yes:556392507899117570> | Vidéos ajoutés", "```diff\n+ La playlist a été ajoutés. \n```"));
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0; 
					message.channel.send(embeds("Choissisez la musique :", videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')))
					// eslint-disable-next-line max-depth
					try {
						var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						return message.channel.send(embeds("<:no:556392374172123137> | Une erreur est survenue.", "```diff\n- Vous avez pris trop de temps \n```\n```diff\n- Merci d'envoyer un chiffre. \n```\n```diff\n- ERREUR : " + err + "\n```"));
					}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return message.channel.send(embeds("<:no:556392374172123137> | Une erreur est survenue.", "```diff\n- Aucun résultat. \n```"));
				}
			}
			return handleVideo(video, message, voiceChannel);
		}
async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = queue.get(msg.guild.id);
	console.log(video);
	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`Error: ${error}`);
			queue.delete(msg.guild.id);
			return msg.channel.send(embeds("<:no:556392374172123137> | Une erreur est survenue.", "```diff\n- Je n'arrive pas a rejoindre le salon vocal. \n```"));
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		else return msg.channel.send(embeds("<:yes:556392507899117570> | Vidéo ajouté", "```diff\n+ VOtre musique a été ajouté à la file d'attente. \n```"));
	}
	return undefined;
}
function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	serverQueue.textChannel.send(embeds("<:yes:556392507899117570> | Je joue : ", song.title));
}
  	  },
};