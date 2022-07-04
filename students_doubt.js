
/**
 * Use the ternary operator instead of if else in the below function :
 * 
 * function rangeOfNumbers(startNum, endNum) { 
  if (endNum - startNum === 0) {
     return [startNum]; 
    } else if (startNum > endNum){
      return console.log("Start > End"); 
    } else { 
      var numbers = rangeOfNumbers(startNum, endNum - 1); 
      numbers.push(endNum); 
      return numbers; 
    } 
  }
console.log(rangeOfNumbers(4, 2));
 * 
 */


function rangeOfNumbers(startNum, endNum) {

    return endNum - startNum === 0 ? [startNum] : func1(startNum, endNum);
}

const func1 = (start, end) => {
    return start > end ? console.log("Start > End") : func2(start, end);
}

const func2 = (start, end) => {
    var numbers = rangeOfNumbers(start, end - 1);
    numbers.push(end);
    return numbers;
}


console.log(rangeOfNumbers(2, 4));

