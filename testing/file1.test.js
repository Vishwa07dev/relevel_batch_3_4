/**
 * This file is the corresponding test file for file1.js
 */


/**
 * Normal struture of writing test
 */
test(" Test description sentence" , () =>{
   /**
    * Logic for testing
    */
   console.log("Hello from the inside of the test");
})

const sum = require("./file1");
/**
 * Writing test for the sum method
 */

test("Testing the sum method which takes two arguments" , () =>{

    const expectedValue = 11 ;
    const actualValue =  sum(5,6);

    /**
     * Assertion
     */
    expect(actualValue).toBe(expectedValue);
});

/**
 * How to test an object
 */
test('Testing object' , () =>{

    /**
     * Creating the data
     */
    const data = {
        one : 1
    };

    data.two = 2 ;

    //Asertion for the object create
    expect(data).toEqual({two:2, one:1});
    //expect(data).toBe({two:2, one:1})
});


/**
 * Usind the method not.toBe
 */
test("using not.toBe() method", () =>{
    expect(sum(5,6)).not.toBe(7);
});


/**
 * Testing the truthiness of the system
 */

test("null", () =>{
    const n = null ;
    expect(n).toBeNull();
});

test("undefined" , ()=>{
    const a = undefined ;
    expect(a).toBeUndefined();
})

test("defined" , ()=>{
    const a = 765475 ;
    expect(a).toBeDefined();
});


/**
 * Testing the numeric calculations and conditionals
 */

test("Two plus two" , () =>{
    const sum = 2+2 ;

    expect(sum).toBeGreaterThan(3);
    expect(sum).toBeGreaterThanOrEqual(4);
    expect(sum).toBeLessThan(7);
    expect(sum).toBeLessThanOrEqual(4);

    expect(sum).toBe(4);
    expect(sum).toEqual(4);
})

/**
 * Testing Strings 
 * 
 * Using regex to test
 */

test("Testing there is no I in the word Team" , ()=>{
    expect('team').not.toMatch(/I/);
});

test("Testing there is I in the word India" , ()=>{
    expect('India').toMatch(/I/);
})

/**
 * Testing Arrays or the iterables
 */

const shoppingList = [
   "phone",
   "groceries",
   "milk",
   "newspaper"
];

/**
 * Test if an items is present in the array
 */
test("shoppingList has newspaper in it", () =>{
    expect(shoppingList).toContain("newspaper");
});


/**
 * Testing exception is again a very important thing
 */
function createException(){
    throw new Error("Custom exception");
}


test("testing the exception", ()=>{
   
    expect(()=> createException()).toThrow();

    expect(() => createException()).toThrow(Error);


    expect(() => createException()).toThrow("Custom exception");
});



/**
 * This is used for any kind of pre-setup if needed 
 */
beforeAll(() =>{
    console.log("Before any test, this should be executed")
})

/**
 * This will execute before execution of any test
 */
beforeEach(()=>{
    console.log("It's executed before every test");
});


/**
 * This will be executed multiple times after each test
 */
afterEach(()=>{
    console.log("It's executed after every test");
});

/**
 * This will be executed only once at the end
 */
afterAll(() =>{
    console.log("It will be executed at the end");
})