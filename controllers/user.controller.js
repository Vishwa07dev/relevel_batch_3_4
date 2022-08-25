const User = require('../models/user.model')
const objectConverter = require('../utils/objectConverter')
const bcrypt = require('bcryptjs');
const sendEmail = require('../utils/sendEmailRequest')

exports.findAll = async (req,res)=>{

    const queryObj = {};
    const userTypeQP = req.query.userType;
    const userStatusQP = req.query.userStatus;

    if(userTypeQP){                    //if query params exists
        queryObj.userType = userTypeQP
    }
    if(userStatusQP){
        queryObj.userStatus = userStatusQP
    }

    try{
        const users = await User.find(queryObj);

        res.status(200).send(objectConverter.userResponse(users));

    }catch(err){
        console.log("#### Error while fetching all user's data #### ", err.message);
        res.status(500).send({
            message : "Internal server error while fetching data"
        })
    }
}

exports.findByUserId = (req,res)=>{
    try{
        
        res.status(200).send(objectConverter.userResponse(req.userInParams));   //got from middlewere

    }catch(err){
        console.log("#### Error while searching for the user #### ", err.message);
        res.status(500).send({
            message : "Internal server error while fetching data"
        })
    }
}

exports.updateUser = async (req,res)=>{
    try{

        const user = req.userInParams[0];

        user.name = req.body.name ? req.body.name : user.name
        user.password = req.body.password ? bcrypt.hashSync(req.body.password, 8) : user.password

        if(req.user.isAdmin){       //only admin can change these properties. got property from middlewere
            user.userStatus = req.body.userStatus != undefined ? req.body.userStatus : user.userStatus
            user.userType = req.body.userType != undefined ? req.body.userType : user.userType
        }

        const updatedUser = await user.save();


        console.log(`#### ${updatedUser.userType} ${updatedUser.name} data updated ####`);
        res.status(200).send({
            name : updatedUser.name,
            userId : updatedUser.userId,
            email : updatedUser.email,
            userTypes : updatedUser.userType,
            userStatus : updatedUser.userStatus
        });

    }catch(err){
        console.log("#### Error while updating user data #### ", err.message);
        res.status(500).send({
            message : "Internal server error while updating user data"
        });
    }
}

exports.sendPasswordResetLink = (req,res)=>{
    try{
        const user = req.userInParams[0];
        sendEmail.resetPassword(user);
        return res.status(201).send({
            message : "Password reset link sent in Email"
        });

    }catch(err){
        console.log("#### Error while sending password reset email ##### ", err);
        res.status(500).send({
            message : "Internal server error while sending password reset email"
        });
    }
}

exports.resetPassword = async (req,res)=>{
    try{
        const user = req.user;
        user.password = req.body.password ? bcrypt.hashSync(req.body.password, 8) : user.password
        await user.save();
        console.log(`#### ${user.userType} ${user.name} password updated using link`);
        res.status(200).send({message : "password updated"});
    }catch(err){
        console.log("#### Error while updating user password using link #### ", err.message);
        res.status(500).send({
            message : "Internal server error while updating user password"
        });
    }
}