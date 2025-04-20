const student = {
    studentlist: [
        { name: "akshay ", class: 12, rank: 4, age: 23 },
        { name: "dev",  class: 11, rank: 3, age: 23 },
        { name: " john", class: 8, rank: 1, age: 20 },
        { name: "sam", class: 12, rank: 7, age: 23 },
        { name: "danial", class: 10, rank: 4, age: 21 }
    ]
};

const rank = [...student.studentlist].sort((a, b) => a.rank - b.rank);
console.log( rank);

const age = [...student.studentlist].sort((a, b) => a.age -b.age);
console.log( age);

const clas = [...student.studentlist].sort((a, b) => a.class  - b.class);
console.log( clas);


const reducer = [...student.studentlist].reduce((i,curr)=>{
i=i+(i.name,i.age,i.class,i.rank)
});
console.log(reduce);
