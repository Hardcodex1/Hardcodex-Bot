const Discord = require('discord.js')
const client = new Discord.Client();
const bot = new Discord.Client({ws: {intents: Discord.Intents.All}});
const redis = require('./redis')
const manager = require('./lvlManager')

var lvl
const syntax = "xp-"
var userId
const num = 1;
var xp;

module.exports = async (bot) =>
{

    const checkIndex = async message =>
    {
        const redisClient = await redis()
        try{
            redisClient.get(`${syntax}${userId}`, (err, reply) => 
            {
                if (err)
                {
                    console.log(err)
                }
                else if (reply)
                {
                    lvl = +reply + xp 
                    incLvl(message)
                    manager(bot, lvl, userId, message)
                }
                else{
                    createId(message)
                    console.log("Creating New Key")
                }
            })
        }finally{
            redisClient.quit();
        }
    }

    const incLvl = async message =>
    {
        const redisClient = await redis()
        try{
            redisClient.set(`${syntax}${userId}`, lvl )
        }finally{
            redisClient.quit()
        }
    }

    const createId = async message =>
    {
        const redisClient = await redis()
        try{
            redisClient.set(`${syntax}${userId}`, xp)
        }finally{
            redisClient.quit();
        }
    }
    

    bot.on("message", async message => 
    {
        const {channel, member, guild, content} = message

        if (channel.id == "842682485628338236" || channel.id == "842682540485246986")
        {
            return;
        }

        split = content.split(" ")
        xp = split.length

        
        userId = member.id
        checkIndex(message)
        
    })
}