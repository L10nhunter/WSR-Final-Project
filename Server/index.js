const express = require('express');
const cors = require('cors');
const app = express();

const PORT = !isNaN(parseInt(process.env.PORT)) ? parseInt(process.env.PORT) : 3000;

app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
}));

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
app.get('/', (req, res) => {
    res.send('Home Page');
});

app.use('/api/v1/users', require('./Controllers/users'));
app.use('/api/v1/workouts', require('./Controllers/workouts'));

