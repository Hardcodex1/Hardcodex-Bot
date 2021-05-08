const Discord = require('discord.js')
const client = new Discord.Client();
const bot = new Discord.Client({ws: {intents: Discord.Intents.All}});
var useless = 0;
const config = require('./config.json'); 
const command = require('./command');

//TO KNOW WHEN BOT IS ONLINE
bot.on('ready' ,() => 
{
    console.log("BOT ONLINE, PROCEED TO DISCORD");

    bot.user.setPresence({
        activity: {
          name: "%help |BOT UNDER TESTING",
          type: 0,
        }
    })

    command(bot, "ping", message => 
    {
        message.channel.send("pong");
    })

    command(bot, "server", message =>
    {
        bot.guilds.cache.forEach((guild) => {
            message.channel.send(`${guild.name} has a total of ${guild.memberCount} members`);
        })
    })

    command(bot, ["cc", "clear"], message => 
    {
        if (message.member.hasPermission('Gae')) {
            message.channel.messages.fetch().then((results) => {
                message.channel.bulkDelete(results);
            })
        }
    })

    command(bot, 'status', (message) => {
        const content = message.content.replace('%status ', '')
        // "!status hello world" -> "hello world"
    
        bot.user.setPresence({
          activity: {
            name: content,
            type: 0,
          },
        })
      })
})


//BOT TOKEN DO NOT TOUCH
bot.login(config.token);

