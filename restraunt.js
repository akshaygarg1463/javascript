function restraunt(name,opening,closing){
   
  
    this.name=name,
    this.opening=opening,
    this.closing=closing
    };

    let a=new restraunt("radission" ,"6 " ,"9");
    let b=new restraunt("oberoi" ,"6 " ,"12");
    let c=new restraunt("heritage" ,"6 " ,"2");
    let d=new restraunt("rad" ,"6 " ,"13");


    let array=[a,b,c,d];
    console.log(array);

    let restraundsOpen=[array.filter(num=>num.closing>8)]
    console.log(restraundsOpen);