
// getCustomers(1, (customer)=> {
//     console.log('Customer: ',  customer);
//     if(customer.isGold){
//         getTopMovies(movies =>{
//             console.log('Top movies: ', movies);
//             sendEmail(cusomter.email, movies,()=>{
//                 console.log('EMail sent...')
//             });
//         });
//     }
//});

async function notifyCustomer(){
    try{
        const customer = await getCustomers(1);
        console.log('Customer: ', customer);
        if(customer.isGold){
            const movies =  await getTopMovies();
            console.log('Top movies: ', movies);
            const email = await sendEmail(customer.email, movies);
            console.log('EMail sent...');
        }        
    }
    catch(err){
        console.log('Error', err.message);
    }
}
notifyCustomer()

function getCustomers(id){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve({
                id:1,
                name: 'Ankush Co',
                isGold:true,
                email: 'email'
            });
        },  4000);
    });    
}

function getTopMovies(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(['movie1','movie2']);
        }, 4000);
    });    
}

function sendEmail(email,  movies){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve();
        },  4000);
    });    
}

    