const Ajv = require('ajv')
const ajv = new Ajv()

const withTestsSchema = {
    type: 'object',
    properties: {
        code: { type: "string" },
        language: { type: "string" },
        testsType: {
            type: 'string',
            "enum": ["file", "testCases"]
        },
        tests: {
            oneOf: [
                {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            testCaseId: {
                                type: 'integer'
                            },
                            testData: {
                                oneOf: [
                                    {type: 'number'},
                                    {type: 'string'},
                                    {type: 'boolean'},
                                    {type: 'array'},
                                    {type: 'object'},
                                ]
                            }
                        },
                        required: ["testCaseId", "testData"]
                    }
                },
                {
                    type: 'object',
                    properties: {
                        fileName: { type: 'string' },
                        fileBase64: {type: 'string'}
                    },
                    required: ["fileName", "fileBase64"]
                }
            ]
        }
    },
    required: ["code", "language", "tests", "testsType"],
    additionalProperties: false
}

const validateWithTests = (data) => {
    const validate = ajv.compile(withTestsSchema)
    return validate(data)
}

module.exports = {
    validateWithTests
}