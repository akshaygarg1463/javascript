product = {
 type:"mobile phone",
 detail : {
    price:50000,
    brand:"samsung"
 }
}
const a ={...product};
a.detail.price = 2000;
console.log(product.detail.price);
console.log(a.detail.price);

// function a(){
//    const b ={
//       l:44,
//       c:33
//    }
//    return b;
// }
// function a(){
//    this.l=l;
//    this.d =d;
//    this.c=function(){
//       console,
//    }
// }


function person(name,age){
   this.name=name;
   this.age=age;
   this.introduce=function(){
      console.log("Hi, my name is  "+this.name +"  and I am " +this.age+" years old.")
   }
   this.birthday=function(){
      this.age =age+1;
   }
}




function carfactory(brand ,model,year){
   return{

   }

}