// async function ab(){
//     return 'nest';
// }

function a(){
    return new Promise(function(resolve){
        resolve("aaa");
    })
}

async function a() {
    
    let ab = await fetch("https://randomuser.me/api/");
    // let data = await ab.json();
    console.log(ab);
    console.log("aaaaa"); 
}

a();

//  function a(){
//    return fetch("https://randomuser.me/api/")
    
    
// }


// async function b(){
//     let s = await a();
//     console.log(s);
//     console.log ("aaaaa");
// }
// b();