function a(){
    return  new Promise (function(resolve,reject){
        resolve("resolve kar diya bhao");
        reject("reject kar diya h");
    }).then(function(data){
        console.log(data);

    })
}