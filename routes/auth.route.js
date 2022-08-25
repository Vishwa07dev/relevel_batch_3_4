const authController = require('../controllers/auth.controller')
const {verifyBody, authJwt, verifyTokens} = require('../middlewares')

module.exports = (app)=>{
    app.post("/crm/api/v2/auth/signup", [verifyBody.validateSignUpRequestBody], authController.signup)
    app.post("/crm/api/v2/auth/signin", [verifyBody.validateSignInRequestBody], authController.signin)
    app.get("/crm/api/v2/auth/verifyemail/:token", [verifyTokens.accountVerification], authController.verifyUserEmail)
    app.get("/crm/api/v2/auth/resendverificationemail/:id", [authJwt.isValidUserIdInReqParam], authController.resendVerificationEmail)
}