const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth.config");
const User = require("../models/user.model");
const constants = require("../utils/constants");


const verifyToken = (req, res, next) => {
   
    const token = req.headers["x-access-token"];

    /**
     * Check if the token is present
     */
    if(!token){
        return res.status(403).send({
            message : "No token provided ! Acccess prohibited"
        })
    }

    /**
     * Go and validate the token
     */

    jwt.verify(token, authConfig.secret , (err, decoded) =>{
        if(err){
            return res.status(401).send({
                message : "UnAuthorized !"
            });
        }
        req.userId = decoded.id ;  // I am taking the user Id from token and settign it in request object
        next();
    })

    /**
     * Read the value of the user id from the token and set it in the request for further use
     */



}

const isAdmin = async (req, res, next) =>{
    const user  = await User.findOne({userId : req.userId});

    if(user && user.userType == constants.userTypes.admin){
        next();
    }else{
        res.status(403).send({
            message : "Only ADMIN users are allowed to access this endpoint"
        })
    }
}

const authJwt = {
    verifyToken : verifyToken,
    isAdmin : isAdmin
};

module.exports = authJwt;