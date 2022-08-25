const User = require('../models/user.model')
const Ticket = require('../models/ticket.model')
const constants = require("../utils/constants")
const sendNotificationReq = require('../utils/sendEmailRequest')

exports.createTicket = async (req,res)=>{
    try{
        const ticketObj = {
            title : req.body.title,
            ticketPriority : req.body.ticketPriority,
            description : req.body.description,
            reporter : req.user.userId
        }
    
        const engineerarray = req.availableEngineers    // array of approved engineers received from middlewere

        const engineer = engineerarray.sort((a,b)=>a.openTicketsAssigned.length - b.openTicketsAssigned.length)[0] // sorting them and selecting one with least OPEN tickets

    
        if(engineer){
            ticketObj.assignee = engineer.userId
        }

        const ticketCreated = await Ticket.create(ticketObj);
        if(ticketCreated){
            const customer = req.user;  // got user from JWT userID in middlewere

            customer.openTicketsCreated.push(ticketCreated._id);
            await customer.save();

            if(engineer){
                engineer.openTicketsAssigned.push(ticketCreated._id);
                await engineer.save();
            }

            sendNotificationReq.ticketCreated(ticketCreated, customer, engineer)
            
            console.log(`#### New ticket '${ticketCreated.title}' created by ${customer.name} ####`);
            res.status(201).send(ticketCreated);
        }

    }catch(err){
        console.log("#### Error while creating new ticket #### ", err);
        res.status(500).send({
            message : "Internal server error while creating new ticket"
        });
    }
}


exports.getAllTickets = async (req,res)=>{
    try{
        const queryObj = {}
    
        if(req.user.userType == constants.userType.customer){
    
            if(!req.user.ticketsCreated){
                return res.status(200).send({
                    message : "No tickets created by the user yet"
                });
            }

            if(req.query.status == constants.ticketStatus.open){    //if query params is set to open
                queryObj["_id"] = {$in : req.user.openTicketsCreated};

            } else if(req.query.status == constants.ticketStatus.closed){   //if query params is set to closed
                queryObj["_id"] = {$in : req.user.closedTicketsCreated};

            } else{     //if no query params are provided
                req.user.ticketsCreated = req.user.openTicketsCreated.concat(req.user.closedTicketsCreated);
                queryObj["_id"] = {$in : req.user.ticketsCreated};
            }


        }else if(req.user.userType == constants.userType.engineer){

            if(req.query.status == constants.ticketStatus.open){    //if query params is set to open
                queryObj["$or"] = [{"_id" : {$in : req.user.openTicketsCreated}},{"_id" : {$in : req.user.openTicketsAssigned}}]

            } else if(req.query.status == constants.ticketStatus.closed){   //if query params is set to closed
                queryObj["$or"] = [{"_id" : {$in : req.user.closedTicketsCreated}},{"_id" : {$in : req.user.closedTicketsAssigned}}]

            } else{     //if no query params are provided concat both open and close tickets
                req.user.ticketsCreated = req.user.openTicketsCreated.concat(req.user.closedTicketsCreated);
                req.user.ticketsAssigned = req.user.openTicketsAssigned.concat(req.user.closedTicketsAssigned);
                queryObj["$or"] = [{"_id" : {$in : req.user.ticketsCreated}},{"_id" : {$in : req.user.ticketsAssigned}}]
            }

        }
    
        const tickets = await Ticket.find(queryObj);
    
        res.status(200).send(tickets);
    
    }catch(err){
        console.log("#### Error while getting tickets #### ", err.message);
        res.status(500).send({
            message : "Internal server error while getting tickets"
        });
    }
}

exports.updateTicket = async (req,res)=>{
    try{
        const ticket = req.ticket;
        const ticketReporter = await User.findOne({userId : ticket.reporter});
        const ticketAssignee = await User.findOne({userId : ticket.assignee});
    
        ticket.title = req.body.title? req.body.title : ticket.title;
        ticket.description = req.body.description? req.body.description : ticket.description;
        ticket.ticketPriority = req.body.ticketPriority? req.body.ticketPriority : ticket.ticketPriority;

        if (req.body.status && ticket.status != req.body.status){  //if status is non-empty and diffrent
           
            const currentTicketStatus = ticket.status;
            ticket.status = req.body.status;

            if (currentTicketStatus == constants.ticketStatus.open){    //if ticket is open and to be closed

                ticketReporter.openTicketsCreated.remove(ticket._id);   //change status in reporter document in DB
                ticketReporter.closedTicketsCreated.push(ticket._id);

                ticketAssignee.openTicketsAssigned.remove(ticket._id);  //change status in reporter document in DB
                ticketAssignee.closedTicketsAssigned.push(ticket._id);

                await ticketReporter.save();        //save changes
                await ticketAssignee.save();

            } else {            //if ticket is closed and to be reopened

                ticketReporter.closedTicketsCreated.remove(ticket._id);
                ticketReporter.openTicketsCreated.push(ticket._id);

                ticketAssignee.closedTicketsAssigned.remove(ticket._id);
                ticketAssignee.openTicketsAssigned.push(ticket._id)

                await ticketReporter.save();
                await ticketAssignee.save();

            }
        }

        if (req.body.assignee && ticket.assignee != req.body.assignee){    //if asignee is non-empty and diffrent

            ticket.assignee = req.body.assignee;
            const newAssignee = req.newAssignee;

            ticketAssignee.openTicketsAssigned.remove(ticket._id);  //remove ticket from current assignee document
            newAssignee.openTicketsAssigned.push(ticket._id);       //add ticket to new assignee document

            await ticketAssignee.save();
            await newAssignee.save();

            ticketAssignee = newAssignee;

        }
    
        const updatedTicket = await ticket.save();

        console.log(`Ticker ${updatedTicket._id} updated by ${req.user.userType} ${req.user.name}`);

        sendNotificationReq.ticketUpdated(updatedTicket, ticketReporter, ticketAssignee);

        res.status(200).send(updatedTicket);

    }catch(err){
        console.log("#### Error while updating ticket #### ", err);
        res.status(500).send({
            message : "Internal error while updating the ticket"
        });
    }
}