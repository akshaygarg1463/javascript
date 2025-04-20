function tryr(){
    return new Promise(function(resolve){
        setTimeout(function(){
            resolve();
            console.log("inside resolve");
            
            },3000)
    })

}

tryr().then(function(data){
    console.log("inside then")
   });
