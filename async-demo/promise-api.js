
const p1 = new Promise((resolve, reject) =>{
    setTimeout(()=>{
        console.log('Async operation 1 ...');
        resolve(1);
        //reject(new Error('becuase something failed...'));
    }, 2000);
});

const p2 = new Promise((resolve, reject) =>{
    setTimeout(()=>{
        console.log('Async operation 2 ...');
        resolve(2);
    }, 2000);
});
//promise.all will return both  p1 and  p2 if no errors
Promise.all([p1, p2])
    .then(result => console.log(result))
    .catch(err =>  console.log('Error', err.message));
//promise.race will return the first promise  to  finish
// Promise.race([p1, p2])
//     .then(result => console.log(result))
//     .catch(err =>  console.log('Error', err.message));