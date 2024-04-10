const users = require('../models/users');
const express = require('express');
const {ObjectId} = require('../models/mongo');
const app = express.Router();

app
    .get('/', (req, res, next) => {
        "use strict";
        users.getAll()
            .then(users => res.send(users))
            .catch(err => res.status(err.cause.status).send({message: err.message}))
            .finally(next);
    })
    .get('/search', (req, res, next) => {
        "use strict";
        users.search(req.query.q)
            .then(users => res.send(users))
            .catch(err => res.status(err.cause.status).send({message: err.message}))
            .finally(next);
    })
    .post('/', (req, res, next) => {
        "use strict";
        users.create(req.body)
            .then(user => res.send(user))
            .catch(err => res.status(err.cause.status).send({message: err.message}))
            .finally(next);
    })
    .post('/login', (req, res, next) => {
        "use strict";
        users.login(req.body.emailOrUsername, req.body.password)
            .then(user => res.send(user))
            .catch(err => res.status(err.cause.status).send({message: err.message}))
            .finally(next);
    });

app
    .get('/:id', (req, res, next) => {
        "use strict";
        users.get(new ObjectId(req.params.id))
            .then(user => res.send(user))
            .catch(err => res.status(err.cause.status).send({message: err.message}))
            .finally(next);
    })
    .patch('/:id', (req, res, next) => {
        "use strict";
        users.update(new ObjectId(req.params.id), req.body)
            .then(user => res.send(user))
            .catch(err => res.status(err.cause.status).send({message: err.message}))
            .finally(next);
    })
    .delete('/:id', (req, res, next) => {
        "use strict";
        users.destroy(new ObjectId(req.params.id))
            .then(user => res.send(user))
            .catch(err => res.status(err.cause.status).send({message: err.message}))
            .finally(next);
    });
module.exports = app;