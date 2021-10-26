const {jestTimeout} = require("../utils/constants");

const amqp_url = process.env.CLOUD_AMQP || "amqp://localhost:5672"

const amqp = require('amqplib/callback_api')
const request = require("supertest");
const app = require("../app");


const consume = (doneCb) => {
    amqp.connect(amqp_url, function (err0, connection) {
        if (err0)
            throw err0
        connection.createChannel(function (err1, channel) {
            if (err1)
                throw err1
            const queue = "task_result"
            channel.assertQueue(queue, {
                durable: true
            })
            channel.consume(queue, msg => {
                const message = Buffer.from(msg.content.toString(), 'base64')
                const response = JSON.parse(message.toString())
                const results = JSON.parse(response.results)
                expect(results.length).toBe(2)
                expect(results[0].passed).toBe(true)
                expect(results[0].result).toBe('xd')
                expect(results[1].passed).toBe(true)
                expect(results[1].result).toBe('other xd')

                expect(response.solverId).toBe(exampleTest.solverId)
                expect(response.taskId).toBe(exampleTest.taskId)

                channel.ack(msg)
                doneCb()
            })
        })
        setTimeout(function() {
            connection.close();
            process.exit(0);
        }, 500);
    })
}


describe("rabbit should work properly", () => {

    it("should send results to rabbit", done => {
        request(app)
            .post('/with_tests')
            .send(exampleTest)
            .then(response => {
                expect(response.statusCode).toBe(200)
                consume(done)
            })
            .catch(err => done())
    }, jestTimeout)
})

const exampleTest = {
    "solverId": "e3252363-4204-42ad-8ad9-fe3be661ef86",
    "taskId": "44",
    "language": "python",
    "code": "inp = input()\nprint(inp)",
    "tests": [
        {
            "testCaseId": 1,
            "testData": "xd",
            "expectedResult": "xd"
        },
        {
            "testCaseId": 2,
            "testData": "other xd",
            expectedResult: "other xd"
        }
    ],
    "testsType": "testCases"
}


