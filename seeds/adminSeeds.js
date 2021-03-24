const mongoose = require('mongoose');
const Doctor = require('../models/doctor');
const Admin = require('../models/admin');

const adminseedprod = {
    firstName   :   "admin", 
    lastName    :   "test",
    email       :   "admin@gmail.com",
    password    :   "password",
}

const deleteAll = async ()=>{
    await Admin.deleteMany({});
}
const admintoinsert = new Admin(adminseedprod);

deleteAll()
.then(()=> admintoinsert.save())
.then(()=>{
    console.log("Admin added in DB");
})
.catch((e)=>{
    console.log(e);
})



