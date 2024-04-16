const status = require('http-status');
class MyError extends Error {
    /**
     * @param {number} code
     * @param {string} message
     * @param {object} locationData
     */
    constructor(code, message, locationData) {
        super(message || status[code]);
        if (arguments.length >= 3 && locationData) {
            Object.assign(this, locationData);
        }
        this.code = status[code];
    }

}
module.exports = MyError;