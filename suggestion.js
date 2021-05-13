const Discord = require('discord.js')
const command = require("./command")

const firstMessage = require('./first-message')

module.exports = (client) => {

    command (client, "suggest", message =>
    {
        const channelId = "816377344838467594"

        const {member, guild, content} = message

        const suggestion = content.replace("%suggest ", " ")



  const getEmoji = (emojiName) =>
    client.emojis.cache.find((emoji) => emoji.name === emojiName)

  const emojis = {
    Pepe_Yes: 'Pepe_No',
    Pepe_No: 'Pepe_No',
  }

  const reactions = []
  const userName = member.user.username
  const tag = member.user.id

  for (const key in emojis) {
    const emoji = getEmoji(key)
    reactions.push(emoji)
  }

  message.channel.send(`Thx for the suggestion <@${tag}>`)

  const embed = new Discord.MessageEmbed()
        .setTitle(`${userName} Suggested: `)
        .setColor("#1F51FF")
        .setDescription(`${suggestion}`);

  firstMessage(client, channelId, embed, reactions);
    })
  
}
//message.react([':Pepe_Yes:832572992294354954' ,':Pepe_No:832573033225912371'])

//const embed = new Discord.MessageEmbed()
       // .setTitle(`${tag} Suggested: `)
      //  .setColor("#1F51FF")
       // .setDescription(`${suggestion}`);