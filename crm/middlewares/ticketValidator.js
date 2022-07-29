
const User = require("../models/user.model");
const Ticket = require("../models/ticket.model");
const constants = require("../utils/constants");

const isValidOwnerOfTheTicket = async (req, res, next) =>{

   const user  =  await User.findOne({userId : req.userId});

   const ticket = await  Ticket.findOne({_id : req.params.id});

   if(user.userType == constants.userTypes.customer){
       const ownerId = ticket.reporter;

       if(user.userId != ownerId){
           return res.status(403).send({
               message : "Only ADMIN | OWNER | ASSIGNED ENGINEER is allowed"
           })
       }
       next();
   }else if( user.userType == constants.userTypes.engineer){
       const ownerId = ticket.reporter ;
       const engineerId = ticket.assignee;

       if(user.userId == ownerId || user.userId == engineerId){
           next();
       }else{
        return res.status(403).send({
            message : "Only ADMIN | OWNER | ASSIGNED ENGINEER is allowed"
        })
       }
   }

   next();

}