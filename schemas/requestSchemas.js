const { validate } = require("../utils/schemaValidator")

const withTestsSchema = {
    type: 'object',
    properties: {
        code: { type: "string" },
        language: { type: "string" }
    },
    oneOf: [
        {
            properties: {
                testsType: {"const": "file"},
                tests: {
                    type: 'object',
                    properties: {
                        fileName: { type: 'string' },
                        fileBase64: {type: 'string'}
                    },
                    required: ["fileName", "fileBase64"]
                }
            }
        },
        {
            properties: {
                testsType: {"const": "testCases"},
                tests: {
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
                            },
                            expectedResult: {
                                oneOf: [
                                    {type: 'number'},
                                    {type: 'string'},
                                    {type: 'boolean'},
                                    {type: 'array'},
                                    {type: 'object'},
                                ]
                            }
                        },
                        required: ["testCaseId", "testData", "expectedResult"]
                    }
                }
            }
        }
    ],
    required: ["code", "language", "tests", "testsType"]
}

const validateWithTests = (data) => validate(withTestsSchema, data)

module.exports = {
    validateWithTests
}
