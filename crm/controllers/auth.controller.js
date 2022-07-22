/**
 * This file will contain the logic for the
 * registration of the user and login of the user
 * 
 * User :
 * 
 * Customer
 *    1. Registers and is approved by default
 *    2. Should be able to login immediately
 * 
 * 
 * Engineer 
 *    1. Should be able to registered
 *    2. Initially he/she will be in PENDING state
 *    3. ADMIN should be able to approve this
 * 
 * 
 * Admin
 *    1. ADMIN user should be only created from the backend...No API should be supported
 * for it
 */

const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

/**
 * Logic to accept the registration/signup
 * 
 * req --> What we get from the client
 * res --> What we return from the server
 */
exports.signup = async (req, res)=>{
     /**
      * I need to read the data from the request body
      */
      if(req.body.userType != "CUSTOMER"){
          req.body.userStatus = "PENDING";
      }


     /**
      * Convert that into the JS object for inserting in the mongo db
      */
     const userObj = {
         name :  req.body.name,
         userId  : req.body.userId,
         email : req.body.email,
         userType : req.body.userType,
         password : bcrypt.hashSync(req.body.password, 8),
         userStatus : req.body.userStatus
     };

     /**
      * insert the data and return the response
      */
     try{
        const userCreated = await User.create(userObj);
        /**
         * We need to return the newly created user as 
         * the response.
         * But we should remove some sensitive feilds
         *    - Password
         *    - __V
         *    -- _id
         * We need to create the custom response and return
         */
        const response = {
            name  : userCreated.name,
            userid : userCreated.userId,
            email : userCreated.email,
            userType : userCreated.userType,
            userStatus : userCreated.userStatus,
            createdAt : userCreated.createdAt,
            updatedAt : userCreated.updatedAt
        }

        res.status(201).send(response);
     }catch(err){
         console.log("Some error happened ", err.message);
         res.status(500).send({
             message : "Some internal server error"
         });
     }
     

}