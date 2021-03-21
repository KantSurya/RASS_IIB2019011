const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    firstName   :   String,
    lastName    :   String,
    email       :   String,
    speciality  :   String, 
    license     :   String,
    password    :   String,
    age         :   Number,
    isVerfied   :   Boolean
});

const Doctor = mongoose.model('Doctor',doctorSchema);

module.exports = Doctor;

