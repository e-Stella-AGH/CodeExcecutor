const {jestTimeout} = require("../utils/constants");
const { codeExecutor } = require("../utils/codeExecutor")

describe("Code executor should work properly", () => {

    jest.setTimeout(jestTimeout)

    it("should return true, when code is ok", done => {
        const data = {
            language: 'python',
            code: `
inp = input()
print(inp)
            `,
            input: "\"xd\"",
            expectedResult: "xd"
        }

        codeExecutor.execute(data).then(result => {
            expect(result.passed).toBe(true)
            expect(result.err).toBeFalsy()
            done()
        })
    }, 10000)

    it("should return false, if test didn't pass", done => {
        const data = {
            language: 'python',
            code: `
inp = input()
print(inp)
            `,
            input: "\"xd\"",
            expectedResult: "other xd"
        }

        codeExecutor.execute(data).then(result => {
            expect(result.passed).toBe(false)
            expect(result.err).toBeFalsy()
            done()
        })
    })

    it("should show compilation error, if there's one", done => {
        const data = {
            language: 'python',
            code: `
inp = input()
    print(inp)
            `, //-> makes python intendation error
            input: "\"xd\"",
            expectedResult: "other xd"
        }

        codeExecutor.execute(data).then(result => {
            expect(result.err).toBeTruthy()
            done()
        })
    })

    it("should execute more complicated code", done => {
        const data = {
            language: 'python',
            code: `
x = input() 
print(x**2)
            `,
            input: 2,
            expectedResult: "4"
        }

        codeExecutor.execute(data).then(result => {
            expect(result.passed).toBe(true)
            expect(result.err).toBeFalsy()
            done()
        })
    })

})