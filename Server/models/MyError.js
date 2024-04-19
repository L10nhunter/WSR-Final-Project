const {STATUS_CODES} = require("node:http");
class MyError extends Error {
    /**
     * @param {number} code
     * @param {string} message
     * @param {object} locationData
     */
    constructor(code, message, locationData) {
        super(message || STATUS_CODES[code]);
        if (arguments.length >= 3 && locationData) {
            Object.assign(this, locationData);
        }
        this.code = code;
    }
}
module.exports = MyError;