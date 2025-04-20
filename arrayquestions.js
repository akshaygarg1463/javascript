const numbers =[3,6,84,3,222,15]
const a = numbers.filter(a=>a>80);
console.log(a);

const m =[3,5,7,8,4,2]
const b =m.map(num=>num*2);
console.log(b);

const d =m.filter(num=>num%2!=0);
console.log(d);

const f = numbers.reduce(function(num,curr)
         {
            num=num+curr;
            return num;
        },0
        );
        console.log(f);
// a={
//     length:55,
//     b:{
//         c:"fv"
//     }
// }

// const d ={...a};
// d.b.c ="dfefde";
// console.log(d);
// console.log(a);
function add(d){
    this.d =d;
}
add.prototype.show = function(){
    console.log("rggg");
}
const ab = new add();
console.log(ab.show());

const obj ={
    name:"akshay"
}
obj.name ="ram";
console.log(obj.name);

// function createelement(type,text,color){
//     const el =document.

// }
