arr =[
    {name:"akshay",age:"22"},
    {name:"xyx",age:"22"},
    {name:"ak",age:"20"},
    {name:"aks",age:"26"},
    {name:"akd",age:"24"},
    {name:"akg",age:"22"}
];
// let a = arr.filter(x=>x.age>22);
// console.log(a.map(x=>x.name));
//  arr.reduce(function(acc,cur){
//     if(curr.age==22){

//     }
//  },{});
function x(age){
let a=arr.filter(x=>x.age==age);
return age+":"+a.length;
}
function output(arr,x){
    let output =[];
  let b=arr.map(x=>x.age);
  for(let i=0;i<b.length;i++){
    if(!output.includes(x(b[i]))){
        output.push(x(b[i]));
    }
    
  }
 return output;
}
console.log(output(arr,x));