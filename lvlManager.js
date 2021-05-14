const Discord = require('discord.js');
const firstMessage = require('./first-message');
const client = new Discord.Client();
const bot = new Discord.Client({ws: {intents: Discord.Intents.All}});
const redis = require('./redis')
const start = 10
var lvl = 0;
syntax = "lvl-"


module.exports = async (bot, xp, userId, message) =>
{
    const checkXp = message =>
    {
        if (xp >= (1 + lvl) * start)
        {
            lvl = +lvl + 1 
            lvlAssign(message)
            firstMessage(bot, "842682485628338236", `congratulations on reaching level: ${lvl}`, ["👍"] )
        }
    }

    const lvlAssign = async message =>
    {
        const redisClient = await redis()
        try{
            redisClient.set(`${syntax}${userId}`, `${lvl}`)
        }finally{
            redisClient.quit();
        }
    }

    const checkLvl = async message => 
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
                    lvl = +reply
                    checkXp(message)
                }
                else{
                    lvlAssign(message)
                }
            })
        }finally{
            redisClient.quit();
        }
    }

    if (xp == start)
    {
        lvl = 1;
        checkLvl(message)
        firstMessage(bot, "842682485628338236", `congratulations on reaching level: 1`, ["👍"] )
    }
    else{
        checkLvl(message)
    }
}