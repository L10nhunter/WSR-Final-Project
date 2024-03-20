const workouts = require('../data/workouts').items;

const express = require('express');
const app = express.Router();

function getWorkoutsByUser(userid){
    return workouts.filter(workout => workout.user.id === userid);
}

app.get('/', (req, res) => {
    res.send(workouts);
});
app.get('/:userid', (req, res) => {
    const userWorkouts = getWorkoutsByUser(parseInt(req.params.userid));
    userWorkouts.length > 0 ? res.send(userWorkouts) : res.status(404).send('User not found');
});
app.get('/:userid/:id', (req, res) => {
    const userWorkouts = getWorkoutsByUser(parseInt(req.params.userid));
    for(let workout of userWorkouts){ console.log(workout.id, req.params.id, ); }
    const workout = userWorkouts.find(workout => workout.id === parseInt(req.params.id));
    workout ? res.send(workout) : res.status(404).send('Workout not found');
});
app.post('/', (req, res) => {
    const workout = req.body;
    const userWorkouts = getWorkoutsByUser(workout.user.id);
    workout.id = userWorkouts.length + 1;
    workouts.push(workout);
    res.send(workout);
});
app.patch('/:id', (req, res) => {
    const workout = workouts.find(workout => workout.id === parseInt(req.params.id));
    if(!workout) res.status(404).send('Workout not found');
    for(let key in req.body) workout[key] = req.body[key];
    res.send(workout);
});
app.delete('/:id', (req, res) => {
    workouts.items = workouts.filter(workout => workout.id !== parseInt(req.params.id));
    res.send(workouts);
});

module.exports = app;