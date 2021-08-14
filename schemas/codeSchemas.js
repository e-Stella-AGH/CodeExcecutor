const { validate } = require("../utils/schemaValidator")

const codeSchema = {
    type: 'object',
    properties: {
        language: { type: 'string' },
        code: { type: 'string' },
        input: { type: 'string' },
        expectedResult: { type: 'string' }
    },
    required: ["language", "code", "input"]
}

const validateCodeSchema = (data) => validate(codeSchema, data)

module.exports = {
    validateCodeSchema
}