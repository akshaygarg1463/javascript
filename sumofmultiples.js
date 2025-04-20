function sumofdivisible(limit){
  sum=0;
  for(let a =0;a<=limit;a++){
    if(a%3===0||a%5==0){
        sum =sum+a;
    }
  }
  return sum;
}
console.log(sumofdivisible(20));