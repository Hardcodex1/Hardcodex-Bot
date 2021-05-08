const Discord = require('discord.js')
const client = new Discord.Client();
const bot = new Discord.Client({ws: {intents: Discord.Intents.All}});
var useless = 0;
const config = require('./config.json'); 
const command = require('./command');
 var { prefix } = require('./config.json');
const firstMessage = require('./first-message');

//TO KNOW WHEN BOT IS ONLINE
bot.on('ready' ,() => 
{
    console.log("BOT ONLINE, PROCEED TO DISCORD");

    bot.user.setPresence({
        activity: {
          name: `${prefix}help |BOT UNDER TESTING`,
          type: 0,
        }
    })

    command(bot, 'msg', message => 
    {
        const content = message.content.replace('%msg ', '')
        firstMessage(bot, '816512293872730142' , content, ['🔥' ,'😜'])
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
        if (message.member.hasPermission('ADMINISTRATOR' || 'Mod')) {
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

      command(bot, 'help', message =>
      {
        let embed = new Discord.MessageEmbed()
        .setTitle('HARDCODEX COMMANDS')
        .setThumbnail("https://images.app.goo.gl/6taNx5tefP2DaHwo6")
        .setColor("#00FFFF")
        .setImage("https://images.app.goo.gl/6taNx5tefP2DaHwo6")
        .setDescription("Here are the list of commands")
        .addFields(
        { name: `${prefix}hello`, value: "Makes the bot Say Hello Simple"},
        { name: `${prefix}help`, value: "Makes the bot show this msg"},
        { name: `${prefix}server`, value: "Makes the bot show which servers it is in their members"},
        { name: `${prefix}cc or clear`, value: "Clears a part of the channel (MOD ONLY)"},
        { name: `${prefix}msg <value>`, value: "Sends Message of what u type in the channel"},
        { name: `${prefix}changePrefix`, value: "Allows you to change prefix (TESTING)"},
        )

        message.channel.send(embed);
      })

      command (bot, "hello" , message => 
      {
        let member = message.mentions.members.first();
        if (!member) {message.channel.send('Hello Bro')}
        else {message.channel.send(`Hello ${member.tag}`)}
      })

      command (bot, "setPrefix", message => 
      {
          const content = message.content.replace("%setPrefix", "")
          prefix = content;
          message.channel.send(`New Prefix is ${prefix}`);
      })
})




//BOT TOKEN DO NOT TOUCH
bot.login(config.token);

