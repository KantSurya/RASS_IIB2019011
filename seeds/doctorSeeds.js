const mongoose = require('mongoose');
const Doctor=require('../models/doctor.js');

const doctorSeeds = [
    {
        firstName : "Severus",
        lastName : "Snape",
        email : "severus@gmail.com",
        password : "always",
        age : 47,
        license : "https://st4.depositphotos.com/5532432/20189/v/1600/depositphotos_201890958-stock-illustration-business-licence-flat-design-icon.jpg",
        specialization : "dentist",
        isVerified: 1
    },
    {
        firstName : "Carry",
        lastName : "Potter",
        email : "carry@gmail.com",
        password : "minny",
        age : 42,
        license : "https://st4.depositphotos.com/5532432/20189/v/1600/depositphotos_201890958-stock-illustration-business-licence-flat-design-icon.jpg",
        specialization : "pediatrician",
        isVerified: 1
    },
    {
        firstName : "Bron",
        lastName : "Weasley",
        email : "bron@gmail.com",
        password : "chermoine",
        age : 36,
        license : "https://st4.depositphotos.com/5532432/20189/v/1600/depositphotos_201890958-stock-illustration-business-licence-flat-design-icon.jpg",
        specialization : "gynecologist"
    },
    {
        firstName : "Chermoine",
        lastName : "Granger",
        email : "chermoine@gmail.com",
        password : "rum",
        age : 35,
        license : "https://st4.depositphotos.com/5532432/20189/v/1600/depositphotos_201890958-stock-illustration-business-licence-flat-design-icon.jpg",
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
