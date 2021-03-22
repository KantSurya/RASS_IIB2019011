const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/sahayata', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>console.log("Mongoose Connection Open!!!"))
    .catch(err=>console.log("Mongoose Connection ERROR: ",err));

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
        type : Boolean,
        default : false
    }
})

const doctorSeeds = [
    {
        firstName : "Rishi",
        lastName : "Gupta",
        email : "guptaRIshi@gmail.com",
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

const Doctor = mongoose.model('Doctor',doctorSchema);

const deleteAll = async ()=>{
    await Doctor.deleteMany({});
}

deleteAll()
.then(async ()=>{
    const res = await Doctor.insertMany(doctorSeeds);
    console.log(res);
})
.catch(()=>{
    console.log("Error in deleting all Doctors Seed")
})
module.exports = Doctor;

