if(process.env.NODE_ENV === 'development') {
    console.log('Development Mode');
    require('@dotenvx/dotenvx').config()
    //require("./models/users.js").seed();
    //require("./models/workouts.js").seed();
}
const express = require('express');
const cors = require('cors');
const app = express();

const PORT = !isNaN(parseInt(process.env.PORT)) ? parseInt(process.env.PORT) : 3000;

app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/users', require('./Controllers/users'));
app.use('/api/v1/workouts', require('./Controllers/workouts'));
app.listen(PORT, () => {
    console.log(`Server started at: http://localhost:${PORT}`);
});