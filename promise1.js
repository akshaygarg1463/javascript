// function even(number){
//     return new Promise(function (resolve,reject){
//         if(number%2===0){
//             resolve("even")
//         }
//         else{
//             reject("odd h bhai")
//         }
//     })
// }

// function num(n){
//     return new Promise(function(resolve,reject){
//         resolve(n);
//     }).then(function(n){
//        return  n*2;
//     }).then(function(n){
//         return n+5;
//     }).then(function(n){
//         return n-3;
//     }).then(function(n){
//         console.log(n);
//     })

// }
// num(5);

function delay(ms){
    return new Promise(function(resolve,reject){
        resolve("printing something")
    })
}

setTimeout()


//a fetch
//b should run only after a resolve
//c should only run after a irrespective of resolve or reject
// d should run after a but must not wait 


//  let a = fetch("");
//  a.then(function(){
//     b();
//  })
//  .finally(function(){
//     c();
//  }
   
//  )
//  d();
  