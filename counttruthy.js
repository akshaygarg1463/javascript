const array =[1,2,"",undefined,7,44,undefined]
let count =0;
function counttruthy(array){
    for(let i of array){
        if(typeof(i)==="number"){
            count++;
            i++;
        }
        else{
            i++
        }
        
    }
    return count;
}
console.log(counttruthy(array));