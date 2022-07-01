/** 
function greet(){

    console.log('Inside the greet');

    setTimeout(()=>{
        console.log("after waiting for atleast 5 seconds")
    },5000);

    console.log('Before exiting the greet func');
}

greet();




function simranPromiseForMarriage(){
    
    return new Promise((resolve,reject)=>{
        const dadAgrees = true ;

        if(dadAgrees){
            resolve();
        }else{
            reject("Papa nai maaanein !");
        }
    })
}


simranPromiseForMarriage().then(()=>{
    console.log("I will dance like hell in my own marriage");
}).catch((simran_message)=>{
    console.log("Tinder jindabad !");
})

**/



async function add(a,b){
      /**
      * I we are trying to call a function which we need to wait
      */
    console.log("A");
    const persons = await PersonModel.getAllPerson(); // We are waiting at this stage
    console.log("B");
    return persons ;
}


console.log("c");

add(5,6);  //executed asynchronouly

console.log("d");

// c a d b



















