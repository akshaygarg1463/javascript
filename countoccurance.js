let array1=[2,5,7,84,3,3,2,3,3,3];

function occurance(array1, searchelement){
    let count =0;
    for(let i=0;i<array1.length;i++){
        if(array1[i]===searchelement){
            count++;
        }
    }
return count;
}

console.log(occurance(array1,3));