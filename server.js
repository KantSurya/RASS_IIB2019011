const express = require('express');
const app = express();
const path = require('path');
const { urlencoded } = require('body-parser');
const port = 3000;
const mongoose = require('mongoose');
const Doctor = require('./models/doctor');
const Admin = require('./models/admin');
const Patient =require('./models/patient');

mongoose.connect('mongodb://localhost:27017/sahayata', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("Connection Open");
})
.catch((e)=>{
    console.log(e);
})

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views')); 
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res) => {
  res.render('home');
});

app.get('/login',(req,res)=>{
    res.render('login');
})

app.get('/signup',(req,res)=>{
    res.redirect('/doctorSignup');
})

app.get('/doctorSignup',(req,res)=>{
    res.render('doctorSignup');
})

//Patient Start
app.get('/patientSignup',(req,res)=>{
    res.render('patientSignup');
})

app.get('/admin',(req,res)=>{
    res.render('adminlogin');
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

//Patient End



//Admin Start

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
    console.log(data);
    res.render('adminDashboard',{ data });
})

//Admin End

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});