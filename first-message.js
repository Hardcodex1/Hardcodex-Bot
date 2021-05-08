const addReactions = (message,reactions) => {
    message.react(reactions[0])
    reactions.shift()
    if (reactions.length > 0) {
        setTimeout(() => addReactions(message,reactions), 500)
    }
}

module.exports = async (bot, id, text, reactions = []) => 
{
    const channel = await bot.channels.fetch(id);

    channel.messages.fetch().then((messages) =>
    {
        channel.send(text).then(message => 
            {
                addReactions(message,reactions)
            })
    })
}