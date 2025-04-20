
// a={
//     animal:"human",
//     b:{
//         c:"fff",
//     }
// }

// const hei = JSON.parse(JSON.stringify(a));
// hei.b.c="ffefss";
// console.log(hei.b.c);
// console.log(a.b.c);


// const v =structuredClone(a);
// v.b.c="ffsss";
// console.log(v.b.c);
// console.log(a.b.c);

// function showMessage() {
//     alert( 'Hello everyone!' );
//   }
//   showMessage();

function ss(t,a="never say never"){
        console.log(t+a);
}


ss(44,"ffef");
let dd = {
    g:undefined,
    e:"hello"
}
let bb = {
    c:"asasas",
    f:null,
    d:dd
}
const obj={
    a:"fff",
    b:bb,
    m:bb
    
}
const obj2 = JSON.parse(JSON.stringify((obj)));
obj2.b.c = "changed";
console.log(obj);
console.log(obj2);
 a=[3,1,7,6,10000]
 a.sort();