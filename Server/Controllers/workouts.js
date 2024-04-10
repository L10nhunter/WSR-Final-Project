const express = require('express');
const workouts = require('../models/workouts');
const {ObjectId} = require('mongodb');
const app = express.Router();
app
    .get('/', (req, res, next) => {
        "use strict";
        workouts.getAll()
            .then(workouts => res.send(workouts))
            .catch(err => res.status(err.cause.status).send(err.message))
            .finally(next);
    })
    .get('/search', (req, res, next) => {
        "use strict";
        workouts.search(req.query.q)
            .then(workouts => res.send(workouts))
            .catch(err => res.status(err.cause.status).send(err.message))
            .finally(next);
    })
    .post('/', (req, res, next) => {
        "use strict";
        workouts.create(req.body)
            .then(workout => res.send(workout))
            .catch(err => res.status(err.cause.status).send(err.message))
            .finally(next);
    })
    .get('/user/:uid',  (req, res, next) => {
        "use strict";
        workouts.getWorkoutsByUser(new ObjectId(req.params.uid))
            .then(byUser => res.send(byUser))
            .catch(err => res.status(err.cause.status).send(err.message))
            .finally(next);
    })
    .get('/:id', (req, res, next) => {
        "use strict";
        workouts.get(new ObjectId(req.params.id))
            .then(workout => res.send(workout))
            .catch(err => res.status(err.cause.status).send(err.message))
            .finally(next);
    })
    .patch('/:id', (req, res, next) => {
        "use strict";
        workouts.update(new ObjectId(req.params.id), req.body)
            .then(workout => res.send(workout))
            .catch(err => res.status(err.cause.status).send(err.message))
            .finally(next);
    })
    .delete('/:id', (req, res, next) => {
        "use strict";
        workouts.destroy(new ObjectId(req.params.id))
            .then(workout => res.send(workout))
            .catch(err => res.status(err.cause.status).send(err.message))
            .finally(next);
    });

module.exports = app;