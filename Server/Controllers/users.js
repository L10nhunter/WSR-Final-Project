const users = require('../models/users');
const express = require('express');
const app = express.Router();

app
    .get('/', (req, res) => {
        users.getAll()
            .then(users => res.send(users))
            .catch(err => res.status(err.cause.status).send({message: err.message}));
    })
    .get('/search', (req, res) => {
        users.search(req.query.q)
            .then(users => res.send(users))
            .catch(err => res.status(err.cause.status).send({message: err.message}));
    })
    .post('/', (req, res) => {
        users.create(req.body)
            .then(user => res.send(user))
            .catch(err => res.status(err.cause.status).send({message: err.message}));
    })
    .post('/login', (req, res) => {
        users.login(req.body.emailOrUsername, req.body.password)
            .then(user => res.send(user))
            .catch(err => res.status(err.cause.status).send({message: err.message}));
    });

app
    .get('/:id', (req, res) => {
        users.get(parseInt(req.params["id"]))
            .then(user => res.send(user))
            .catch(err => res.status(err.cause.status).send({message: err.message}));
    })
    .patch('/:id', (req, res) => {
        users.update(parseInt(req.params["id"]), req.body)
            .then(user => res.send(user))
            .catch(err => res.status(err.cause.status).send({message: err.message}));
    })
    .delete('/:id', (req, res) => {
        users.destroy(parseInt(req.params["id"]))
            .then(user => res.send(user))
            .catch(err => res.status(err.cause.status).send({message: err.message}));
    });
module.exports = app;