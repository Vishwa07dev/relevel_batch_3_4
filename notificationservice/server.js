const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));






app.listen(8000, ()=>{  // TODO : Move this port num to the config fodler and .env file
    console.log("Server started");
})