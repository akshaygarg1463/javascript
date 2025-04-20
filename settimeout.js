
// setTimeout(function (){
//     console.log("hello,this is some thing 2")
// },5000)
// setTimeout(function (){
//     console.log("hello,this is some thing")
// },3000)

// function sum(...args){
//     return args.reduce((total,args)=>total+args,0);
// }

// console.log(sum(5,2,1)) ;
// function a(){
//     console.log("this is a function");
//      function b(){
//         console.log("this is the 2 function");
//     }
//      function c(){
//         console.log("i am also a function");
//     }
// }
// console.log(a()()());
function greet(name) {
    console.log("Hello, " + name + "!");
}

setTimeout(greet("alice"), 5000); // Output after 2 seconds: Hello, Alice!
