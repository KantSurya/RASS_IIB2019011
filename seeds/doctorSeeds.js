const mongoose = require('mongoose');
const Doctor=require('../models/doctor.js');

const doctorSeeds = [
    {
        firstName : "Severus",
        lastName : "Snape",
        email : "severus@gmail.com",
        password : "always",
        age : 47,
        license : "snape license",
        specialization : "dentist"
    },
    {
        firstName : "Carry",
        lastName : "Potter",
        email : "carry@gmail.com",
        password : "minny",
        age : 42,
        license : "carrylicense",
        specialization : "pediatrician",
    },
    {
        firstName : "Bron",
        lastName : "Weasley",
        email : "bron@gmail.com",
        password : "chermoine",
        age : 36,
        license : "bronlicense",
        specialization : "gynecologist",
    },
    {
        firstName : "Chermoine",
        lastName : "Granger",
        email : "chermoine@gmail.com",
        password : "rum",
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
    console.log("Doctor added in DB");
})
.catch((err)=>{
    console.log("Error in deleting all Doctors Seed",err);
})
