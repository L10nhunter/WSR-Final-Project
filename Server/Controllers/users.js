const DB = require('../models/users');
const express = require('express');
MyError = require("../models/MyError");
const {ObjectId} = require("mongodb");
const app = express.Router();
const devMode = process.env.NODE_ENV === 'development';

app
    .get('/', async (req, res, next) => {
        "use strict";
        try {
            const users = await DB.getAll();
            /**@type {DataListEnvelope<User>} */
            const envelope = {
                data: users,
                pageLimit: 30,
                isSuccessful: true,
                message: 'Success',
                status: 200
            };
            res.send(envelope);
        } catch (err) {
            if (devMode) {
                /**@type {DataListEnvelope<User>} */
                const envelope = {
                    data: [],
                    pageLimit: 30,
                    isSuccessful: false,
                    message: err.message,
                    status: err instanceof MyError ? err.code : 500
                };
                res.status(envelope.status).send(envelope);
            } else (next(err));
        }
    })
    .get('/search', async (req, res, next) => {
        "use strict";
        try {
            const users = await DB.search(req.query.q);
            /**@type {DataListEnvelope<User>} */
            const envelope = {
                data: users,
                pageLimit: 30,
                isSuccessful: true,
                message: 'Success',
                status: 200
            };
            res.send(envelope);
        } catch (err) {
            if (devMode) {
                /**@type {DataListEnvelope<User>} */
                const envelope = {
                    data: [],
                    pageLimit: 30,
                    isSuccessful: false,
                    message: err.message,
                    status: err instanceof MyError ? err.code : 500
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
                isSuccessful: true,
                message: 'Success',
                status: 200
            };
            res.send(envelope);
        } catch (err) {
            if (devMode) {
                /**@type {DataEnvelope<User>} */
                const envelope = {
                    data: null,
                    isSuccessful: false,
                    message: err.message,
                    status: err instanceof MyError ? err.code : 500
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
                isSuccessful: true,
                message: 'Success',
                status: 200
            };
            res.send(envelope);
        } catch (err) {
            if (devMode) {
                /**@type {DataEnvelope<User>} */
                const envelope = {
                    data: null,
                    isSuccessful: false,
                    message: err.message,
                    status: err instanceof MyError ? err.code : 404
                };
                res.status(envelope.status).send(envelope);
            } else (next(err));
        }
    });

app
    .get('/:id', async (req, res, next) => {
        "use strict";
        try {
            const user = await DB.get(new ObjectId(req.params.id));
            /**@type {DataEnvelope<User>} */
            const envelope = {
                data: user,
                isSuccessful: true,
                message: 'Success',
                status: 200
            };
            res.send(envelope);
        } catch (err) {
            if (devMode) {
                /**@type {DataEnvelope<User>} */
                const envelope = {
                    data: null,
                    isSuccessful: false,
                    message: err.message,
                    status: err instanceof MyError ? err.code : 404
                };
                res.status(envelope.status).send(envelope);
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
                isSuccessful: true,
                message: 'Success',
                status: 200
            };
            res.send(envelope);
        } catch (err) {
            if (devMode) {
                /**@type {DataEnvelope<User>} */
                const envelope = {
                    data: null,
                    isSuccessful: false,
                    message: err.message,
                    status: err instanceof MyError ? err.code : 404
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
                isSuccessful: true,
                message: 'Success',
                status: 200
            };
            res.send(envelope);
        } catch (err) {
            if (devMode) {
                /**@type {DataEnvelope<User>} */
                const envelope = {
                    data: null,
                    isSuccessful: false,
                    message: err.message,
                    status: err instanceof MyError ? err.code : 404
                };
                res.status(envelope.status).send(envelope);
            } else (next(err));
        }
    });
module.exports = app;