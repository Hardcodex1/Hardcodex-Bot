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

    command(bot, "ping", message => 
    {
        message.channel.send("pong");
    })
})


//BOT TOKEN DO NOT TOUCH
bot.login(config.token);

