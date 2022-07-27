/**
 * This file should have the logic to create controller for Ticket resource
 */

const constants = require("../utils/constants");
const Ticket = require("../models/ticket.model");
const User = require("../models/user.model");


/**
 * Method to create the logic of creating tickets
 * 
 * 1. Any authenticated user should be able to create the ticket
 *          -- Middleware should take care of this
 * 
 * 2. Ensure that request body has valid data
 *          -- Middleware
 * 
 * 3. After the ticket is created, ensure the customer and Engineer documents are
 * also updated
 *     
 */

exports.createTicket = async  (req, res) => {


    try {
        /**
         * Read from the request body and create the ticket object
         */
        const ticketObj = {
            title: req.body.title,
            ticketPriority: req.body.ticketPriority,
            description: req.body.description,
            status: req.body.status,
            reporter: req.userId // I  got it from access token
        }

        /**
         * Find the Engineer available and attach to the ticket Object
         * 
         * Assignment :
         * Extend this to choose the Engineer which has least numner of tickets assigned
         */
        const engineer = await User.findOne({
            userType: constants.userTypes.engineer,
            userStatus: constants.userStatus.approved
        });

        if (engineer) {
            ticketObj.assignee = engineer.userId;
        }

        /**
         * Insert the ticket Object
         *     - Insert that ticket id in customer and engineer document
         */

        const ticketCreated  = await Ticket.create(ticketObj);

        if(ticketCreated){

            //Update the Customer document
            const customer = await User.findOne({
                userId : req.userId
            });
            customer.ticketsCreated.push(ticketCreated._id);
            await customer.save()
            
            //Update the Engineer document
            if(engineer){
                engineer.ticketsAssigned.push(ticketCreated._id);
                await engineer.save();
            }

            res.status(201).send(ticketCreated);
        }

    } catch (err) {
        console.log("Error while doing the DB operations ", err.message);
        res.status(500).send({
            message: "Internal server error"
        })
    }


}

/**
 * Getting all the tickets
 */

exports.getAllTickets = async (req, res) => {
   
    /**
     * We need to find the userType
     * and depending on the user type we need to frame the search query
     */

    const user = await User.findOne({userId : req.userId});
    const queryObj = {};

    if(user.userType == constants.userTypes.customer){
       /**
        *    Query for fetching all the tickets created by the user
        * 
        * */ 
        const ticketsCreated = user.ticketsCreated ; // this is an array of ticket _id 
        if(!ticketsCreated){
            return res.staus(200).send({
                message : "No tickets created by the user yet"
            });
        };

        queryObj["_id"] = { $in : ticketsCreated};

        console.log(queryObj);


    }else if(user.userType == constants.userTypes.engineer){
        /**
         * Query object for fetching all the tickets assigned/created to a user
         */
         
    }

    const tickets = await Ticket.find(queryObj);


}