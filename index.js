const Discord = require('discord.js')
const client = new Discord.Client();
const bot = new Discord.Client({ws: {intents: Discord.Intents.All}});
var useless = 0;
//const config = require('./config.json'); 
const command = require('./command');
const privateMessage = require('./PrivateMessage');
 var { prefix } = require('./config.json');
const firstMessage = require('./first-message');
const tempMsg = require('./msgDelete');
//const mongo = require('./mongo')
//const welcome = require('./welcome');
//const messageCounts = require('./message-counts');
const mute = require('./mute')
const timmedMsg = require('./timmedMsg')
require('dotenv').config();
const warning = require("./warning")
const suggest = require("./suggestion")
const msgCount = require("./messageCounter")


//TO KNOW WHEN BOT IS ONLINE
bot.on('ready' , async () => 
{
    console.log("BOT ONLINE, PROCEED TO DISCORD");

    bot.user.setPresence({
        activity: {
          name: `${prefix}help | Kicking Abdul's Ass`,
          type: 0,
        }
    })

    //await mongo().then((mongoose) => {
      //try {
       // console.log('Connected to mongo!')
     // } finally {
      //  mongoose.connection.close()
     // }
    //})

    mute(bot)

    warning(bot)

    msgCount(bot)

    //welcome(bot)

    //messageCounts(bot);
    suggest(bot)

    
        timmedMsg(bot)

    //privateMessage(bot, 'abdul', ["Indeed Abdul is gae, its scientifically proven", 'Ohh Abdul, ik that guy, he is gae', 'Abdul the gae boy', 'abdul? dont take that name again lol', 'dont take that name here again', 'he gae', 'why, why would u say that name']);

    command(bot, "channelCreate", message => 
    {
      if (message.member.hasPermission('Mod'))
      {
        const name = message.content.replace('%channelCreate ', '')
        message.guild.channels.create(name, 
        {
          type: 'text'
        }).then((channel) => 
        {
          const categoryID = "840612087369433150"
          channel.setParent(categoryID);
        })
      }
      else {"You Don't have Perms, contact Server Admin"}
    })

    ///command(bot, "tempMsg", message => 
   // {
     // var content = message.content.replace('%tempMsg ', '')
    //  message.channel.send("Enter Time Duration")
    //  var time = message
    //  message.channel.send(`Sending ${content} for ${time}s`)
    //  const guild = client.guilds.cache.get('816374451482001418')
    //  const channel = guild.channels.cache.get('816512293872730142')
    //  tempMsg(channel, content, time)
   // })

    command(bot, 'msg', message => 
    {
        const content = message.content.replace('%msg ', '')
        firstMessage(bot, '842111881077456927' , content, ['🔥' ,'😜'])
    })

    command(bot, "server", message =>
    {
        //bot.guilds.cache.forEach((guild) => {
            //message.channel.send(`${guild.name} has a total of ${guild.memberCount} members`);
        //})
            const {guild} = message;
            const {name, region, memberCount, owner} = guild

            const embed = new Discord.MessageEmbed()
            .setColor("#39FF14")
            .setTitle(`Server info for ${guild.name}`)
            .addFields (
              {
                name: "Region",
                value: region
              },
              {
                name: "Member Count",
                value: memberCount
              },
              {
                name: "Owner Name",
                value: owner.user.tag
              }
            )
            message.channel.send(embed);
    })

    command(bot, ["cc", "clear"], message => 
    { {
      if (message.member.hasPermission("ADMINISTRATOR")){

            message.channel.messages.fetch().then((results) => {
                message.channel.bulkDelete(results);
            })
        }
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

      command(bot, 'ban', (message) => {
        const { member, mentions } = message
    
        const tag = `<@${member.id}>`
    
        if (
          member.hasPermission('ADMINISTRATOR') ||
          member.hasPermission('BAN_MEMBERS')
        ) {
          const target = mentions.users.first()
          if (target) {
            const targetMember = message.guild.members.cache.get(target.id)
            targetMember.ban()
            message.channel.send(`${target} has been banned by ${tag}`)
            message.target.send("You Have Been Banned")
          } else {
            message.channel.send(`${tag} Stfu and tell who to ban first.`)
          }
        } else {
          message.channel.send(
            `${tag} You do not have permission to use this command.Stfu and get lost.`
          )
        }
      })

      command(bot, 'kick', (message) => {
        const { member, mentions } = message
    
        const tag = `<@${member.id}>`
    
        if (
          member.hasPermission('ADMINISTRATOR') ||
          member.hasPermission('BAN_MEMBERS')
        ) {
          const target = mentions.users.first()
          if (target) {
            const targetMember = message.guild.members.cache.get(target.id)
            targetMember.kick()
            message.channel.send(`${target} has been kicked by ${tag}`)
            message.target.send("You Have Been kicked")
          } else {
            message.channel.send(`${tag} Stfu and tell who to kick first.`)
          }
        } else {
          message.channel.send(
            `${tag} You do not have permission to use this command. Stfu and get lost.`
          )
        }
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
        { name: `${prefix}server`, value: "Makes the bot show Details of server"},
        { name: `${prefix}cc or clear`, value: "Clears a part of the channel (ADMIN AND MOD ONLY)"},
        { name: `${prefix}msg <value>`, value: "Sends Message of what u type in the General Chat"},
        { name: `${prefix}ban <tag of person>`, value: "Bans the tagged person (ADMIN AND MOD ONLY)"},
        { name: `${prefix}kick <tag of person>`, value: "kicks the tagged person (ADMIN AND MOD ONLY)"},
        { name: `${prefix}mute <tag of person> <time> <format m,h,d>`, value: "mutes the tagged person (ADMIN AND MOD ONLY)"},
        { name: `${prefix}setMsg`, value: "Sets a 2 hour loop (Use for bump msgs )"},
        { name: `${prefix}warn <user> <reason>`, value: "Warns the user )"},
        { name: `${prefix}delWarn <user> <warn number>`, value: "Deletes the warning )"},
        { name: `${prefix}suggest <suggestion>`, value: "Sends Suggestion In Concerned Channel )"},
        { name: `${prefix}viewWarn <user> <warn number>`, value: "Ability to view a particullar warning)"},
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
bot.login(process.env.BOT_TOKEN);

