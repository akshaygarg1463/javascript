function fizzbuzz(input){
    if(typeof(input)!=="number"){
        return "not a number";
    }
    else if(input%3===0&&input%5===0){
        return "fizzbuzz";

    }
    else if(input%3===0){
        return "fizz";
    }
    else if(input%5===0){
        return "buzz";
    }
    return input;
}
console.log(fizzbuzz(7));