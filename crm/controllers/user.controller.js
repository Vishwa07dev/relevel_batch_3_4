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

    try {
        const users = await User.find();
        res.status(200).send(objectConverter.userResponse(users));

    } catch (err) {
        console.log("Error while fetching all the users");
        res.status(500).send({
            message: "Internal server error"
        })
    }

}

