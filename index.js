
const startupDebugger =  require('debug')('app:startup');
const dbDebugger = require ('debug')('app:db');
const config = require('config');
const morgan  = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./middleware/logger');
const authenticating = require('./authenticating');
const courses =  require('./routes/courses');
const homepage = require('./routes/homepage');
const express = require('express'); // load express 
const app = express(); // call express as app

//process.env.NODE_ENV // undefined
//console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
//console.log(`app: ${app.get('env')}`);

app.set('view engine', 'pug');
app.set('views', './views'); //  default
app.use(express.json());//middleware function
app.use(logger);//middleware function outbound to logger.js
app.use(authenticating); //middleware function outbound to authenticating.js
app.use(express.urlencoded({extended: true})); // parses incoming  requests with url encoded payloads ex.  key=value&key=value
app.use(express.static('public'));
app.use(helmet());//adding helmet middleware

app.use('/api/courses', courses); //any route that start with api/courses use this route
app.use('/', homepage);

//Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));

//check if  environment is running  in development
if(app.get('env') === 'development'){
    app.use(morgan('tiny'))//adding morgan middleware
    //console.log('Morgan enabled...');
    startupDebugger('Morgan enabled...');
}

dbDebugger('Connected to  the database...');