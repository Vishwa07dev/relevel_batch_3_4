/**
 * This is the controller file for the user resource
 */
const User = require("../models/user.model");
const objectConverter = require("../utils/objectConverter");

/**
 * 
 * Get the list of all the users 
 */
exports.findAll = async (req, res) => {
    

    const queryObj = {};
    /**
     * Reading the optional query params
     */
    const userTypeQP = req.query.userType;
    const userStatusQP = req.query.userStatus;
    if(userTypeQP){
        queryObj.userType = userTypeQP;
    }

    if(userStatusQP){
        queryObj.userStatus = userStatusQP;
    }


    try {
        const users = await User.find(queryObj);
        res.status(200).send(objectConverter.userResponse(users));

    } catch (err) {
        console.log("Error while fetching all the users");
        res.status(500).send({
            message: "Internal server error"
        })
    }

}

