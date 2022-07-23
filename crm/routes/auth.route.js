/**
 * This file will contains the logic for routing request
 * 
 * This file is dedicated to the routing logic for sign up and sign in
 */
const authController  = require("../controllers/auth.controller")
const { verifyRequestBodiesForAuth } = require("../middlewares");
module.exports = (app) =>{
    /**
     * POST   /crm/api/v1/auth/signup
     */
    app.post("/crm/api/v1/auth/signup" ,[ verifyRequestBodiesForAuth.validateSignUpRequestBody], authController.signup);

    /**
     * LOGIN
     * 
     * POST /crm/api/v1/auth/login
     */
    app.post("/crm/api/v1/auth/signin" , [ verifyRequestBodiesForAuth.validateSignInRequestBody],authController.signin);
}