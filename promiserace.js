function a(){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve("first wala")
        },10000);
    })
}
function b(){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve("second wala")
        },3000);
    })
   
}


     Promise.race([a(),b()]).then(function(data){
        console.log(data);
    })
