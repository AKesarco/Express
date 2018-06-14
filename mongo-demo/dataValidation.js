
const mongoose  =  require('mongoose');
//Connect to MongooseDB
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not  connect to  MondoDB...', err));
//Schema
const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlenght:5,
        maxlength: 255,
        //match /pattern/ 
    },
    category:{
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'],
        lowercase: true,
        //uppercase: true,
        trim: true
    },
    author: String,
    tags: {
        type: Array,
        validate:{
            isAsync: true,
            validator: function(v, callback){
                setTimeout(()=> {
                    const result = v && v.length > 0;
                    callback(result);
                }, 1000)
                // Do some async work   
            },
            message: 'A course should have at least one tag.'
        }
    },
    date: {type: Date, default: Date.now},
    isPublished: Boolean,
    price:{
        type: Number,
        required: function() {return this.isPublished; },
        min: 10,
        max: 200,
        get: v => Math.round(v),
        set: v=> Math.round(v)
    }
});
const Course = mongoose.model('Course', courseSchema);
//Models
//Classes, objects
//Course,  nodeCourse
async function  createCourse(){
    const course = new Course({
        name: 'Angular.js Course',
        category: 'Web',
        author: 'Ankush',
        tags:['frontend'],    
        isPublished: true,
        price: 15.8
    });

    try{
        // course.validate((err) => {
        //     if(err){ }
        // });
        // if(!isValid)
        const result = await course.save();
        console.log(result);
    }
    catch(ex){
        //console.log(ex.message);
        for(field in ex.errors)
            console.log(ex.errors[field].message);
    }
}
//comparasion operators
async function getCourses(){
    const pageNumber = 2;
    const pageSize = 10;
    // /api/courses?pageNumber=2&pageSize=10

    const courses = await Course    
    .find({_id: '5b21981032271c2358e86ca7'})
    // .skip((pageNumber -1) * pageSize) //pagenation
    // .limit(pageSize) // change limit to  pageSize
    .sort({name: -1}) // sort the name by desc
    //.count() //  count how  many documents match find
    .select({name: 1, tags:1, price: 1}); // select only name and tags
    console.log(courses[0].price);
}

//updating Course Query First
async function updateCourse(id){
    //Approach: Update first
    //Update directly
    //Optionally: get the udpated document
    const course = await Course.findById(id);
    if(!course) return;
    course.isPublished = true;
    course.author = 'Another Author';

    const result = await course.save();
    console.log(result);
    //below is also another approach
    // course.set({
    //     isPublished: true,
    //     author: 'Another Author'
    // });
}

//updating Course Update First
async function updateCourseUF(id){
    // const result = await Course.update({ _id: id},{ //if get document that was changed -- Course.findByIdAndUpdate
    //     $set:{
    //         author:'Ankush',
    //         isPublished: false
    //     }
    // });

    // console.log(result);
    //if get document that was changed -- Course.findByIdAndUpdate
    const course = await Course.findByIdAndUpdate(id,{
        $set:{
            author:'Jason',
            isPublished: false
        }
    }, {new: true}); //object gets new document

    console.log(course);
}
//remove course
async function removeCourse(id){    
    //const result = await Course.deleteOne({_id:id});
    const course = await Course.findByIdAndRemove(id);
    console.log(course);
}

getCourses();
//createCourse();
//updateCourse('5b01c1e2a5d36536bc545c24');
//updateCourseUF('5b01c1e2a5d36536bc545c24');
//removeCourse('5b01c1e2a5d36536bc545c24');
