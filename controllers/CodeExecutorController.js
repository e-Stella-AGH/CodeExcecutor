const { validateWithTests } = require('../utils/schemas')

const executeFromFile = (data) => {
    return "Holy shit..."
}

const executeFromTests = (data) => {
    return "uff"
}

const executeWithTests = async (data) => {
    if(!validateWithTests(data)) {
        console.log(`Data ${data} wasn't valid with 'withTestsSchema'`)
        throw Error("Schema wasn't valid!")
    }
    return typeof data.testsType === 'file' ? executeFromFile(data) : executeFromTests(data);
}

const CodeExecutorController = {
    executeWithTests
}

module.exports = {
    CodeExecutorController
}