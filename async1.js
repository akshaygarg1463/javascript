// function wait(ms){
//     return new Promise(function(response){
//         setTimeout(response,ms);
//     })  }

//     async function d(){
//         await wait(3000);
//         console.log("wait 3 sec");

//     }
//     d();


// async function doublefetch(){
//     let a = await fetch("https://jsonplaceholder.typicode.com/users/1");
//     let b = await a.json();
//     console.log(b.name);

//     let c =await fetch("https://jsonplaceholder.typicode.com/posts/1");
//     let d =await c.json();
//     console.log(d.title);
// }
// doublefetch();


async function wrongurl(){
    try{
        let a = fetch("httpplaceholder.typicode.com/posts/1");
        let b = await a.json();
          console.log(b.name);
    }
    catch(exception ){
        console.log(exception.message);
    }
}
wrongurl();