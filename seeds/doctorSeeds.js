const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/sahayata', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>console.log("Mongoose Connection Open!!!"))
    .catch(err=>console.log("Mongoose Connection ERROR: ",err));
// const doctorSchema = new Schema({
//     firstName   :   String,
//     lastName    :   String,
//     email       :   String,
//     speciality  :   String, 
//     license     :   String,
//     password    :   String,
//     age         :   Number,
//     isVerfied   :   Boolean
// });

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
        enum : ['dentist','dermatologists','gynecologist','pediatrician'],
        lowercase : true,
        required : [true,'Please enter your specialization as in your license']
    },
    isVerified : {
        type : Boolean,
        default : false
    }
})




const Doctor = mongoose.model('Doctor',doctorSchema);
module.exports = Doctor;

