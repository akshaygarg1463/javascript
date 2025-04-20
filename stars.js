function stars(input){
   for(let i=1;i<=input;i++){
    let p ="";
     for(let j=0;j<i;j++){
        p+="*";
        
     }
     console.log(p);
   }
}
stars(5);