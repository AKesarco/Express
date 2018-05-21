
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
//comparasion operators
async function getCourses(){
    //eq (equal)
    //ne (not equal)
    //gt (greater than)
    //gte (greater than or equal to)
    //lt (less than)
    //lte (less than or equal to)
    //in
    //nin (not in)

    const pageNumber = 2;
    const pageSize = 10;
    // /api/courses?pageNumber=2&pageSize=10
    const courses = await Course
    //.find({ author: 'Ankush', isPublished: true}) //find in documents were author is Ankush and isPublished is equal  to true
    //.find({price: { $gt: 10}}) //example of price greater than 10
    //.find({price: {$gt: 10, $lt : 20}}) //get prices that are between  10 and 20 
    //.find({price: {$in: [10,  15, 20]}}) //get prices that are 10,  15 or 20
    .find({author: 'Ankush', isPublished: true})
    //.limit(10) // find the results to  10
    .skip((pageNumber -1) * pageSize) //pagenation
    .limit(pageSize) // change limit to  pageSize
    .sort({name: -1}) // sort the name by desc
    .count(); //  count how  many documents match find
    //.select({name: 1, tags:1}); // select only name and tags
    console.log(courses);
}

getCourses();
//createCourse();

