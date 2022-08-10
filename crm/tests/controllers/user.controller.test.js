/**
 * This file will contain the unit testing for all the methods
 * of user controller
 */

/**
 * Let's try to test the method findAll()
 * 
 *      - happy path test
 *      - test based on the query param
 *      - Negative scenarion
 */

const { findAll } = require("../../controllers/user.controller");
const User  = require("../../models/user.model");
const {mockRequest, mockResponse} = require("../interceptor");


const userTestPayload = {
    name: "Test",
    userId : "Test01",
    email : "test@gmail.com",
    userType : "CUSTOMER",
    userStatus : "APPROVED",
    ticketsCreated : [],
    ticketsAssigned : []   
}
describe("test findAll method", () =>{
    
    it("test the scenario when no query param is passed", async  ()=>{
        

        /**
         * 
         * First we are doing the setup for the project
         */

         /**
          * Mock User.find method
          */
         const userSpy = jest.spyOn(User, 'find').mockReturnValue(Promise.resolve([userTestPayload]));
         
         //Mock req and res objects as well
         const req = mockRequest();
         const res = mockResponse();

         req.query = {} ; //We need to provide the mock implementation


         /**
          * Actual Execution
          */
        
         await findAll(req ,res);

         /**
          * Assertions
          */

         // I need to verify that userSpy was called in the execution
         expect(userSpy).toHaveBeenCalled();
         expect(res.status).toHaveBeenCalledWith(200);
         expect(res.send).toHaveBeenCalledWith(
             expect.arrayContaining([
                 expect.objectContaining({
                     name : "Test"
                 })
             ])
         )
    })

    it("test the scenarion when user status is passed in query param",async ()=>{

        /**
          * Mock User.find method
          */
         const userSpy = jest.spyOn(User, 'find').mockReturnValue(Promise.resolve([userTestPayload]));
         
         //Mock req and res objects as well
         const req = mockRequest();
         const res = mockResponse();

         req.query = {userStatus : "APPROVED"}

         await findAll(req ,res);

         expect(userSpy).toHaveBeenCalled();
         expect(res.status).toHaveBeenCalledWith(200);
         expect(res.send).toHaveBeenCalledWith(
             expect.arrayContaining([
                 expect.objectContaining({
                     userStatus : "APPROVED"
                 })
             ])
         )

    })

    /**
     * Test one negative or error case
     */

    it("error while calling the User.find method" , async ()=>{
        
        /**
         * mock the error scenario
         */
        const userSpy = jest.spyOn(User, 'find').mockReturnValue(Promise.reject(new Error("error")));
        
        //Mock req and res objects as well
        const req = mockRequest();
        const res = mockResponse();
        req.query = {userStatus : "APPROVED"};

        await findAll(req, res);
        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            message : "Internal server error"
        });


    })
});