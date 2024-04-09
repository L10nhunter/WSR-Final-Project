const express = require('express');
const workouts = require('../models/workouts');
const {ObjectId} = require('mongodb');
const app = express.Router();
app
    .get('/', (req, res, next) => {
        workouts.getAll()
            .then(workouts => res.send(workouts))
            .catch(err => res.status(err.cause.status).send(err.message))
            .finally(next);
    })
    .get('/search', (req, res, next) => {
        workouts.search(req.query.q)
            .then(workouts => res.send(workouts))
            .catch(err => res.status(err.cause.status).send(err.message))
            .finally(next);
    })
    .post('/', (req, res, next) => {
        workouts.create(req.body)
            .then(workout => res.send(workout))
            .catch(err => res.status(err.cause.status).send(err.message))
            .finally(next);
    })
    .get('/user/:uid',  (req, res, next) => {
        workouts.getWorkoutsByUser(new ObjectId(req.params.uid))
            .then(byUser => res.send(byUser))
            .catch(err => res.status(err.cause.status).send(err.message))
            .finally(next);
    })
    .get('/:id', (req, res, next) => {
        workouts.get(new ObjectId(req.params.id))
            .then(workout => res.send(workout))
            .catch(err => res.status(err.cause.status).send(err.message))
            .finally(next);
    })
    .patch('/:id', (req, res, next) => {
        workouts.update(new ObjectId(req.params.id), req.body)
            .then(workout => res.send(workout))
            .catch(err => res.status(err.cause.status).send(err.message))
            .finally(next);
    })
    .delete('/:id', (req, res, next) => {
        workouts.destroy(new ObjectId(req.params.id))
            .then(workout => res.send(workout))
            .catch(err => res.status(err.cause.status).send(err.message))
            .finally(next);
    });


module.exports = app;