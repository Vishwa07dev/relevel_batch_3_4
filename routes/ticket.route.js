const ticketController = require('../controllers/ticket.controller');
const {verifyTicket, verifyTokens, verifyBody} = require('../middlewares')

module.exports = (app)=>{
    app.post("/crm/api/v2/tickets/", [verifyTokens.userToken, verifyBody.validateNewTicketBody], ticketController.createTicket);
    app.get("/crm/api/v2/tickets/", [verifyTokens.userToken], ticketController.getAllTickets)
    app.put("/crm/api/v2/tickets/:id", [verifyTokens.userToken, verifyTicket.isValidOwnerOfTheTicket], ticketController.updateTicket)
}