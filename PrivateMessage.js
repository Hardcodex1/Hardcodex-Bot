const { Guild } = require("discord.js");

module.exports = (bot, triggerText, replyText = []) => {
    bot.on('message', (message) => {
        var words = message.content.split(" ");
        const max = 8;
        for (var i = 0; i <= words.length; i++)
      {
            var num = Math.random() * max
            var index = Math.round(num)
            temp = words[i];
                if (temp === 'abdul' || temp === 'otto' || temp === 'Abdul' || temp === 'Otto') 
                {
                  message.channel.send(replyText[index])
                }
        }
    })
  }