const {codeExecutor} = require("../utils/codeExecutor")

describe("Code executor should work properly", () => {

    it("should return true, when code is ok", async () => {
        const data = {
            language: 'python',
            code: "inp = input()\n" +
                "print(inp)",
            input: "\"xd\"",
            expectedResult: "xd"
        }

        const result = await codeExecutor.execute(data)

        expect(result.passed).toBe(true)
        expect(result.err).toBeFalsy()
    })

    it("should return false, if test didn't pass", async () => {
        const data = {
            language: 'python',
            code: "inp = input()\n" +
                "print(inp)",
            input: "\"xd\"",
            expectedResult: "other xd"
        }

        const result = await codeExecutor.execute(data)

        expect(result.passed).toBe(false)
        expect(result.err).toBeFalsy()
    })

    it("should show compilation error, if there's one", async () => {
        const data = {
            language: 'python',
            code: "inp = input()\n" +
                " print(inp)", //-> makes python intendation error
            input: "\"xd\"",
            expectedResult: "other xd"
        }

        const result = await codeExecutor.execute(data)

        expect(result.err).toBeTruthy()
    })

    it("should execute more complicated code", async () => {
        const data = {
            language: 'python',
            code: "x = input()\n" +
                "print(x**2)",
            input: 2,
            expectedResult: "4"
        }

        const result = await codeExecutor.execute(data)

        expect(result.passed).toBe(true)
        expect(result.err).toBeFalsy()
    })

})