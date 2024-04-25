if (process.env.NODE_ENV === 'development') {
    console.log('Development Mode');
    require('@dotenvx/dotenvx').config();
    if (process.env.RESEED_DB === 'true') {
        console.log('Reseeding Database');
        require('./models/users').seed().then(r => {
            "use strict";
            console.log(r);
        });
        require('./models/workouts').seed().then(r => {
            "use strict";
            console.log(r);
        });
    }
}
const express = require('express');
const cors = require('cors');
const app = express();

const PORT = !isNaN(parseInt(process.env.PORT)) ? parseInt(process.env.PORT) : 3000;

app.use(cors({
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
    optionsSuccessStatus: 200
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
if (process.env.NODE_ENV !== 'development') app.use('/', express.static('../client/dist'));

app.use('/api/v1/users', require('./Controllers/users'));
app.use('/api/v1/workouts', require('./Controllers/workouts'));
app.use(
    /**
     * @param {import('express').ErrorRequestHandler} err
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     */
    (err, req, res, next) => {
        "use strict";
        console.error(err);
        res.status(500).send({message: "Internal Server Error"});
        next();
    });

app.listen(PORT, () => {
    "use strict";
    console.log(`Server started at: http://localhost:${PORT}`);
});