const a ={
    name:"akshay",
    profile:"software engineer ",
    employeeid:22344556

};
function properties(a){
 for(let k in a){
    if(typeof a[k]==="string"){
        console.log(k,a[k]);
    }
 }
}
properties(a);