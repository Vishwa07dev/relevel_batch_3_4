const userController = require('../controllers/user.controller')
const {authJwt, verifyTokens, verifyBody} = require('../middlewares')

module.exports = (app)=>{
    app.get("/crm/api/v2/users", [verifyTokens.userToken, authJwt.isAdmin], userController.findAll)
    app.get("/crm/api/v2/users/:id", [verifyTokens.userToken, authJwt.isValidUserIdInReqParam, authJwt.isAdminOrOwner], userController.findByUserId)
    app.put("/crm/api/v2/users/:id", [verifyTokens.userToken, authJwt.isValidUserIdInReqParam, authJwt.isAdminOrOwner], userController.updateUser)
    app.get("/crm/api/v2/users/resetpassword/:id", [authJwt.isValidUserIdInReqParam], userController.sendPasswordResetLink)
    app.put("/crm/api/v2/users/resetpassword/:token", [verifyTokens.passwordReset, verifyBody.validateNewPassword], userController.resetPassword)
}