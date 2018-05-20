
const mongoose  =  require('mongoose');
//Connect to MongooseDB
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not  connect to  MondoDB...', err));
//Schema
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
});
//Models
//Classes, objects
//Course,  nodeCourse
async function  createCourse(){
    const Course = mongoose.model('Course', courseSchema);
    const course = new Course({
        name: 'Angular.js Course',
        author: 'Ankush',
        tags:['Angular', 'frontend'],    
        isPublished: true
    });

    const result = await course.save();
    console.log(result);
}

createCourse();

