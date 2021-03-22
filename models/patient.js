const mongoose=require('mongoose');
const patientSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,'Please Enter a first Name']
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        lowercase:true,
        required:[true,'Please Enter an email']
    },
    password:{
        type:String,
        required:[true,'Password cannot be empty']
    },
    city:{
        type:String
    },
    age:{
        type:Number
    },
    phone:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true,
        lowercase:true,
        enum:['male','female']
    }
});

const Patient=mongoose.model('Patient',patientSchema);
module.exports=Patient;
