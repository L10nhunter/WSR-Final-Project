const express = require('express');
const app = express();

const PORT = !isNaN(parseInt(process.env.PORT)) ? parseInt(process.env.PORT) : 3000;
app.get('/', (req, res) => {
    res.send('Home Page');
});

app.use('/users', require('./Controllers/users'));
app.use('/workouts', require('./Controllers/workouts'));

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});