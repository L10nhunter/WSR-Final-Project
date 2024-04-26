require('@dotenvx/dotenvx').config();
if (process.env.NODE_ENV === 'development') {
    console.log('Development Mode');
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
const PORT = !isNaN(parseInt(process.env.PORT)) ? parseInt(process.env.PORT) : 3000;
const {parseAuthToken} = require('./middleware/authorization.js');

const app = express();

if (process.env.NODE_ENV !== 'development') app.use('/', express.static('../client/dist'));
app
    /*//Static Files
    .use("/", express.static("../Client/dist"))*/
    //Body Parser
    .use(express.json())
    .use(express.urlencoded({extended: true}))
    //CORS
    .use(cors({
        origin: '*',
        methods: '*',
        allowedHeaders: '*',
        optionsSuccessStatus: 200
    }))
    //API ROOT
    .get('/', (req, res) => {
        "use strict";
        res.send({message: 'Welcome to the API'});
    })
    //JWT Authorization
    .use(parseAuthToken)
    //API controllers
    .use('/api/v1/users', require('./Controllers/users'))
    .use('/api/v1/workouts', require('./Controllers/workouts'))
    //Error Handler
    .use(
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