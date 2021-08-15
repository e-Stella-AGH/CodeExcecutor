const { validate } = require('../utils/schemaValidator')

const testsSchema = {
    type: 'array',
    items: {
        type: 'object',
        properties: {
            testCaseId: {type: 'number'},
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
                type: 'string'
            }
        },
        required: ["testCaseId", "testData", "expectedResult"]
    }
}

const validateTestsSchema = (data) => {
    return validate(testsSchema, data)
}

module.exports = {
    validateTestsSchema
}