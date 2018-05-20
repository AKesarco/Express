const express = require('express');
const router =  express.Router();

//respond to an http get request, takes 2 arguments first is the URL
//second argument is callback function / route  handler
//this  is  how we define a route
router.get('/', (req, res) =>{
    //res.send('Hello World!!!');
    res.render('index', {title: "My Express App", message: "Hello"});
});

module.exports = router;