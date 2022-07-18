/**
 * Will use this file to connect to DB and execute queries
 */

const mongoose = require("mongoose");

console.log(typeof mongoose);
//console.log(mongoose);

/**
 * Try making a connection to the mongoDB
 * mongodb://127.0.0.1/mdemo
 */
mongoose.connect("mongodb://localhost/mdemo", ()=>{
    console.log("Connected to Mongo DB");
}, err => {
    console.log("Error :", err);
});


const Student = require("./models/student.model");
/**
 * Databse operation
 */
async function dbOperation(){
    
  try{
    const student  = await Student.create({
         name : "Vishwa",
         age : 99
    });

    /**
     * Student.create({
         name : "Vishwa",
         age : 99
    }).then()
     */
    console.log(student);
}catch(err){
    console.log(err);
}
    
}

/**
 * Execute the function
 */
dbOperation();