
function primeno(limit){
   for(let a=2;a<=limit;a++){
    for(let b=2;b<a;b++){
        if(a%b===0){
            break;
        }
        else{
            console.log(a);
        }
    }
   }
}
 primeno(10);