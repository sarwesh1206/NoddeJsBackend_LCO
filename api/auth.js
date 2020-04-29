const jsonwt = require('jsonwebtoken')
 const passport = require('passport')
const bcrypt = require('bcryptjs')
const  express = require('express');
const mongoose = require("mongoose");
const router = express.Router();
const secret = require('../config/mongoose').secretkey
 require('../strategies/passpor-jwt')(passport)


router.get('/',(req,res) =>{res.json({test: " auth is success"})})

const PersonSchema = require("../model/Person");
const Person = mongoose.model("myPerson", PersonSchema);
// const Person = require('../model/Person');

router.post('/register',(req,res) =>{
    Person.findOne({email: req.body.email})
        .then(person =>{
            if(person){
                res.status(400).json({email: "Already registered"});
            }
            else{
                const newPerson = new Person({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                    
                })
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(newPerson.password, salt, function(err, hash) {
                        if(err){
                            throw err
                        }
                        newPerson.password = hash
                        newPerson.save()
                            .then(person => res.status(200).json(person))
                            .catch(err => console.log(err));

                    });
                });
            }
        })
        .catch(err => console.log(err))
})

router.get('/login',(req,res) => {
    const email = req.body.email
    const password = req.body.password
    Person.findOne({email})
        .then(person =>{
            if(person){
                bcrypt.compare( password,person.password).then((isTrue) => {
                    if(isTrue) {
                        const payload = {
                            id: person.id,
                            name: person.name,
                            email: person.email
                        };
                        jsonwt.sign(
                            payload,
                            secret,
                            {expiresIn:3600000000000},
                            (err,token) =>{

                                res.json({success: "true",
                                token: "Bearer " + token})
                            }
                        );
                    }
                    else res.json({error: "Password is not correct"})
                })
                .catch(err => console.log(err))

            } else{
                res.json({test:"user not found with this email"});
            }
        })
        .catch(err => console.log("rrrrrrrrrrrrrr"))

})


router.get('/profile',passport.authenticate('jwt',{session: false}),(req,res) => {
    res.json({
        id:req.user.id,
        name: req.user.name    
    })
})
module.exports = router;