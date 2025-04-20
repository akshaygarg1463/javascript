marks =[40,60,33,43];
function grade(marks){
    let sum=0;
    for(let a in marks){
        sum=sum+marks[a];
    }
   let avg = sum/marks.length;
   if(avg>=1&&avg<=59){
    return "grade F";
   }
   else if(avg>=60&&avg<=69){
    return "grade D";
   }
   else if(avg>=70&&avg<=79){
    return "grade C";
   }
   else if(avg>=80&&avg<=89){
    return "grade B";
   }
   else {
    return "grade A";
   }
}

console.log(grade(marks));