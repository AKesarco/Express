
const Joi = require('joi');
const express = require('express');
const app = express();
const genres =  require('./routes/genre');

app.use(express.json());
app.use('/api/genre', genres);

const port = process.env.Port || 3000;
router.listen(port, () => console.log(`Listening on port ${port}...`));