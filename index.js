const Discord = require('discord.js')
const client = new Discord.Client();
const bot = new Discord.Client({ws: {intents: Discord.Intents.All}});
var useless = 0;

//TO KNOW WHEN BOT IS ONLINE
bot.on('ready' ,() => 
{
    console.log("BOT ONLINE, PROCEED TO DISCORD");
})

bot.on('message', (message) => 
{
    //PRE MADE STUFF DO NOT TOUCH
    if (message.author.bot) return;
    let prefix = '%';
    //Hello there = {hello , there}
    let messageArray = message.content.split(' ');
    let cmd = messageArray[0].slice(prefix.length)
    command = cmd;
    let args = messageArray.slice(1);

    if (!message.content.startsWith(prefix)) return;


    //HELLO COMMAND !hello
    if (command == 'hello')
    {
        let member = message.mentions.members.first();
        if(!member) {message.channel.send('Hello');}
       else 
       {
            message.channel.send(`Hello ${member.user.tag}`)
       }
    }


    //HELP COMMAND !help
    if (command == 'help')
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
        { name: `${prefix}changePrefix`, value: "Allows you to change prefix"}
        )
        message.channel.send(embed);


        //CHANGE PREFIX COMMAND %prefix


    

    }

    bot.on('message', (message) => 
    {
        if (command == 'changePrefix')
        {
            if (useless == 0)
            {
                message.channel.send(`The Current Prefix is ${prefix}`)
                message.channel.send(`Enter a single letter to make prefix`)
                setTimeout(() => { prefix = args;}, 5000 );
                setTimeout(() => {message.channel.send(`Changing Prefix to ${prefix} in 1 second `)}, 1000 );
                setTimeout(() => {message.channel.send(`The new Prefix is ${prefix} `);}, 3000 ) ;
                
            }
        }
    })

    bot.on('guildMemberAdd' , (member) =>
     {
        let embed = new Discord.MessageEmbed()
        .setTitle('Welcome To Melon Memes')
        .setThumbnail("https://images.app.goo.gl/6taNx5tefP2DaHwo6")
        .setColor("#00FFFF")
        .setImage("https://images.app.goo.gl/6taNx5tefP2DaHwo6")
        .setDescription("We Are A very Happy Community Remember to stay active and laugh")
        .addFields(
        { name: "Rule 1", value: "Stay Active"},
        { name: "Rule 2", value: "Post Memes"},
        { name: "Rule 3", value: "Be Good"}
        )

        member.message.send(embed);
    })

    bot.on('guildMemberUpdate', (oldMember, newMember) => 
    {
        if(oldMember.nickname !== newMember.nickname)
        newMember.message.send(`You Just Changed You Nickname from ${oldMember.nickname} to ${newMember.nickname} `);
    })

    bot.on('channelCreate' , (channel) => 
    {
        channel.message.send(`Welcome to ${channel.name} `);
    })

})


//BOT TOKEN DO NOT TOUCH
bot.login('ODQwMTcwNjE0NTQyNjk2NDY4.YJUT3A.fIGfrkc-QQGumwe8fIA0YlUaMxI')

