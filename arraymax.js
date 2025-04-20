let array =[3,6,4,2,4,8,444];

function max(array){
    let max =array[0];
 for(let i=0;i<array.length;i++){
    if(max<array[i]){
        max=array[i];
    }
   
 }
 return max;
}

console.log(max(array));