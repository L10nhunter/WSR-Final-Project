let Users = require("../data/users.json").items;

const express = require('express');
const app = express.Router();

app.get('/', (req, res) => {
    res.send(Users);
});

app.get('/:id', (req, res) => {
    const user = Users.find(user => user.id === parseInt(req.params["id"]));
    user ? res.send(user) : res.status(404).send('User not found');
});
app.patch('/:id', (req, res) => {
    const user = Users.find(user => user.id === parseInt(req.params["id"]));
    if(!user) res.status(404).send('User not found');
    for(let key in req.body) user[key] = req.body[key];
    res.send(user);
});
app.delete('/:id', (req, res) => {
    Users = Users.filter(user => user.id !== parseInt(req.params["id"]));
    res.send(Users);
});
module.exports = app;