const users = require('../models/users');
const express = require('express');
const app = express.Router();

app
    .get('/', (req, res) => {
        users.getAll().then(users => res.send(users));
    })
    .get('/search', (req, res) => {
        users.search(req.query.q).then(users => res.send(users)).catch(err => res.status(500).send(err));
    })
    .post('/', (req, res) => {
        console.log('POST new user');
        console.log(req.body);

        res.send(users.addNewUser(req.body));
    })
    .post('/login', (req, res) => {
        users.login(req.body.emailOrUsername, req.body.password).then(user => {
        if (user) res.send({ user });
        else res.status(401).send('Invalid email or password');

    })})

    .get('/:id', (req, res) => {
        users.get(parseInt(req.params["id"])).then(user => {
            user ? res.send(user) : res.status(404).send('User not found: ' + req.params["id"])
        });
    })

    .patch('/:id', (req, res) => {
        const user = users.get(parseInt(req.params["id"]));
        if (!user) res.status(404).send('User not found');
        for (let key in req.body) user[key] = req.body[key];
        res.send(user);
    })

    .delete('/:id', (req, res) => {
        res.send(users.remove(parseInt(req.params["id"])));
    });
module.exports = app;