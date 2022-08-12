/**
 * This file is going to contain the logic for the integration
 * testing of the user.route.test.js
 */

const db = require("../db");
const jwt = require("jsonwebtoken");
const config = require("../../configs/auth.config");
const request  = require("supertest");
const app = require("../../server");
const User = require("../../models/user.model");
/**
 * This will be used to do the initial setup of the project
 */

let token ;
beforeAll( async ()=>{

    token = jwt.sign({id : "vish01"}, config.secret, {
        expiresIn : 120
    });

    /**
     * Insert the data inside the test db
     */
    console.log("Before all test");
    await db.clearDatabase();
    
    await User.create({
        name : "Vishwa",
        userId : "vish01",
        email : "kankvish@gmail.com",
        userType : "ADMIN",
        password : "Welcome1",
        userStatus : "APPROVED"
    });
});


/**
 * Cleanup of the project when everything is completed
 */
afterAll( async ()=>{
    console.log("After all the code has been executed");
    await db.closeDatabase();    
})

/**
 *  Integration testing for the all users enpoint  /crm/api/v1/users
 */

describe("Find all users",  ()=>{

    it("find all the users", async () =>{

        /**
         *  1. We need to have some data in the test DB | Done in the beforeAll method
         *  2. Generate the token using the same logic and use for the test
         */
        
        //Need to invoke the API  -- We need to make use of supertest

        const res = await request(app).get("/crm/api/v1/users").set("x-access-token", token);


        //Code for the validation
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    "name" : "Vishwa",
                    "userid" :"vish01",
                    "email" : "kankvish@gmail.com",
                    "userTypes" : "ADMIN",
                    "userStatus" : "APPROVED"
                })
            ])
        )

    })

});

describe ("Find user based in userId", ()=>{
    it("test the endpoint /crm/api/v1/users/:id " , async ()=>{
         //Complete the code inside this.
         
         //Execution of the code
         const res = await request(app).get("/crm/api/v1/users/vish01").set("x-access-token", token);

         //Valiation of the code
         expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    "name" : "Vishwa",
                    "userid" :"vish01",
                    "email" : "kankvish@gmail.com",
                    "userTypes" : "ADMIN",
                    "userStatus" : "APPROVED"
                })
            ])
        );

    });
})