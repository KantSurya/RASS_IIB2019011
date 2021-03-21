const mongoose = require('mongoose');
const Doctor = require('../models/doctor');
const Admin = require('../models/admin');

mongoose.connect('mongodb://localhost:27017/sahayata', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("Connection Open");
})
.catch((e)=>{
    console.log(e);
})

const adminseedprod = {
    firstName   :   "admin", 
    lastName    :   "test",
    email       :   "admin@gmail.com",
    password    :   "password",
}

const admintoinsert = new Admin(adminseedprod);
admintoinsert.save()
.then(()=>{
    console.log("Admin added in DB");
})
.catch((e)=>{
    console.log(e);
})



