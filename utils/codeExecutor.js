const { validateCodeSchema } = require('../schemas/codeSchemas')
const paiza_io = require("paiza-io")

const execute = (data) => {
    return new Promise((resolve, reject) => {
        _execute(data, (successResponse) => resolve(successResponse), (errorResponse) => reject(errorResponse))
    })
}

const _execute = (data, successCallback, errorCallback) => {

    if(!validateCodeSchema(data)) {
        throw Error("Code schema is wrong!")
    }

    paiza_io(data.language, data.code, data.input, (err, result) => {
        if(err) {
            errorCallback(err.message)
        }
        successCallback({
            err: result.stderr,
            result: result.stdout.trim(),
            expected: data.expectedResult.trim(),
            passed: result.stdout.trim() == data.expectedResult.trim()
        })
    })
}

const codeExecutor = {
    execute
}

module.exports = {
    codeExecutor
}