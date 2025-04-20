address={
    street:"neemuch",
    city:"neemuch",
    zipcode:"458441"
};

// function showaddress(address){
//     console.log(address)
// };

// showaddress(address);

function factory(street,city,zipcode){
   return{
    street:street,
    city:city,
    zipcode:zipcode
   };
}
console.log(factory("neemuch","indore",458441));

function constructionobj(street,city,zipcode){
   this.street=street,
    this.zipcode=zipcode,
    this.city=city
};
let a = new constructionobj("neemuch","jaipur",432422);
let b = new constructionobj("neemuch","jaipur",43222);

function areEqual(a,b){
   if((a.street===b.street)&&(a.zipcode===b.zipcode)&&(a.city===b.city)){
    return true;
   }
   else{
    return false;
   }
   }
  console.log( areEqual(a,b));