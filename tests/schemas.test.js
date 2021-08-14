const { validateWithTests } = require('../schemas/requestSchemas')

describe("should properly validate schemas", () => {

    it("should validate good schema", () => {
        const data = {
            code: "sample code",
            language: "python",
            tests: [{testCaseId: 1, testData: 1, expectedResult: "1"}],
            testsType: "testCases"
        }
        expect(validateWithTests(data)).toBe(true)
    })

    it("should validate good schema with array as test data", () => {
        const data = {
            code: "sample code",
            language: "python",
            tests: [{testCaseId: 1, testData: [1, 2, 3], expectedResult: "1"}],
            testsType: "testCases"
        }
        expect(validateWithTests(data)).toBe(true)
    })

    it("should validate good schema with object as test data", () => {
        const data = {
            code: "sample code",
            language: "python",
            tests: [{testCaseId: 1, testData: {"foo": "bar"}, expectedResult: "1"}],
            testsType: "testCases"
        }
        expect(validateWithTests(data)).toBe(true)
    })

    it("should not validate schema without code", () => {
        const data = {
            language: "python",
            tests: [{testCaseId: 1, testData: {"foo": "bar"}, expectedResult: "1"}],
            testsType: "testCases"
        }
        expect(validateWithTests(data)).toBe(false)
    })

    it("should not validate schema without language", () => {
        const data = {
            code: "sample code",
            tests: [{testCaseId: 1, testData: {"foo": "bar"}, expectedResult: "1"}],
            testsType: "testCases"
        }
        expect(validateWithTests(data)).toBe(false)
    })

    it("should not validate schema without tests", () => {
        const data = {
            code: "sample code",
            language: "python",
            testsType: "testCases"
        }
        expect(validateWithTests(data)).toBe(false)
    })

    it("should not validate schema without testsType", () => {
        const data = {
            code: "sample code",
            language: "python",
            tests: [{testCaseId: 1, testData: {"foo": "bar"}, expectedResult: "1"}]
        }
        expect(validateWithTests(data)).toBe(false)
    })

    it("should not validate schema with tests without testCaseId", () => {
        const data = {
            code: "sample code",
            language: "python",
            tests: [{testData: {"foo": "bar"}, expectedResult: "1"}],
            testsType: "testCases"
        }
        expect(validateWithTests(data)).toBe(false)
    })

    it("should not validate schema with tests without testData", () => {
        const data = {
            code: "sample code",
            language: "python",
            tests: [{testCaseId: 1, expectedResult: "1"}],
            testsType: "testCases"
        }
        expect(validateWithTests(data)).toBe(false)
    })

    it("should validate good schema with file as tests", () => {
        const data = {
            code: "sample code",
            language: "python",
            tests: {fileName: 'fileName', fileBase64: 'fileBase64'},
            testsType: "file"
        }
        expect(validateWithTests(data)).toBe(true)
    })

    it("shouldn't validate schema with testsType as something other than file or testCases", () => {
        const data = {
            code: "sample code",
            language: "python",
            tests: {fileName: 'fileName', fileBase64: 'fileBase64'},
            testsType: "garbage"
        }
        expect(validateWithTests(data)).toBe(false)
    })

    it("shouldn't validate schema with testsType not in agreement with tests", () => {
        const data = {
            code: "sample code",
            language: "python",
            tests: {fileName: 'fileName', fileBase64: 'fileBase64'},
            testsType: "testCases"
        }
        expect(validateWithTests(data)).toBe(false)
    })

})