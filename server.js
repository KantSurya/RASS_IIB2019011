const express = require('express');
const app = express();
const path = require('path');
const { urlencoded } = require('body-parser');
const methodOverride = require('method-override')
const port = 3000;
const mongoose = require('mongoose');
const Doctor = require('./models/doctor');
const Admin = require('./models/admin');
const Patient = require('./models/patient');

mongoose.connect('mongodb://localhost:27017/sahayata', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("Connection Open");
})
.catch((e)=>{
    console.log(e);
})

mongoose.set('useFindAndModify', false);

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views')); 
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'))


app.get('/', (req, res) => {
  res.render('home');
});

app.get('/signup',(req,res)=>{
    res.redirect('/doctorSignup');
})

//###### LOGIN START #######
app.get('/login',(req,res)=>{
    res.render('login');
})

app.post('/login',async (req,res)=>{
    let {username,password}=req.body;
    console.log("Username: ",username);
    console.log("Password: ",password);
    let account=await Patient.findOne({email:username,password:password});
    console.log(account);    
    if(account){        
        res.send("Welcome Patient!!!");
    }
    else{
        account=await Doctor.findOne({email:username,password:password});
        console.log(account);
        if(account){
            if(account.isVerified == 0) res.send("Please wait for the admin");          
            if(account.isVerified == 2) res.send("You are rejected soory :(");          
            else res.send("Welcome Doctor!!!");
        }
        else{
            res.redirect('/login');
        }
    }
})

//###### LOGIN END #######



//###### DOCTOR START #######
app.get('/doctorSignup',(req,res)=>{
    res.render('doctorSignup');
})

app.post('/doctorSignup', (req,res)=>{
    const {firstName,lastName,email,password,age,license,specialization} = req.body;
    const newDoctor = {
        firstName   :       firstName, 
        lastName    :       lastName,
        email       :       email,
        password    :       password,
        age         :       age,
        license     :       license,
        specialization :    specialization,
        isVerified  :       false
    }
    console.log(newDoctor);
    const doctorToInsert = new Doctor(newDoctor);
    doctorToInsert.save()
    .then(()=>{
        console.log("Doctor added in DB");
    })
    .catch((e)=>{
        console.log(e);
    })
    res.redirect('/login');
})

//###### DOCTOR END #######



//###### PATIENT START #######

app.get('/patientSignup',(req,res)=>{
    res.render('patientSignup');
})

app.post('/patientSignup',async (req,res)=>{
    const {firstName,lastName,gender,email,phone,password,city,age}=req.body;
    const new_patient=new Patient({
        firstName:firstName,
        lastName:lastName,
        gender:gender,
        email:email,
        phone:phone,
        password:password,
        city:city,
        age:age
    });
    await new_patient.save();
    res.redirect('/login');
})

// app.get('/patient/:id')
//###### PATIENT END #######



//###### ADMIN STARTt #######

app.get('/admin',(req,res)=>{
    res.render('adminlogin');
})

//renders the admin login page
app.post('/admin',async (req,res)=>{
    const {email , password} = req.body;
    console.log(email);
    console.log(password);
    const data = await Admin.findOne({email: email,password: password});
    if(data) res.redirect(`/admin/${data._id}`);
    else res.redirect('/admin');
    
})

// renders form to add new admin
app.get('/admin/new', (req,res)=>{
    res.render('adminform');
})


app.post('/admin/new',async (req,res)=>{
    const {firstName, lastName, email,password} = req.body;
    const adminseedprod = {
        firstName   :   firstName, 
        lastName    :   lastName,
        email       :   email,
        password    :   password,
    }
    const admintoinsert = new Admin(adminseedprod);
    admintoinsert.save()
    .then(()=>{
        console.log("Admin added in DB");
    })
    .catch((e)=>{
        console.log(e);
    })
    res.redirect('/admin');

})


//renders admin dashboard
app.get('/admin/:id', async(req,res)=>{
    const { id } = req.params; 
    const data = await Admin.findById(id);
    const doctor = await Doctor.find({isVerified : 0}); 
    res.render('adminDashboard',{ data ,doctor});
})


app.patch('/admin/:adid/:docid', async(req,res)=>{
    const {adid , docid} = req.params;
    Doctor.findByIdAndUpdate(docid,{ "isVerified" : "1"}, function(err,result){
        if(err){
            console.log(err);
        }
    });
    res.redirect(`/admin/${adid}`);

})

app.delete('/admin/:adid/:docid', async(req,res)=>{
    const {adid , docid} = req.params;
    Doctor.findByIdAndUpdate(docid,{ "isVerified" : "2"}, function(err,result){
        if(err){
            console.log(err);
        }
    });
    res.redirect(`/admin/${adid}`);
})

//###### ADMIN END #######


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});