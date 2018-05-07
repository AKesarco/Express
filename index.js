
const Joi = require('joi');
const express = require('express'); // load express 
const app = express(); // call express as app

app.use(express.json());
////define array of courses
const courses = [
    {id: 1, name: 'couses1'},
    {id: 2, name: 'couses2'},
    {id: 3, name: 'couses3'}
];

//add genres

const genres = [
    {id: 1, name: 'Action'},
    {id: 2, name: 'Adventure'},
    {id: 3, name: 'Comedy'},
    {id: 4, name: 'Crime'},
    {id: 5, name: 'Drama'},
    {id: 6, name: 'Historical'},
    {id: 7, name: 'Horror'},
    {id: 8, name: 'Musicals'},
    {id: 9, name: 'Sci-Fi'},
    {id: 10, name: 'War'},
    {id: 11, name: 'Western'}
]

//respond to an http get request, takes 2 arguments first is the URL
//second argument is callback function / route  handler
//this  is  how we define a route
// app.get('/', (req, res) =>{
//     res.send('Hello World!!!');
// });
app.get('/api/courses', (req,res)=>{
    //res.send([1,2,3]);
    res.send(courses);
});
// app.get('/api/courses/:id', (req, res)=>{//id is name of parameter - can have  multiple parameters in  a route
//     res.send(req.params.id);

// });
// app.get('/api/posts/:year/:month', (req, res)=>{
//     //res.send(req.params);
//     ////if query see below
//     res.send(req.query);
// });
// ////get single course from the server
app.get('/api/courses/:id', (req, res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the  given ID was not found') // 404 error
    res.send(course);   
});
////post request
app.post('/api/courses', (req,  res)=>{
    // const schema = {
    //     name: Joi.string().min(3).required()
    // };

    // const result = Joi.validate(req.body, schema);
    // //console.log(result);
    // if(result.error){
    //     //400 bad request
    //     res.status(400).send(result.error.details[0].message);
    //     return;
    // }
    const { error } = validataeCourse(req.body); //result.error
    if(error){
        //400 bad request
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const course =  {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res)=>{
    //Look up course
    //If not  existing,  return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course){ return res.status(404).send('The course with the  given ID was not found')} // 404 error
    
    //validate
    //if invalid, return 400 - bad request
    //const result = validataeCourse(req.body);
    const { error } = validataeCourse(req.body); //result.error
    if(error){return res.status(400).send(result.error.details[0].message);}//400 bad request 

    //update course
    //return the updated course
    course.name = req.body.name;
    res.send(course);
});

function validataeCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}


// //PORT - environment variables is a varialbe that is part of the environment in which a process  runs.
// //Its value is set  outside this  application
 const port =  process.env.PORT || 3000;
// //changing the line  below to look for port
// //proper way to assign port  to application
 app.listen(port, () => console.log(`Listening on port ${port}...`));
// //app.listen(3000, ()=> console.log('Listening on  port 3000...'));
// // app.post()
// // app.put()
// // app.delete()


app.delete('/api/courses/:id',(req,  res)=>{
    //look up the course
    //not existing,  return  404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the  given ID was not found') // 404 error
    
    //delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    //return the same  courses
    res.send(course);
});