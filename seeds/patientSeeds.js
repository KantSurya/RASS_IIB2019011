const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/sahayata', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>console.log("Mongoose Connection Open!!!"))
    .catch(err=>console.log("Mongoose Connection ERROR: ",err));

// mongoose.connection.db.dropCollection("patients")
//     .then(()=>console.log("Patients collection dropped successfully!!!"))
//     .catch(err=>console.log("Error in dropping Patients collection!!"));

const Patient=require('../models/patient.js');

const emptyCollection=async ()=>{
    await Patient.deleteMany({});  
}
const seedCollection=async()=>{
    await Patient.insertMany([
        {
            firstName:"Harry",
            lastName:"Potter",
            email:"harry@hogwarts.ac.in",
            password:"ginny",
            city:"London",
            gender:"Male",
            age:"17",
            phone:"8273827832"    
        },
        {
            firstName:"Ron",
            lastName:"Weasley",
            email:"ron@hogwarts.ac.in",
            password:"hermoine",
            city:"London",
            gender:"Male",
            age:"17",
            phone:"3423789238"
        },
        {
            firstName:"Hermoine",
            lastName:"Granger",
            email:"hermoine@hogwarts.ac.in",
            password:"cant_say",
            city:"London",
            gender:"Female",
            age:"17",
            phone:"8329382978"    
        }
    ]);
}

emptyCollection()
    .then(()=>seedCollection());



    


