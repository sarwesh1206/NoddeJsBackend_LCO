const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

const bcrypt = require('bcryptjs')
const auth = require('./api/auth')
const question = require('./api/question');
const profile = require('./api/profile')

const db = require('./config/mongoose').url;
const app = express();


app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())
conn  = mongoose
    .connect(db,{
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
    .then((result) => console.error("connected successfully"+result))
    .catch(err => console.log(err));


app.get("/",()=> console.log("sever is running"))
app.use('/api/auth',auth);
app.use('/api/question',question);
app.use('/api/profile',profile);


app.listen(3000,()=> console.log("app is running"))
