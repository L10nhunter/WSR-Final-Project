const DB = require('../models/users');
const express = require('express');
MyError = require("../models/MyError");
const {ObjectId} = require("mongodb");
const app = express.Router();
const devMode = process.env.NODE_ENV === 'development';

app
    .get('/', async (req, res, next) => {
        "use strict";
        /**@type {DataListEnvelope<User>} */
        let envelope;
        try {
            const users = await DB.getAll();
            envelope = {
                data: users,
                totalItems: users.length,
                pageLimit: 30,
            };
            res.send(envelope);
        } catch (err) {
            if (devMode) {
                envelope = {
                    data: [],
                    message: err.message,
                    status: err instanceof MyError ? err.status : 500,
                    error: err instanceof MyError ? err : new MyError(500, err.message)
                };
                console.trace();
                res.status(envelope.status).send(envelope);
            } else (next(err));
        }
    })
    .get('/search', async (req, res, next) => {
        "use strict";
        /**@type {DataListEnvelope<User>} */
        let envelope;
        try {
            const users = await DB.search(req.query.q);
            envelope = {
                data: users,
                totalItems: users.length,
                pageLimit: 30,
            };
            res.send(envelope);
        } catch (err) {
            if (devMode) {
                envelope = {
                    data: [],
                    message: err.message,
                    status: err instanceof MyError ? err.status : 500,
                    error: err instanceof MyError ? err : new MyError(500, err.message)
                };
                res.status(envelope.status).send(envelope);
            } else (next(err));
        }
    })
    .post('/', async (req, res, next) => {
        "use strict";
        try {
            const user = await DB.create(req.body);
            /**@type {DataEnvelope<User>} */
            const envelope = {
                data: user,
                status: 200
            };
            res.send(envelope);
        } catch (err) {
            if (devMode) {
                /**@type {DataEnvelope<User>} */
                const envelope = {
                    data: null,
                    message: err.message,
                    status: err instanceof MyError ? err.status : 500,
                    error: err instanceof MyError ? err : new MyError(500, err.message)
                };
                res.status(envelope.status).send(envelope);
            } else (next(err));
        }
    })
    .post('/login', async (req, res, next) => {
        "use strict";
        try {
            const user = await DB.login(req.body.emailOrUsername, req.body.password);
            /**@type {DataEnvelope<User>} */
            const envelope = {
                data: user,
            };
            res.send(envelope);
        } catch (err) {
            if (devMode) {
                /**@type {DataEnvelope<User>} */
                const envelope = {
                    data: null,
                    message: err.message,
                    status: err instanceof MyError ? err.status : 404,
                    error: err instanceof MyError ? err : new MyError(404, err.message)
                };
                res.status(envelope.status).send(envelope);
            } else (next(err));
        }
    });

app
    //TODO: add safeguard to strain data if user isnt an admin or session user isnt the user making the call
    .get('/:id', async (req, res, next) => {
        "use strict";
        try {
            const user = await DB.get(new ObjectId(req.params.id));
            /**@type {DataEnvelope<User>} */
            const envelope = {
                data: user,
            };
            res.send(envelope);
        } catch (err) {
            if (devMode) {
                /**@type {DataEnvelope<User>} */
                const envelope = {
                    data: null,
                    message: err.message,
                    error: err instanceof MyError ? err : new MyError(500, err.message)
                };
                res.status(err instanceof MyError ? err.status : 500).send(envelope);
            } else (next(err));
        }
    })
    .patch('/:id', async (req, res, next) => {
        "use strict";
        try {
            const user = await DB.update(new ObjectId(req.params.id), req.body);
            /**@type {DataEnvelope<User>} */
            const envelope = {
                data: user,
            };
            res.send(envelope);
        } catch (err) {
            if (devMode) {
                /**@type {DataEnvelope<User>} */
                const envelope = {
                    data: null,
                    message: err.message,
                    status: err instanceof MyError ? err.status : 404,
                    error: err instanceof MyError ? err : new MyError(404, err.message)
                };
                res.status(envelope.status).send(envelope);
            } else (next(err));
        }

    })
    .delete('/:id', async (req, res, next) => {
        "use strict";
        try {
            const user = await DB.destroy(new ObjectId(req.params.id));
            /**@type {DataEnvelope<User>} */
            const envelope = {
                data: user,
            };
            res.send(envelope);
        } catch (err) {
            if (devMode) {
                /**@type {DataEnvelope<User>} */
                const envelope = {
                    data: null,
                    message: err.message,
                    status: err instanceof MyError ? err.status : 404,
                    error: err instanceof MyError ? err : new MyError(404, err.message)
                };
                res.status(envelope.status).send(envelope);
            } else (next(err));
        }
    });
module.exports = app;