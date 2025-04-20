

function call(element){
return element*2;

}
function doublearr(arr,callback){
    let output=[];
    for(let i=0;i<arr.length;i++){
       output.push(callback(arr[i])) ;
    }
    return output;
}
console.log(doublearr([3,6,8,5],call));