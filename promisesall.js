 async function a(){
    let a = await fetch("https://jsonplaceholder.typicode.com/users/1");
    return a.json();
}
async function b(){
    let b = await fetch("https://jsonplaceholder.typicode.com/posts?userId=1")
    return b.json();
}


     Promise.all([a(),b()]).then(function(data){
        console.log(data);

    })
