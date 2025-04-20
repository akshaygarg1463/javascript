function speedpoints(input){
     if(input<=70){
        return "ok";
     }
     else {
       let points = Math.floor((input-70)/5);
        if(points>=12){
            return "licence suspended";
        }
        else {
            return points;
        }
     }
}
console.log(speedpoints(72));