let array1 =[2,4,6,7,23,4];
let array2 =[3,4];

function exceptarray(array1,array2){
    let output =[];
    for(let i=0;i<array1.length;i++ ){
        if(!array2.includes(array1[i])){
            output.push(array1[i]);
        }

    }
    return output;
}
let sol =exceptarray(array1,array2);
console.log(sol);