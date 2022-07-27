/**
 * Route logic for the ticket resource
 */
const ticketController = require("../controllers/ticket.controller");
const {authJwt} = require("../middlewares");

module.exports = (app) => {

   /**
    * Create a ticket
    * 
    *   POST /crm/api/vi/tickets
    * 
    * Assignment:
    * Add the middleware for the validation of the request body
    */
    app.post("/crm/api/v1/tickets/", [authJwt.verifyToken],ticketController.createTicket);
}