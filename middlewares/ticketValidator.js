const User = require("../models/user.model")
const Ticket = require('../models/ticket.model')
const constants = require('../utils/constants')

const isValidOwnerOfTheTicket = async (req,res,next) =>{

    const user = req.user;  //got from authJwt middlewere
    const ticket = await Ticket.findOne({_id : req.params.id});

    if (user.userType == constants.userType.customer && user.userId != ticket.reporter){ //is customer but not reporter
        return res.status(403).send({
            message : "only ADMIN | OWNER | ASSIGNED ENGINEER is allowed to perform this action"
        });
    }else if(user.userType == constants.userType.engineer && user.userId != ticket.reporter && user.userId != ticket.assignee){ //if engineer but not reporter or assignee
        return res.status(403).send({
            message : "only ADMIN | OWNER | ASSIGNED ENGINEER is allowed to perform this action"
        })
    }

    if (req.body.status && req.body.status != ticket.status){
        if(req.body.status != constants.ticketStatus.open && req.body.status != constants.ticketStatus.closed && req.body.status != constants.ticketStatus.blocked){
            return res.status(403).send({
                message : "Ticket status passed is not valid"
            });
        }
    }


    if (req.body.assignee && req.body.assignee != ticket.assignee){    //if assignee is present and not same

        if(user.userType != constants.userType.admin){      //if user is not admin
            return res.status(403).send({
                message : "only ADMIN is allowed to re-assign a ticket"
            });
        }

        if(ticket.status == constants.ticketStatus.open){   //change assignee only if ticket is open
            const engineer =  await User.findOne({userId : req.body.assignee});
            if(!engineer){
                return res.status(401).send({
                    message : "Engineer userId passed as assignee is wrong"
                });
            }
            if(engineer.userType != constants.userType.engineer){
                return res.status(401).send({
                    message : "UserId passed as assignee is not an engineer"
                });
            }
            if(engineer.userStatus != constants.userStatus.approved){
                return res.status(401).send({
                    message : "Engineer is not approved yet"
                });
            }
            req.newAssignee = engineer
        }else{
            return res.status(403).send({
                message : "You cannot reassign a closed ticket"
            });
        }
    }
    req.ticket = ticket     //add ticket in req for further use
    next();
}


const verifyTicket = {
    isValidOwnerOfTheTicket
};

module.exports = verifyTicket;