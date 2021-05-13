const redis = require('./redis')
const command = require('./command')
const syntax = 'msg-TimeToBump'
var i = 0;


module.exports = async (bot) => 
{
  var secconds
  var reqContent
  const checkTimer = async message => 
  {
    const redisClient = await redis()
    try {
          redisClient.get(syntax , (err, result) => {
              if (err) {
                console.error('Redis GET error:', err)
              } else if (result) {
                dupeCheckTimer(message)
              } else {
                  i++;
                  sendMessage(message)
                  setTimer(message);
              }
            })
     } finally {
       redisClient.quit()
     }
  }

    const setTimer = async message => 
    {
        const redisClient = await redis()

        try{
            redisClient.set(syntax, "True", "EX", secconds )
            message.channel.send("Timer Started")
            checkTimer(message)
        }
        finally{
            redisClient.quit();
        }
    }

    const dupeCheckTimer = async message => 
  {
    const redisClient = await redis()
    try {
          redisClient.get(syntax , (err, result) => {
              if (err) {
                console.error('Redis GET error:', err)
              } else if (result) {
                checkTimer(message)
              } else {
                  i++;
                  sendMessage(message)
                  setTimer(message);
              }
            })
     } finally {
       redisClient.quit()
     }
  }

        command(bot, "startMsg", async message => 
        {

          const { member, channel, content, mentions, guild } = message

          const split = content.trim().split(' ')

          if (split.length !== 4) {
            channel.send('Please use the correct command syntax:')
            return
          }

          const duration = split[2]
          const durationType = split[3]

          if (isNaN(duration)) {
            channel.send('Please provide a number for the duration. ' + syntax)
            return
          }

          const durations = {
            m: 60,
            h: 60 * 60,
            d: 60 * 60 * 24,
            life: -1,
          }
      
          if (!durations[durationType]) {
            channel.send('Please provide a valid duration type. ' + syntax)
            return
          }

          secconds = duration * durations[durationType]
          reqContent = split[1]
            checkTimer(message)
    
            
        })
        const sendMessage = message => 
        {
          if (i >= 2){
            message.channel.send(reqContent);
          }
        }
}

//const channel = await bot.channels.fetch(id);

   // channel.messages.fetch().then((messages) =>
   // {
   //     for (var i = 0; i >= 0; i++)
  //     {
  //          setTimeout(() => channel.send(text), 3000 )
   //     }

        //channel.send(text).then(message => 
            //{
              //  addReactions(message,reactions)
            //})
   // })