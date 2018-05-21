
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
const Course = mongoose.model('Course', courseSchema);
//Models
//Classes, objects
//Course,  nodeCourse
async function  createCourse(){
    const course = new Course({
        name: 'Angular.js Course',
        author: 'Ankush',
        tags:['Angular', 'frontend'],    
        isPublished: true
    });
    const result = await course.save();
    console.log(result);
}

async function getCourses(){
    const courses = await Course
    .find({ author: 'Ankush', isPublished: true}) //find in documents were author is Ankush and isPublished is equal  to true
    .limit(10) // find the results to  10
    .sort({name: -1}) // sort the name by desc
    .select({name: 1, tags:1}); // select only name and tags
    console.log(courses);
}

getCourses();
//createCourse();

