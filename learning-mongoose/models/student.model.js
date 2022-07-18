const mongoose = require("mongoose");


/**
 * Student 
 * 
 *    name 
 *    age
 */


const addressSchema = new mongoose.Schema({
    lane1 : String,
    lane2 : String,
    street : String,
    city : String,
    country : String,
    pinCode : Number
})
const studentSchema = new mongoose.Schema({
    name : {
         type : String,
         required : true
    },

    age : {
       type : Number,
       min : 16
    },
    email : {
        type : String,
        required : true,
        unique : true, // For we might have to write our custom validator
        minLength : 10,
        lowercase : true
    },
    createdAt : {
        type : Date ,
        immutable : true,
        default : () => {
            return Date.now();
        }
    },
    updatedAt : {
        type : Date,
        default : () => {
            return Date.now();
        }

    },
    subjects : {
        type : [String],
        //custom validation
        validate :  {
            validator : s => s.length != 0,
            message : props => "subject list can't be empty"
        }                 
    },

    address : addressSchema   // Embedded document
});

module.exports = mongoose.model("Student", studentSchema);