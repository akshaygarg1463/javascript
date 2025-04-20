function x(){
    let  a =6;
    function y(){
        console.log(a);
    }
   y();
}
const g = x();
console.log(g)