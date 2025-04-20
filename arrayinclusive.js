let array =[3,4,67,2,1,4];
function inclusive(array ,searchelement){
    for(let a=0;a<array.length;a++){
        if(array[a]===searchelement){
            return true;
        }
      
    }
    return false;
}

console.log(inclusive(array,3));