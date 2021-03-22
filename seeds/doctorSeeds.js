const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/sahayata', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>console.log("Mongoose Connection Open!!!"))
    .catch(err=>console.log("Mongoose Connection ERROR: ",err));

const Doctor=require('../models/doctor.js');
const doctorSeeds = [
    {
        firstName : "Rishi",
        lastName : "Gupta",
        email : "guptaRishi@gmail.com",
        password : "mypass",
        age : 32,
        license : "mylicenseismylicense",
        specialization : "dentist"
    },
    {
        firstName : "Bron",
        lastName : "Weasley",
        email : "bron@gmail.com",
        password : "bronpassword",
        age : 36,
        license : "bronlicense",
        specialization : "gynecologist",
    },
    {
        firstName : "Carry",
        lastName : "Potter",
        email : "carry@gmail.com",
        password : "carrypassword",
        age : 42,
        license : "carrylicense",
        specialization : "pediatrician",
    },
    {
        firstName : "Chermoine",
        lastName : "Granger",
        email : "chermoine@gmail.com",
        password : "hermoinePassword",
        age : 35,
        license : "chermoinelicense",
        specialization : "dermatologist"
    }
]


const deleteAll = async ()=>{
    await Doctor.deleteMany({});
}

deleteAll()
.then(async ()=>{
    const res = await Doctor.insertMany(doctorSeeds);
    console.log(res);
})
.catch((err)=>{
    console.log("Error in deleting all Doctors Seed",err);
})
