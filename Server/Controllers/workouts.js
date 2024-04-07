const express = require('express');
const app = express.Router();
const workouts = require('../models/workouts');
const {ObjectId} = require("mongodb");
app
    .get('/', (req, res) => {
        workouts.getAll()
            .then(workouts => res.send(workouts))
            .catch(err => res.status(err.cause.status).send(err.message));
    })
    .get('/user',  (req, res) => {
        workouts.getWorkoutsByUser(new ObjectId(req.query.uid))
            .then(byUser => res.send(byUser))
            .catch(err => res.status(err.cause.status).send(err.message));
    })
    .get('/search', (req, res) => {
        workouts.search(req.query.q)
            .then(workouts => res.send(workouts))
            .catch(err => res.status(err.cause.status).send(err.message));
    })
    .post('/', (req, res) => {
        workouts.create(req.body)
            .then(workout => res.send(workout))
            .catch(err => res.status(err.cause.status).send(err.message));
    })
    .patch('/:id', (req, res) => {
        workouts.update(new ObjectId(req.params.id), req.body)
            .then(workout => res.send(workout))
            .catch(err => res.status(err.cause.status).send(err.message));
    })
    .delete('/:id', (req, res) => {
        workouts.destroy(new ObjectId(req.params.id))
            .then(workout => res.send(workout))
            .catch(err => res.status(err.cause.status).send(err.message));
    });

module.exports = app;