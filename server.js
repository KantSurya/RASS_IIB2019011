const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views')); 
app.use(express.static(__dirname + '/public'))

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

app.get('/patientSignup',(req,res)=>{
    res.render('patientSignup');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});