const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth.config');
const sendEmail = require('../utils/sendEmailRequest')
require('dotenv').config();
const User = require('../models/user.model')

const userToken = (req,res,next)=>{

    const token = req.headers["x-access-token"];

    if(!token){
        return res.status(403).send({
            message : "no token provided! Access prohibited"
        })
    }

    jwt.verify(token, authConfig.secret, async (err, decoded)=>{
        if(err){
            return res.status(401).send({
                message : "UnAuthorised!"
            })
        }
        
        if(decoded.purpose != "authentication"){       //only token with this purose in payload will be accepted
            return res.status(401).send({
                message : "The Token passed is not for authentication"
            })
        }
            
        const user = await User.findOne({userId : decoded.id});
        req.user = user;        //saving user data in req
        next();
    })
}

const accountVerification = (req,res,next)=>{   // verify  that the account verification link token is correct and valid

    const token = req.params.token;

    try{

        jwt.verify(token, authConfig.secret, async (err, decoded)=>{
    
            if(err){
                return res.status(401).send({
                    message : "The link is not valid!"
                })
            }

            if(decoded.purpose != "accountVerification"){       //only token with this purose in payload will be accepted
                return res.status(401).send({
                    message : "The Token passed is not for account verification"
                })
            }
    
            req.user = await User.findOne({_id : decoded.id});  //adds user data to req for later use
    
            if(req.user){   //if user exists
    
                if(req.user.emailVerified){     //if user is already verified
                    return res.status(401).send({
                        message : "The user is already verified"
                    })
                }
    
                const dateNow = new Date();
                const tokenLife = (decoded.iat + process.env.EMAIL_TOKEN_TIME) * 1000;  //time converted to miliseconds
                
                if(tokenLife <= dateNow.getTime()){    // checks if token is more then certain time old
                    sendEmail.accountVerification(req.user);    // if token is expired, a new token is sent to email-Id
                    return res.status(401).send({
                        message : "This link has expired. A new link has been sent to your email address."
                    })
                }
                next();
                
            }else{
                return res.status(401).send({
                    message : "User not found"
                })
            }
        })
    }catch{
        console.log("#### Error while velidating account verification token ##### ", err.message);
        res.status(500).send({
            message : "Internal server error while token validation"
        });
    }
}

const passwordReset = (req,res,next)=>{

    const token = req.params.token;

    try{

        jwt.verify(token, authConfig.secret, async (err, decoded)=>{
    
            if(err){
                return res.status(401).send({
                    message : "The link is not valid!"
                })
            }

            if(decoded.purpose != "resetPassword"){       //only token with this purose in payload will be accepted
                return res.status(401).send({
                    message : "The Token passed is not for resetting password"
                })
            }
    
            req.user = await User.findOne({_id : decoded.id});  //adds user data to req for later use
    
            if(req.user){   //if user exists
    
                if(!req.user.emailVerified){     //if user is already verified
                    return res.status(401).send({
                        message : "The user is not verified"
                    })
                }
    
                const dateNow = new Date();
                const tokenLife = (decoded.iat + process.env.EMAIL_TOKEN_TIME) * 1000;  //time converted to miliseconds
                
                if(tokenLife <= dateNow.getTime()){    // checks if token is more then certain time old
                    sendEmail.resetPassword(req.user);    // if token is expired, a new token is sent to email-Id
                    return res.status(401).send({
                        message : "This link has expired. A new link has been sent to your email address."
                    })
                }
                next();
                
            }else{
                return res.status(401).send({
                    message : "User not found"
                })
            }
        })
    }catch{
        console.log("#### Error while velidating reset password token ##### ", err.message);
        res.status(500).send({
            message : "Internal server error while token validation"
        });
    }
}


const verifyTokens = {
    userToken,
    accountVerification,
    passwordReset
};

module.exports = verifyTokens