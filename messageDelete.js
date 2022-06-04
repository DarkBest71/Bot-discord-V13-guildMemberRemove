const Discord = require("discord.js");
const db = require("quick.db");
const config = require("../../jsons/config.json");

    module.exports = { run: async(client, message ) => {   
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    const AuditsLogs = await message.guild.fetchAuditLogs({
        type: 'MESSAGE_DELETE',
        limit: 1
        })
        const LatestMessageDeleted = AuditsLogs.entries.first(); 
    let channel = db.get("logs_channel_" + message.guild.id)
    if(client.channels.cache.get(channel)) { 
        if(message.attachments.first()) {
            if(db.get("logs_images_" + message.guild.id) !== "on") return;

            const embed = new Discord.MessageEmbed()
            .setFooter({text: `Exécutée par ${message.author.username}`, iconURL: `${message.guild.iconURL({dynamic: true})}`})
            .setTitle(`Image supprimée **ON** :`)
            .setImage(message.attachments.first().proxyURL)
            .setColor("#fc3c3c")
            .setTimestamp()
            return client.channels.cache.get(channel).send({ embeds: [embed] })
        }
        const embed = new Discord.MessageEmbed()
        
        .setFooter({text: `Exécutée par ${message.author.username}`, iconURL: `${message.guild.iconURL({dynamic: true})}`})
        .setTitle(`Message supprimé **ON** dans #${message.channel.name} :`)
        .setDescription(`Auteur du message : ${message.author}\nAuteur de la suppresion : ${LatestMessageDeleted.executor}\nDate de création du message : <t:${Math.floor(message.createdAt / 1000)}:F>\nContenu : \`\`\`${message.content}\`\`\``)
        .setColor("#fc3c3c")
        .setTimestamp()
        return client.channels.cache.get(channel).send({ embeds: [embed] })
    }
},
name: 'messageDelete'
};