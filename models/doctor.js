const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Appointment = require('./appointment.js');

const doctorSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : [true,'Please Enter a first Name']
    },
    lastName : {
        type : String,
        // required : true
    },
    email : {
        type : String,
        lowercase : true,
        required : [true,'Please enter an Email']
    },
    password : {
        type : String,
        required : [true,'Password cannot be empty']
    },
    age : {
        type : Number,
        // required : true
    },
    license :{
        type : String,
        required : true
    },
    specialization : {
        type : String,
        enum : ['dentist','dermatologist','gynecologist','pediatrician'],
        lowercase : true,
        required : [true,'Please enter your specialization as in your license']
    },
    isVerified : {
        type : Number,
        default : 0
    },
    appointmentRequest : [{type : Schema.Types.ObjectId,ref : 'Appointment'}]
})

const Doctor = mongoose.model('Doctor',doctorSchema);
module.exports = Doctor;

