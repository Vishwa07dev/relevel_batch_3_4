const mongoose = require("mongoose");


/**
 * Student 
 * 
 *    name 
 *    age
 */


const studentSchema = new mongoose.Schema({
    name : String,
    age : Number
});

module.exports = mongoose.model("Student", studentSchema);