/**
 *  Testing the callback function
 * 
 * In this the callback function passed will take a minimum of 5 seconds
 */
function fetchData(callback) {
    setTimeout(()=>{
       callback("Vishwa");
    },2000);
}

/**
 * Write a test to validate "Vishwa is passed as the argument to 
 * the callback function"
 */
/** 
test("testing Vishwa argument is passed to callback fn passed inside the fetchdata fn", ()=>{
 
    function callback(data){
       expect(data).toBe("Mohan");  //Testing argument of the cb fn is "Vishwa"
    }

    fetchData(callback); //Invoking the function

});
**/

test("Testing callbacks properly" , (done) =>{

    function callback(data){
        expect(data).toBe("Vishwa");
        done(); //This will ensure that the test is waiting for the callback to be executed
    }

    fetchData(callback); 
});

/**
 * Testing the promise
 */

function willMarry(){
    return new Promise((resolve, reject)=>{
        resolve("I will marry you !");
    })
}

/**
 * Only method will make only test to be executed
 * 
 */
test.only("testing promise", ()=>{

    willMarry().then((msg)=>{
        expect(msg).toBe("I will marry you !");
    });
});
