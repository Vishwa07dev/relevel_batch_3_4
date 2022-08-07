

function moves(n, S, D, A){
    if(n==1){
        return 1 ;
    }

    return moves(n-1, S,A,D) + 1 + moves(n-1, A,D, S);
}
/** 
console.log(moves(1));
console.log(moves(2));
console.log(moves(3));
console.log(moves(4));
console.log(moves(5));

**/



function timeTaken(arr){
    let count = 0;

    while(true){
        let isSwapped = false ;
        let i = 0;
        while(i < arr.length-1){
              if(arr[i]==1 && arr[i+1]==0){
                  temp = arr[i];
                  arr[i] =arr[i+1];
                  arr[i+1] =temp ; 
                  i=i+2;
                  isSwapped = true ;
              }else{
                  i=i+1;
              }

        }
        if(isSwapped){
            count++;
        }else{
            break ;
        }
        
    }

    return count ;
}


function timeTaken2(arr){
    let countZero = 0 ;
    let indexLastZero = 0;
    for(let i=0;i<arr.length;i++){
       if(arr[i]==0){
           countZero++;
           indexLastZero = i ;
       }
    }

    if(countZero ==0 || countZero-1 == indexLastZero){
        return 0;
    }
    
    let correctIndex = countZero-1;

    if(indexLastZero>=1 && arr[indexLastZero-1]==0){
        correctIndex--;
    }

    return indexLastZero - correctIndex ;
}

console.log(timeTaken([0,0,0]));
console.log(timeTaken2([0,0,0]));
console.log(timeTaken([1,0,0]));
console.log(timeTaken2([1,0,0]));
console.log(timeTaken([0,1,0,1,1,1,0,1]));
console.log(timeTaken2([0,1,0,1,1,1,0,1]));
console.log(timeTaken([1,1,0,0]));
console.log(timeTaken2([1,1,0,0]));
console.log(timeTaken([1,0,1,0,1,0]));
console.log(timeTaken2([1,0,1,0,1,0]));
console.log(timeTaken([1,1,1,1,0,0]));
console.log(timeTaken2([1,1,1,1,0,0]));