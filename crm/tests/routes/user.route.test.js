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
beforeAll( async ()=>{
    /**
     * Insert the data inside the test db
     */
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
afterAll(async ()=>{
    await db.closeDatabase();    
})

/**
 *  Integration testing for the all users enpoint  /crm/api/v1/users
 */

describe("Find all users", ()=>{

    it("find all the users", async () =>{

        /**
         *  1. We need to have some data in the test DB | Done in the beforeAll method
         *  2. Generate the token using the same logic and use for the test
         */
        //Generating the token to be used for sending the request for Auth
        const token = jwt.sign({id : "vish01"}, config.secret, {
            expiresIn : 120
        });

        //Need to invoke the API  -- We need to make use of supertest

        const res = await request(app).get("/crm/api/v1/users").set("x-access-token", token);


        //Code for the validation
        expect(res.statusCode).toEqual(200);

    })

})