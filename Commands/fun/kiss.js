const kiss = ["https://cdn.weeb.sh/images/SJ--2auDZ.gif", "https://cdn.weeb.sh/images/Skc42pdv-.gif", "https://cdn.weeb.sh/images/rJ_U2p_Pb.gif", "https://cdn.weeb.sh/images/ryFdQRtF-.gif", "https://cdn.weeb.sh/images/SkQIn6Ovb.gif", "https://cdn.weeb.sh/images/SJQRoTdDZ.gif", "https://cdn.weeb.sh/images/Sk1k3TdPW.gif", "https://cdn.weeb.sh/images/r1H42advb.gif", "https://cdn.weeb.sh/images/S1E1npuvb.gif", "https://cdn.weeb.sh/images/ByurnpODW.gif", "https://cdn.weeb.sh/images/S1y-4l5Jf.gif", "https://cdn.weeb.sh/images/Skv72TuPW.gif", "https://cdn.weeb.sh/images/SJINn6OPW.gif", "https://cdn.weeb.sh/images/SJ3dXCKtW.gif", "https://cdn.weeb.sh/images/H1Gx2aOvb.gif", "https://cdn.weeb.sh/images/S1qZksSXG.gif", "https://cdn.weeb.sh/images/r1cB3aOwW.gif", "https://cdn.weeb.sh/images/HJ8dQRYK-.gif", "https://cdn.weeb.sh/images/BJLP3a_Pb.gif"]
const rnb = require('random-number')
const Discord = require("discord.js");
module.exports = {
  name: 'kiss',
  description: 'Faire parler le bot (Commande Admin)',
  aliases: ['bisou', 'bisoux'],
  cooldown: 5,
  usage: '[UTILISATEUR - Optionnel]',
  args: false,
  guildOnly: false,
  execute(message, args, bot, embedfooter) {
    let muser = message.mentions.users.first()

        let r = rnb({
            min: 0,
            max: kiss.length - 1,
            integer: true
        });
        let image = kiss[r];

        if (!message.mentions.users.first()) return message.channel.sendMessage({
             "embed": {
                     description: "**" + message.author.username + "**" + ", vous avez reçu un bisou de " +  "** AideEducation !**",
                     color: 0xff7b00,
                     "image": {
                     "url": image,
                     timestamp: new Date(),
                    footer: {
                      text: "Kiss"
                    },
                     }
                 }
             })

        message.channel.sendMessage({
             "embed": {
                     description: "** " + muser.username + "**"  + ", vous avez reçu un bisou de " + "**" + message.author.username + " **",
                     color: 0xff7b00,
                     "image": {
                     "url": image,
                     timestamp: new Date(),
                    footer: {
                      text: "Kiss"
                    },
                     }
                 }
             })
  },
};