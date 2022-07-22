/**
 * This is going to be the starting point of the application
 */
const express = require('express');
const app = express();
const serverConfig = require('./configs/server.config');
const bodyParser = require("body-parser");
const mongoose  = require("mongoose");
/**
 * Register the body-parser middleware
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));


/**
 * Initialize the connection to the mongoDB
 */


/**
 *  We need to connect router to the server
 * 
 */
require("./routes/auth.route")(app); // this registers server with the route


app.listen(serverConfig.PORT, ()=>{
    console.log("Started the server on the PORT number : ", serverConfig.PORT);
});