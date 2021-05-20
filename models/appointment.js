const mongoose = require('mongoose');
const Patient = require('./patient.js');
const Doctor = require('./doctor.js');
const Schema = mongoose.Schema;

const appointmentSchema = new mongoose.Schema({
    messageBody : [
        {
            text : {
                type : String,
                default : " "
            },
            isPat : {
                type : Number,
                required : true
            }
        }
    ],
    patientID : {type : Schema.Types.ObjectId,ref:'Patient'},
    doctorID : {type : Schema.Types.ObjectId,ref :'Doctor'},
    isAccepted: {
        type : Number,
        default : 0
    },
    title: {
        type : String,
        default : "No title"
    },
    description: {
        type : String,
        default : "No description"
    }
});

const Appointment = mongoose.model('Appointment',appointmentSchema);
module.exports = Appointment;