const express = require('express');
const DB = require('../models/workouts');
const {ObjectId} = require('mongodb');
MyError = require("../models/MyError.js");
const devMode = process.env.NODE_ENV === 'development';
const app = express.Router();
app
    .get('/', async (req, res, next) => {
        "use strict";
        /**@type {DataListEnvelope<Workout>} */
        let envelope = {pageLimit: 30};
        try {
            const workouts = await DB.getAll();
            envelope = {
                data: workouts,
                ...envelope,
                isSuccessful: true,
                message: 'Success',
                status: 200
            };
            res.send(envelope);
        } catch (err) {
            if (devMode) {
                envelope = {
                    data: [],
                    ...envelope,
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
        /**@type {DataListEnvelope<Workout>} */
        let envelope = {pageLimit: 30};
        try {
            const workouts = await DB.search(req.query.q);
            envelope = {
                data: workouts,
                ...envelope,
                isSuccessful: true,
                message: 'Success',
                status: 200
            };
            res.send(envelope);
        } catch (err) {
            if (devMode) {
                envelope = {
                    data: [],
                    ...envelope,
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
            const workout = await DB.create(req.body);
            /**@type {DataEnvelope<Workout>} */
            const envelope = {
                data: workout,
                isSuccessful: true,
                message: 'Success',
                status: 200
            };
            res.send(envelope);
        } catch (err) {
            if (devMode) {
                /**@type {DataEnvelope<Workout>} */
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
    .get('/user/:uid', async (req, res, next) => {
        "use strict";
        /**@type {DataListEnvelope<Workout>} */
        let envelope = {pageLimit: 30};
        try {
            const workouts = await DB.getWorkoutsByUser(new ObjectId(req.params.uid));
            envelope = {
                data: workouts,
                ...envelope,
                isSuccessful: true,
                message: 'Success',
                status: 200
            };
            res.send(envelope);
        } catch (err) {
            if (devMode) {
                envelope = {
                    data: [],
                    ...envelope,
                    isSuccessful: false,
                    message: err.message,
                    status: err instanceof MyError ? err.code : 500
                };
                res.status(envelope.status).send(envelope);
            } else (next(err));

        }
    })
    .get('/:id', async (req, res, next) => {
        "use strict";
        try {
            const workout = await DB.get(new ObjectId(req.params.id));
            /**@type {DataEnvelope<Workout>} */
            const envelope = {
                data: workout,
                isSuccessful: true,
                message: 'Success',
                status: 200
            };
            res.send(envelope);
        } catch (err) {
            if (devMode) {
                /**@type {DataEnvelope<Workout>} */
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
    .patch('/:id', async (req, res, next) => {
        "use strict";
        try {
            const workout = await DB.update(new ObjectId(req.params.id), req.body);
            /**@type {DataEnvelope<Workout>} */
            const envelope = {
                data: workout,
                isSuccessful: true,
                message: 'Success',
                status: 200
            };
            res.send(envelope);
        } catch (err) {
            if (devMode) {
                /**@type {DataEnvelope<Workout>} */
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
    .delete('/:id', async (req, res, next) => {
        "use strict";
        try {
            const workout = await DB.destroy(new ObjectId(req.params.id));
            /**@type {DataEnvelope<Workout>} */
            const envelope = {
                data: workout,
                isSuccessful: true,
                message: 'Success',
                status: 200
            };
            res.send(envelope);
        } catch (err) {
            if (devMode) {
                /**@type {DataEnvelope<Workout>} */
                const envelope = {
                    data: null,
                    isSuccessful: false,
                    message: err.message,
                    status: err instanceof MyError ? err.code : 500
                };
                res.status(envelope.status).send(envelope);
            } else (next(err));
        }
    });

module.exports = app;