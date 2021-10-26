const amqp_url = process.env.CLOUD_AMQP || "amqp://localhost:5672"

const sendResults = (result) => {
    const amqp = require('amqplib/callback_api')
    amqp.connect(amqp_url, function (err, connection) {
        if (err)
            throw err
        const queue = "task_result"
        connection.createChannel(function(err, channel) {
            if (err)
                throw err
            const msg = Buffer.from(JSON.stringify(result)).toString('base64')
            channel.sendToQueue(queue, Buffer.from(msg))
        })
        setTimeout(() => {
            connection.close()
        }, 10000)
    })
}

const RabbitService = {
    sendResults
}

module.exports = {
    RabbitService
}