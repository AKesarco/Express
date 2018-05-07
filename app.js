
const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

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

app.get('/api/genres', (req, res) =>{
    res.send(genres);
});

app.get('/api/genres/:id', (req, res)=>{
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return  res.status(404).send("The genre was not found with the given ID.");
    res.send(genre);
});

app.post('/api/genres',(req, res)=>{
    const { error} = validateGenres(req.body);
    if(error){ 
        return res.status(400).send(result.error.details[0].message);
    }
    const genre = {
    id: genres.length + 1,
    name: req.body.name
    };
    genres.push(genre);
    res.send(genres);
});

app.put('/api/genres/:id', (req, res)=>{
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre){ return res.status(404).send('The genre with the  given ID was not found')} // 404 error
    
    
    const { error } = validateGenres(req.body); //result.error
    if(error){
        return res.status(400).send(error.details[0].message);
    }//400 bad request 

   
    genre.name = req.body.name;
    res.send(genre);
});

function validateGenres(genre){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(genre, schema);
}

const port = process.env.Port || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));

app.delete('/api/genres/:id', (req, res)=>{
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with the  given ID was not found') // 404 error
    
    //delete
    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre);
});