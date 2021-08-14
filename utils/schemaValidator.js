const Ajv = require('ajv')
const ajv = new Ajv()

const validate = (schema, data) => {
    const _validate = ajv.compile(schema)
    return _validate(data)
}

module.exports = {
    validate
}