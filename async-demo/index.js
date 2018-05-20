//Asynchronous
//console.log('Before');
//getUser(1, getRepositories); //CallBack Function, when the result of an asynchronous operation is ready, this function will be called in the result.;
//console.log('After');

// function getRepositories(user){
//     console.log('User: ', user);
//     getRepositories(user.gitHubUsername, getCommits);
// }
// function getCommits(repos){
//     getCommits(repo, displayCommits);
//     console.log('Repos: ', repos);
// }
// function displayCommits(commits){
//     console.log(commits);
// }


//Asynchronous - callback
// console.log('Before');
// getUser(1,  (user)=>{
//     getRepositories(user.gitHubUsername,  (repos)=>{
//         getCommits(repos[0], (commits)=>{
//             console.log(commits);
//         });
//     });
// });
// console.log('After');

//promises
//promise based approach
console.log('Before');
// getUser(1)
//     .then(user => getRepositories(user.gitHubUsername))
//     .then(repos => getCommits(repos[0]))
//     .then(commits => console.log('Commits', commits))
//     .catch(Err => console.logi('Error', err.message));

//Async and  Await
async function displayCommits(){
    const user = await getUser(1);
    const repos = await getRepositories(user.gitHubUsername);
    const commits = await getCommits(repos[0]);
    console.log(commits);
}
displayCommits()

console.log('After');
//Syncronous
// console.log('Before');
// const user =  getUser(1);
// const repos =  getRepositories(user.gitHubUsername);
// const commits = getCommits(repos[0]);
// console.log('After');

//Callbacks
//Promises - an object  that holds the eventual result  of an  asynchronous operation. when a async operation completes, it can either result in a value or error.
//Async/wait

//when  a  promise is started is in  the  pending state, it will  pick up some asynchronous  operation, when the results  are ready, the promise can  either be fulfilled  or  resolved, 
//the operation  completed successfully
//if something  went wrong it will be in  the  rejected state - error

function getUser(id){
    return new Promise((resolve, reject)=> {
        setTimeout(()=> {
            console.log('Reading a user from a database...');
            resolve({id: id,  gitHubUsername: 'Ankush'});
        }, 2000); 
    });   
}

function getRepositories (username){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log('Calling GITHub API...');
            resolve(['repo1',  'repo2', 'repo3']);
        }, 2000);
    });    
}

function  getCommits(repo){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log('Calling GITHub API...');
            resolve(['commit']);
        }, 2000);
    });
}