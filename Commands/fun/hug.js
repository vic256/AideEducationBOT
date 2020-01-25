const hug = ["https://s-media-cache-ak0.pinimg.com/originals/49/a2/1e/49a21e182fcdfb3e96cc9d9421f8ee3f.gif", "https://s-media-cache-ak0.pinimg.com/originals/16/46/f7/1646f720af76ea58853ef231028bafb1.gif", "https://media.giphy.com/media/xJlOdEYy0r7ZS/giphy.gif", "http://i.imgur.com/2WywS3T.gif", "http://i.imgur.com/8ruodNJ.gif", "http://i0.kym-cdn.com/photos/images/original/000/931/030/394.gif", "https://media.tenor.co/images/1171c186f9130d1efa4a186ad4371e8c/tenor.gif", "http://cdn.smosh.com/sites/default/files/ftpuploads/bloguploads/0413/epic-hugs-friends-pikachu.gif", "https://cdn.weeb.sh/images/rJaog0FtZ.gif", "https://cdn.weeb.sh/images/B10Tfknqf.gif", "https://cdn.weeb.sh/images/S1a0DJhqG.gif", "https://cdn.weeb.sh/images/Hk4qu_XvZ.gif", "https://cdn.weeb.sh/images/Hk0yFumwW.gif", "https://cdn.weeb.sh/images/BJCCd_7Pb.gif", "https://cdn.weeb.sh/images/BJ0UovdUM.gif"]
const rnb = require('random-number')
const Discord = require("discord.js");
const config = require("../../Config/config.js")
module.exports = {
  name: 'hug',
  description: 'Faite un câlin.',
  aliases: ['calin', 'câlin'],
  cooldown: 5,
  usage: '[UTILISATEUR - Optionnel]',
  args: false,
  guildOnly: false,
  execute(message, args, bot, embedfooter) {
  	let muser = message.mentions.users.first()

        let r = rnb({
            min: 0,
            max: hug.length - 1,
            integer: true
        });
        let image = hug[r];

        if (!message.mentions.users.first()) return message.channel.sendMessage({
             "embed": {
                     description: "**:hugging: " + message.author.username + "**" + ", vous avez reçu un câlin de " +  "**" + config.botname + "**",
                     color: 0xff7b00,
                     "image": {
                     "url": image,
                     timestamp: new Date(),
                    footer: {
                      text: embedfooter + "| Hug"
                    },
                     }
                 }
             })

        message.channel.sendMessage({
             "embed": {
                     description: "**:hugging: " + muser.username + "**" + ", vous avez reçu un câlin de " + "**" + message.author.username + " **",
                     color: 0xff7b00,
                     "image": {
                     "url": image,
                     timestamp: new Date(),
                    footer: {
                      text: embedfooter + "| Hug"
                    },
                     }
                 }
             })
  },
};