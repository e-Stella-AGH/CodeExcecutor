const { validateWithTests } = require('../schemas/requestSchemas')
const { codeExecutor } = require('../utils/codeExecutor')
const { Buffer } = require('buffer')
const { validateTestsSchema } = require('../schemas/testsSchema')

const execute = async (data) => {
    const _data = {
        input: JSON.stringify(data.input),
        language: data.language,
        code: data.code,
        expectedResult: data.expectedResult
    }
    return await codeExecutor.execute(_data)
}

const executeFromFile = async (data) => {
    const tests = JSON.parse(Buffer.from(data.tests.fileBase64, "base64").toString('ascii'))
    if (!validateTestsSchema(tests)) throw Error("File with tests isn't in agreement with schema!")
    return await executeFromTests({
        ...data,
        tests: tests
    })
}

const executeFromTests = async (data) => {
    return await Promise.all(data.tests.map(test => {
        return execute({
            language: data.language,
            code: data.code,
            input: test.testData,
            expectedResult: test.expectedResult
        }).then(result => {
            return {
                ...result,
                testCaseId: test.testCaseId
            }
        }).catch(err => err)
    }))
}

const executeWithTests = async (data) => {
    if(!validateWithTests(data)) {
        console.log(`Data ${data} wasn't valid with 'withTestsSchema'`)
        throw Error("Schema wasn't valid!")
    }
    return data.testsType === 'file' ? executeFromFile(data) : executeFromTests(data);
}

const CodeExecutorService = {
    executeWithTests
}

module.exports = {
    CodeExecutorService: CodeExecutorService
}