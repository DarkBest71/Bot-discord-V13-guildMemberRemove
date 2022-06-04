const { MessageEmbed } = require("discord.js");
const moment = require('moment');

moment.locale('fr');

module.exports = {
    run: (client, member) => {
       const channel = member.guild.channels.cache.get('ID Salon');
       
       const embedLostMember = new MessageEmbed()
       .setColor('RED')
       .setDescription(`Membre parti: ${member} sur ${member.guild.name}.`)
       .addField('Création du compte:', moment(member.user.createdAt).format('L'))
       .addField('Viens de quitté le:', moment(member.joinedAt).format('L'))
       .setFooter({text:` ${member.guild.memberCount} sur le serveur`})
       channel.send({embeds: [embedLostMember]})
    },
    name: 'guildMemberRemove'
}
