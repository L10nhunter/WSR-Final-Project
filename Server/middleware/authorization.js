const {verifyToken} = require('../models/users');

async function parseAuthToken(req, res, next) {
    "use strict";
    const token = req.headers.Authorization;
    if (!token) { next();
    } else {
        try {
            req.user = await verifyToken(token);
            next();
        } catch (ex) { res.status(400).send('Invalid token.'); }
    }
}

module.exports = {
    parseAuthToken
};