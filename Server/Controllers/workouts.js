const express = require('express');
const app = express.Router();
const workouts = require('../models/workouts');
app
    .get('/', (req, res) => {
        workouts.getAll()
            .then(workouts => res.send(workouts))
            .catch(err => res.status(500).send(err));
    })
    .get('/user',  (req, res) => {
        workouts.getWorkoutsByUser(parseInt(req.query.uid))
            .then(byUser => byUser ? res.send(byUser) : res.status(404).send("User not found"))
            .catch(err => res.status(500).send(err));
    })
    .get('/search', (req, res) => {
        workouts.search(req.query.q).then(workouts => res.send(workouts)).catch(err => res.status(500).send(err));
    })

    .post('/', (req, res) => {
        workouts.create(req.body).then(workout => res.send(workout)).catch(err => res.status(500).send(err));
    })
    .patch('/:id', (req, res) => {
        workouts.update(parseInt(req.params.id), req.body).then(workout => workout ? res.send(workout) : res.status(404).send('Workout not found')).catch(err => res.status(500).send(err));
    })
    .delete('/:id', (req, res) => {
        workouts.destroy(parseInt(req.params.id)).then(workout => workout ? res.send(workout) : res.status(404).send('Workout not found')).catch(err => res.status(500).send(err));
    });

module.exports = app;