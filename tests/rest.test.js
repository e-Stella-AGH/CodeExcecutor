const app = require('../app')
const request = require('supertest')
const {jestTimeout} = require("../utils/constants");

describe("Tests on rest endpoints", () => {

    it("should pass all tests", done => {
        request(app)
            .post('/with_tests')
            .send(exampleTest)
            .then(response => {
                expect(response.statusCode).toBe(200)
                const body = response.body
                expect(body[0].passed).toBe(true)
                expect(body[0].err).toBeFalsy()
                expect(body[0].testCaseId).toBe(1)

                expect(body[1].passed).toBe(true)
                expect(body[1].err).toBeFalsy()
                expect(body[1].testCaseId).toBe(2)

                done()
            })
            .catch(err => done())
    }, jestTimeout)

    it("shouldn't pass all tests", done => {
        request(app)
            .post('/with_tests')
            .send(moreComplicatedTest)
            .then(response => {
                expect(response.statusCode).toBe(200)
                const body = response.body
                expect(body[0].passed).toBe(true)
                expect(body[0].testCaseId).toBe(1)
                expect(body[0].err).toBeFalsy()

                expect(body[1].passed).toBe(true)
                expect(body[1].err).toBeFalsy()
                expect(body[1].testCaseId).toBe(2)

                expect(body[2].passed).toBe(false)
                expect(body[2].err).toBeFalsy()
                expect(body[2].testCaseId).toBe(3)

                done()
            })
            .catch(err => done())
    }, jestTimeout)

    it("should show compilation errors", done => {
        request(app)
            .post('/with_tests')
            .send(compilationErrorTest)
            .expect(200)
            .then(response => {
                expect(response.statusCode).toBe(200)
                const body = response.body
                expect(body[0].err).toBeTruthy()
                done()
            })
            .catch(err => done())
    }, jestTimeout)

    it("should execute tests from proper file", done => {
        request(app)
            .post('/with_tests')
            .send(properFileTest)
            .expect(200)
            .then(response => {
                expect(response.statusCode).toBe(200)
                const body = response.body
                expect(body[0].passed).toBe(true)
                expect(body[1].passed).toBe(true)
                done()
            })
            .catch(err => done())
    }, jestTimeout)

    it("should return bad request with invalid json file", done => {
        request(app)
            .post('/with_tests')
            .send(invalidJson)
            .expect(200)
            .then(response => {
                expect(response.statusCode).toBe(400)
                done()
            })
            .catch(err => done())
    })

    it("should return bad request with invalid schema", done => {
        request(app)
            .post('/with_tests')
            .send(invalidSchema)
            .then(response => {
                expect(response.statusCode).toBe(400)
                done()
            })
            .catch(err => done())
    })

})

const exampleTest = {
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

const moreComplicatedTest = {
    "language": "python",
    "code": "x = input()\nprint(x**2)",
    "tests": [
        {
            "testCaseId": 1,
            "testData": 2,
            "expectedResult": "4"
        },
        {
            "testCaseId": 2,
            "testData": 4,
            "expectedResult": "16"
        },
        {
            "testCaseId": 3,
            "testData": 5,
            "expectedResult": "16"    //this test is bullshit for purpose
        },
    ],
    "testsType": "testCases"
}

const compilationErrorTest = {
    "language": "python",
    "code": "inp = input()\n  print(inp)",
    "tests": [
        {
            "testCaseId": 1,
            "testData": "xd",
            "expectedResult": "xd"
        }
    ],
    "testsType": "testCases"
}

const invalidSchema = {
    "language": "python",
    "tests": [
        {
            "testCaseId": 1,
            "testData": "xd",
            "expectedResult": "xd"
        }
    ],
    "testsType": "testCases"
}

const properFileTest = {
    "language": "python",
    "code": "x=input()\nprint(x**2)",
    "tests": {
        "fileName": "testcase.txt",
        "fileBase64": "Ww0KICB7DQogICAgInRlc3RDYXNlSWQiOiAxLA0KICAgICJ0ZXN0RGF0YSI6IDIsDQogICAgImV4cGVjdGVkUmVzdWx0IjogIjQiDQogIH0sDQogIHsNCiAgICAidGVzdENhc2VJZCI6IDIsDQogICAgInRlc3REYXRhIjogNCwNCiAgICAiZXhwZWN0ZWRSZXN1bHQiOiAiMTYiDQogIH0NCl0="
    },
    "testsType": "file"
}

const invalidJson = {
    "language": "python",
    "code": "x=input()\nprint(x**2)",
    "tests": {
        "fileName": "testcase.txt",
        "fileBase64": "Ww0KICB7DQogICAgInRlc3RDYXNlSWQiOiAxLA0KICAgICJ0ZXN0RGF0YSI6IDIsDQogICAgImV4cGVjdGVkUmVzdWx0IjogIjQiDQogIH0sDQogIHsNCiAgICAidGVzdENhc2VJZCI6IDIsDQogICAgInRlc3REYXRhIjogNCwNCiAgICAiZXhwZWN0ZWRSZXN1bHQiOiAiMTYiDQogIH0="
    },
    "testsType": "file"
}