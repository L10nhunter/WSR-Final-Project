const {STATUS_CODES} = require("node:http");
class MyError extends Error {
    /**
     * @param {number} status
     * @param {string} message
     */
    constructor(status, message) {
        super(message ?? STATUS_CODES[status]);
        const important = this.stack.split("\n")[1].split("WSR-Final-Project\\")[1].split(")")[0].split(":");
        this.status = status;
        this.locationData = {
            fileName: important[0],
            lineNum: important[1],
            charNum: important[2]
        };
    }
}
module.exports = MyError;