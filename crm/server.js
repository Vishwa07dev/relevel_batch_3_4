/**
 * This is going to be the starting point of the application
 */
const express = require('express');
const app = express();
const serverConfig = require('./configs/server.config');


app.listen(serverConfig.PORT, ()=>{
    console.log("Started the server on the PORT number : ", serverConfig.PORT);
});