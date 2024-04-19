const users = require('../models/users');
const express = require('express');
const {MyError} = require("../models/MyError");
const {ObjectId} = require("mongodb");
const app = express.Router();

app
    .get('/', (req, res, next) => {
        "use strict";
        users.getAll()
            .then(users => {
                /**@type {DataListEnvelope<User>} */
                const envelope = {
                    data: users,
                    pageLimit: 30,
                    isSuccessful: true,
                    message: 'Success',
                    status: 200
                };
                res.send(envelope);
            })
            .catch(err => {
                /**@type {DataListEnvelope<User>} */
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
        users.search(req.query.q)
            .then(users => {
                if(users.length === 0) throw new Error('No users found');
                /**@type {DataListEnvelope<User>} */
                const envelope = {
                    data: users,
                    pageLimit: 30,
                    isSuccessful: true,
                    message: 'Success',
                    status: 200
                };
                res.send(envelope);
            })
            .catch(err => {next(err);});
               /* /!**@type {DataListEnvelope<User>} *!/
                const envelope = {
                    data: [],
                    pageLimit: 30,
                    isSuccessful: false,
                    message: err.message,
                    status: err instanceof MyError ? err.code : 500
                };
                res.status(envelope.status).send(envelope);
            });*/
    })
    .post('/', (req, res) => {
        "use strict";
        users.create(req.body)
            .then(user => {
                /**@type {DataEnvelope<User>} */
                const envelope = {
                    data: user,
                    isSuccessful: true,
                    message: 'Success',
                    status: 200
                };
                res.send(envelope);
            })
            .catch(err => {
                /**@type {DataEnvelope<User>} */
                const envelope = {
                    isSuccessful: false,
                    message: err.message,
                    status: err instanceof MyError ? err.code : 404
                };
                res.status(envelope.status).send(envelope);
            });
    })
    .post('/login', (req, res) => {
        "use strict";
        users.login(req.body.emailOrUsername, req.body.password)
            .then(user => {
                /**@type {DataEnvelope<User>} */
                const envelope = {
                    data: user,
                    isSuccessful: true,
                    message: 'Success',
                    status: 200
                };
                res.send(envelope);
            })
            .catch(err => {
                /**@type {DataEnvelope<User>} */
                const envelope = {
                    isSuccessful: false,
                    message: err.message,
                    status: err instanceof MyError ? err.code : 404
                };
                res.status(envelope.status).send(envelope);
            });
    });

app
    .get('/:id', (req, res) => {
        "use strict";
        users.get(new ObjectId(req.params.id))
            .then(user => {
                /**@type {DataEnvelope<User>} */
                const envelope = {
                    data: user,
                    isSuccessful: true,
                    message: 'Success',
                    status: 200
                };
                res.send(envelope);
            })
            .catch(err => {
                /**@type {DataEnvelope<User>} */
                const envelope = {
                    isSuccessful: false,
                    message: err.message,
                    status: err instanceof MyError ? err.code : 404
                };
                res.status(envelope.status).send(envelope);
            });
    })
    .patch('/:id', (req, res) => {
        "use strict";
        users.update(new ObjectId(req.params.id), req.body)
            .then(user => {
                /**@type {DataEnvelope<User>} */
                const envelope = {
                    data: user,
                    isSuccessful: true,
                    message: 'Success',
                    status: 200
                };
                res.send(envelope);
            })
            .catch(err => {
                /**@type {DataEnvelope<User>} */
                const envelope = {
                    isSuccessful: false,
                    message: err.message,
                    status: err instanceof MyError ? err.code : 404
                };
                res.status(envelope.status).send(envelope);
            });
    })
    .delete('/:id', (req, res) => {
        "use strict";
        users.destroy(new ObjectId(req.params.id))
            .then(user => {
                /**@type {DataEnvelope<User>} */
                const envelope = {
                    data: user,
                    isSuccessful: true,
                    message: 'Success',
                    status: 200
                };
                res.send(envelope);
            })
            .catch(err => {
                /**@type {DataEnvelope<User>} */
                const envelope = {
                    isSuccessful: false,
                    message: err.message,
                    status: err instanceof MyError ? err.code : 404
                };
                res.status(envelope.status).send(envelope);
            });
    });
module.exports = app;