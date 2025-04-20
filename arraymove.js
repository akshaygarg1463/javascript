let array=[1,3,5,77,78];

function move(array,index,movement){
    if(index+movement>=array.length||index+movement<0){
        console.log("invalid");
    }
    else{
        [array[index], array[index+movement]] = [array[index+movement], array[index]];
        return array;
    }
}
console.log(move(array,1,2));