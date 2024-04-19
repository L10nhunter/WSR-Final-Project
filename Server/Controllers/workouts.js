const express = require('express');
const workouts = require('../models/workouts');
const {ObjectId} = require('mongodb');
const {MyError} = require("../models/MyError.js");
const app = express.Router();
app
    .get('/', (req, res, next) => {
        "use strict";
        workouts.getAll()
            .then(workouts => {
                /**@type {DataListEnvelope<Workout>} */
                const envelope = {
                    data: workouts,
                    pageLimit: 30,
                    isSuccessful: true,
                    message: 'Success',
                    status: 200
                };
                res.send(envelope);
            })
            .catch(err => {
                /**@type {DataListEnvelope<Workout>} */
                const envelope = {
                    data: [],
                    pageLimit: 30,
                    isSuccessful: false,
                    message: err.message,
                    status: err instanceof MyError ? err.code : 500
                };
                res.status(envelope.status).send(envelope);
            })
            .finally(next);
    })
    .get('/search', (req, res, next) => {
        "use strict";
        workouts.search(req.query.q)
            .then(workouts => {
                /**@type {DataListEnvelope<Workout>} */
                const envelope = {
                    data: workouts,
                    pageLimit: 30,
                    isSuccessful: true,
                    message: 'Success',
                    status: 200
                };
                res.send(envelope);
            })
            .catch(err => {
                /**@type {DataListEnvelope<Workout>} */
                const envelope = {
                    data: [],
                    pageLimit: 30,
                    isSuccessful: false,
                    message: err.message,
                    status: err instanceof MyError ? err.code : 500
                };
                res.status(envelope.status).send(envelope);
            })
            .finally(next);
    })
    .post('/', (req, res, next) => {
        "use strict";
        workouts.create(req.body)
            .then(workout => {
                /**@type {DataEnvelope<Workout>} */
                const envelope = {
                    data: workout,
                    isSuccessful: true,
                    message: 'Success',
                    status: 200
                };
                res.send(envelope);
            })
            .catch(err => {
                /**@type {DataEnvelope<Workout>} */
                const envelope = {
                    isSuccessful: false,
                    message: err.message,
                    status: err instanceof MyError ? err.code : 500
                };
                res.status(envelope.status).send(envelope);
            })
            .finally(next);
    })
    .get('/user/:uid', (req, res, next) => {
        "use strict";
        workouts.getWorkoutsByUser(new ObjectId(req.params.uid))
            .then(workouts => {
                /**@type {DataListEnvelope<Workout>} */
                const envelope = {
                    data: workouts,
                    pageLimit: 30,
                    isSuccessful: true,
                    message: 'Success',
                    status: 200
                };
                res.send(envelope);
            })
            .catch(err => {
                /**@type {DataListEnvelope<Workout>} */
                const envelope = {
                    data: [],
                    pageLimit: 30,
                    isSuccessful: false,
                    message: err.message,
                    status: err instanceof MyError ? err.code : 500
                };
                res.status(envelope.status).send(envelope);
            })
            .finally(next);
    })
    .get('/:id', (req, res, next) => {
        "use strict";
        workouts.get(new ObjectId(req.params.id))
            .then(workout => {
                /**@type {DataEnvelope<Workout>} */
                const envelope = {
                    data: workout,
                    isSuccessful: true,
                    message: 'Success',
                    status: 200
                };
                res.send(envelope);
            })
            .catch(err => {
                /**@type {DataEnvelope<Workout>} */
                const envelope = {
                    isSuccessful: false,
                    message: err.message,
                    status: err instanceof MyError ? err.code : 500
                };
                res.status(envelope.status).send(envelope);
            })
            .finally(next);
    })
    .patch('/:id', (req, res, next) => {
        "use strict";
        workouts.update(new ObjectId(req.params.id), req.body)
            .then(workout => {
                /**@type {DataEnvelope<Workout>} */
                const envelope = {
                    data: workout,
                    isSuccessful: true,
                    message: 'Success',
                    status: 200
                };
                res.send(envelope);
            })
            .catch(err => {
                /**@type {DataEnvelope<Workout>} */
                const envelope = {
                    isSuccessful: false,
                    message: err.message,
                    status: err instanceof MyError ? err.code : 500
                };
                res.status(envelope.status).send(envelope);
            })
            .finally(next);
    })
    .delete('/:id', (req, res, next) => {
        "use strict";
        workouts.destroy(new ObjectId(req.params.id))
            .then(workout => {
                /**@type {DataEnvelope<Workout>} */
                const envelope = {
                    data: workout,
                    isSuccessful: true,
                    message: 'Success',
                    status: 200
                };
                res.send(envelope);
            })
            .catch(err => {
                /**@type {DataEnvelope<Workout>} */
                const envelope = {
                    isSuccessful: false,
                    message: err.message,
                    status: err instanceof MyError ? err.code : 500
                };
                res.status(envelope.status).send(envelope);
            })
            .finally(next);
    });

module.exports = app;