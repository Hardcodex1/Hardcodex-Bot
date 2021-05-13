const redis = require('./redis')
const command = require('./command')
const syntax = 'Warning-'
var warnId;
var reason;
var warnNumber = 0;
var num = 1;
var i = 1;
var warnNumber1 = 1;
var replyMsg;
var newNum = 0;
var useless = 1

module.exports = async (bot) => 
{

    const checkWarn = async message => 
    {
        const {member, content, channel, guild, mentions} = message

        const redisClient = await redis()
        try{
            redisClient.get(`${syntax}${warnId}-${warnNumber}`, (err, reply) => {
                if (err){
                    console.log("Error: ", err)
                }
                else if (reply) {
                    console.log("Warning Already Exists")
                }
                else{
                    createWarn(message)
                    console.log(`User: ${warnId} Warned for Reason ${reason}`)
                    channel.send(`User has total ${warnNumber} warnings`)
                    channel.send(`User: <@${warnId}> Warned for Reason ${reason}`)
                }
            })
        }finally{
            redisClient.quit();
        }
    }

    const checkId = async message => 
    {
        const {member, content, channel, guild, mentions} = message

        const redisClient = await redis()
        try{
            redisClient.get(`${warnId}`, (err, reply) => 
            {
                if (err)
                {
                    console.log(err)
                }
                else if (reply)
                {
                    warnNumber = +reply + num
                }
                else{
                    warnNumber = 1;
                }
            })
        }finally{
            redisClient.quit();
            createId(message);
        }
    }

    const printWarns = async message => 
    {
       
        const {member, content, channel, guild, mentions} = message
        const redisClient = await redis()
        try{
            redisClient.get(`${syntax}${warnId}-${warnNumber1}`, (err, reply) => 
            {
                if (err)
                {
                    console.log(err)
                }
                else if (reply){
                    channel.send(`${warnNumber1}: ${reply}`)
                }
                else 
                {
                    channel.send("No warn with that index")
                    return
                }
            })
        }finally{
            redisClient.quit();
        }
    }


    const createId = async message => 
    {
        const redisClient = await redis()
        try{
            redisClient.set(`${warnId}`, `${warnNumber}`)
            checkWarn(message)
        }finally{
            redisClient.quit();
        }
    }

    const checkDelWarn = async message => 
    {
        const {member, content, channel, guild, mentions} = message

        const redisClient = await redis()
        try{
            redisClient.get(`${syntax}${warnId}-${reason}`, (err, reply) => {
                if (err){
                    console.log("Error: ", err)
                }
                else if (reply) {
                    delWarn(message)
                    delCheckId(message)
                    console.log("Warning Deleted")
                    channel.send(`Warning Deleted`)
                }
                else{
                    console.log(`Warning Does not exist`)
                    channel.send(`Warning Does not exist`)
                }
            })
        }finally{
            redisClient.quit();
        }
    }

    const delCheckId = async message => 
    {
        const redisClient = await redis()
        try{
            redisClient.get(`${warnId}`, (err, reply) => 
            {
                if (err)
                {
                    console.log(err)
                }
                else if (reply)
                {
                    newNum = +reply - useless;

                    delId(message)
                }
                else{
                    return;
                }
            })
        }finally{
            redisClient.quit();
        }
    }

    const delId = async message => 
    {
        const redisClient = await redis()
        try{
            redisClient.set(`${warnId}`, `${newNum}`)
        }finally{
            redisClient.quit();
        }
    }

    const delWarn = async message => 
    {
        const redisClient = await redis()
        try{
            redisClient.del(`${syntax}${warnId}-${reason}`)
        }finally{
            redisClient.quit();
        }
    }

    const createWarn = async message => 
    {
        const redisClient = await redis()
        try{
            redisClient.set(`${syntax}${warnId}-${warnNumber}`, `${reason}`)
        }finally{
            redisClient.quit();
        }
    }

    command (bot, "delWarn", async message => 
    {
        const {member, content, channel, guild, mentions} = message

        if (!member.hasPermission('ADMINISTRATOR')) {
            channel.send('You do not have permission to run this command.')
            return
          }

        const rmsg = content.replace("%delWarn ", " ")
        const split = rmsg.trim().split(",")

        if (split.length !== 2) {
            channel.send('Please use the correct command syntax: ' + syntax)
            return
          }

        console.log(split)

        reason = split[1].trim();
        const target = mentions.users.first()

    if (!target) {
      channel.send('Please tag a user to unwarn.')
      return
    }

    const { id } = target
    warnId = id;

    console.log('ID:', id)

    checkDelWarn(message)
    })

    command (bot, "warn", async message => 
    {
        const {member, content, channel, guild, mentions} = message

        if (!member.hasPermission('ADMINISTRATOR')) {
            channel.send('You do not have permission to run this command.')
            return
          }

          checkId(message);

        const rmsg = content.replace("%warn ", " ")
        const split = rmsg.trim().split(",")

        if (split.length !== 2) {
            channel.send('Please use the correct command syntax: ' + syntax)
            return
          }

        console.log(split)

        reason = split[1].trim();
        const target = mentions.users.first()

    if (!target) {
      channel.send('Please tag a user to warn.')
      return
    }

    const { id } = target
    warnId = id;

    console.log('ID:', id)
    console.log('Reason: ', reason)

    checkWarn(message);
    message.target.send(`You Have Benn Warned for Reason: ${reason}`)

    })

    const totalWarn = async message => 
    {
        const {member, content, channel, guild, mentions} = message
        const redisClient = await redis()
        try{
            redisClient.get(`${warnId}`, (err, reply) => 
            {
                if (err)
                {
                    console.log(err)
                }
                else if (reply)
                {
                    channel.send(`Total Warns = ${reply}`)
                }
                else{
                    channel.send('This Person Has No Warns')
                }
            })
        }finally{
            redisClient.quit();
        }
    }

    command (bot, "totalWarns", message => 
    {
        const {member, content, channel, guild, mentions} = message

        if (!member.hasPermission('ADMINISTRATOR')) {
            channel.send('You do not have permission to run this command.')
            return
          }

        const rmsg = content.replace("%totalWarns ", " ")


        const target = mentions.users.first()

    if (!target) {
      channel.send('Please tag a user to view.')
      return
    }

    const { id } = target
    warnId = id;

    console.log('ID:', id)

    totalWarn(message)
    })

    command (bot, "viewWarns", message => 
    {
        const {member, content, channel, guild, mentions} = message

        if (!member.hasPermission('ADMINISTRATOR')) {
            channel.send('You do not have permission to run this command.')
            return
          }

        const rmsg = content.replace("%viewWarns ", " ")
        const split = rmsg.trim().split(",")

        if (split.length !== 2) {
            channel.send('Please use the correct command syntax: ' + syntax)
            return
          }

          warnNumber1 = split[1].trim();


        const target = mentions.users.first()

    if (!target) {
      channel.send('Please tag a user to view.')
      return
    }

    const { id } = target
    warnId = id;

    console.log('ID:', id)

    printWarns(message)

    })
}