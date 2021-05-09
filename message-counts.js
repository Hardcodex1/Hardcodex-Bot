const mongo = require('./mongo')
const messageCountSchema = require('./scemes/message-count-schema')

module.exports = (bot) => {
  bot.on('message', async (message) => {
    const { author } = message
    const { id } = author

    await mongo().then(async (mongoose) => {
      try {
        await messageCountSchema
          .findOneAndUpdate(
            {
              _id: id,
            },
            {
              $inc: {
                messageCount: 1,
              },
            },
            {
              upsert: true,
            }
          )
          .exec()
      } finally {
        mongoose.connection.close()
      }
    })
  })
}