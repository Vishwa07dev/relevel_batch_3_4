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
    /**
     * deleting the collection
     */
  /** 
    await Student.collection.drop(); // Drop the existing coollection
    const student  = await Student.create({
         name : "Vishwa",
         age : 99,
         email : "kankvish@gmail.com",
         subjects : ["Maths"],
         country : "India" , // This field get's ignored
         address : {
             lane1 : "l1",
             lane2 : "l2",
             street : "Bellandur",
             city : "Banaglore",
             country : "India",
             pinCode :560103
         }
    });

    const student1  = await Student.create({
        name : "Mohan",
        age : 99,
        email : "kankvish1@gmail.com",
        subjects : ["English"],
        country : "India" , // This field get's ignored
        address : {
            lane1 : "l1",
            lane2 : "l2",
            street : "Bellandur",
            city : "Banaglore",
            country : "India",
            pinCode :560103
        }
   });

   const student2  = await Student.create({
    name : "Akash",
    age : 99,
    email : "kankvish2@gmail.com",
    subjects : [""],
    country : "India" , // This field get's ignored
    address : {
        lane1 : "l1",
        lane2 : "l2",
        street : "Bellandur",
        city : "Banaglore",
        country : "India",
        pinCode :560103
    }
});

const student3  = await Student.create({
    name : "Sarvesh",
    age : 60,
    email : "kankvish4@gmail.com",
    subjects : ["Physics"],
    country : "India" , // This field get's ignored
    address : {
        lane1 : "l1",
        lane2 : "l2",
        street : "Bellandur",
        city : "Banaglore",
        country : "India",
        pinCode :560103
    }
});

const student4  = await Student.create({
    name : "Priyanka",
    age : 57,
    email : "kankvish5@gmail.com",
    subjects : ["Chemistry"],
    country : "India" , // This field get's ignored
    address : {
        lane1 : "l1",
        lane2 : "l2",
        street : "Bellandur",
        city : "Banaglore",
        country : "India",
        pinCode :560103
    }
});

    console.log(student); **/


    /**
     * Using mongoose I want to search a record/document based on id
     */

    //const stud  = await Student.findById("62d5806fcad9f5ec59cb7395"); // This is a super fast query

    //console.log(stud);

    /** 
    const stud = await Student.findOne({name : "Vishwa"});   // LS
    console.log(stud);  **/

    /** 
    const stud = await Student.deleteOne({name : "Vishwa"});
    console.log(stud);

    **/

    /**
     * Using the Where clause
     * 
     * Students whose age is greater than 20
     */

    const studs = await Student.where("age").gt(60).where("name").equals("Akash");

    const roles  = await Roles.find();
    console.log(studs);



    
}catch(err){
    console.log(err);
}
    
}

/**
 * Execute the function
 */
dbOperation();