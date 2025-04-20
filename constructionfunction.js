// function car(brand ,model,year){
    
//     this.brand=brand;
//     this.model=model;
//     this.year=year;
//     this.start=function(){
//         console.log((this.brand)+"of" +(this.model)+"is of year" +(this,year));
//     }
    
// }

// const a = new car("toyoto","a class",2016);
// const b = new car("toyoo","b class",2017);
// const c = new car("toyotgo","c class",2015);
// const d = new car("toyoo","d class",2013);

function employee(department,name){
    this.name=name;
    this.department=department;
    this.employee=function(){
        console.log(name+"is an employee of"+department+"department at Antrazal Solutions")
    }

}
let a = new employee("sales","ritu");
let b=  new employee("marketing" ,"rahul");