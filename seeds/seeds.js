const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/sahayata', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log("Connection Open");
        mongoose.connection.db.dropDatabase();
    })
    .catch((err)=>console.log(err));

const doctorSeed = require('./doctorSeeds.js');
const patientSeed = require('./patientSeeds.js');
const adminSeed = require('./adminSeeds.js');