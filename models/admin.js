const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Doctor = require('./doctor');

const adminSchema = new Schema({
    firstName   :   String, 
    lastName    :   String,
    email       :   String,
    password    :   String,
});

const Admin = mongoose.model('Admin',adminSchema);

module.exports = Admin;

