
async function getCourses(){
    //or
    //and

    const courses =  await courses
    // .find ({ author: 'Ankush', isPublished: true})
    .find()
    .or([{author: 'Ankush'}, {isPublished: true}])
    .and([])

    //regular expressions
    //starts w ith ankush
    .find({author: /^Ankush/})

    //ends with Kesar
    .find({author: /Kesar$/i}) // to make case insensitive add  i at the end

    //contains Ankush
    .find({author: /.*Ankush.*/}) // contains Ankush anywhere in  string
    .limit(10)
    .sort({name: 1})
    .select({name: 1, tags: 1});
    console.log(courses);
}

getCourses();