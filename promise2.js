// let promise  = new Promise(function (resolve,reject){
//     setTimeout(resolve,5000);
// }).then(function(){
//     console.log("5 sec ho gay");
// }
   
// )

// function delay(ms){
//     return new Promise(function(resolve,reject){
//         setTimeout(resolve,ms);
     
//     }).then(function(){
//         console.log("time for promise");
//     })
// }

// delay(1000);

// function double(num){
//     return new Promise(function(resolve, reject){
//         resolve(num*2);

//     }).then(function(num){
//         console.log(num*2);
//      }
//     )
//     // .then(function(num){
//     //     console.log(num);
//     // })
// }

function greet (name){
    return new Promise(function(resolve,reject){
       if(name){
        resolve("hello"+name);
       } 
       else{
        reject("please provide the name")
       }
    }).then(function(name){
        console.log(name);
    }).catch(function(message){
        console.error(message);
    })
}