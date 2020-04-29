const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const PersonSchema = require("../model/Person");

const Person = mongoose.model("myPerson",PersonSchema);
const Profile = require("../model/Profile");
// require('../strategies/passport-jwt')(passport)

router.get('/',
    passport.authenticate('jwt',{session:false}),
    (req,res) =>{
        Profile.findOne({user: req.user.id})
        .then(profile => {
            if(profile){
                res.json({profile: profile})
            }
            else{
                res.json({error: "profile not found"})
                
            }
            
        })
        .catch()
    }
    )


router.post('/',
    passport.authenticate('jwt',{session:false}),
    (req,res) =>{
        const profileValues = {}
        profileValues.user = req.user.id

        if(req.body.username) profileValues.username = req.body.username
        if(req.body.website) profileValues.website= req.body.website
        if(req.body.country) profileValues.country= req.body.country
        if(req.body.portfolio) profileValues.portfolio= req.body.portfolio
        if(req.body.languages != undefined)
        profileValues.languages = req.body.languages.split(',')

        profileValues.social = {}
        if(req.body.youtube) profileValues.social.youtube= req.body.youtube
        if(req.body.facebook) profileValues.social.facebook = req.body.facebook
        if(req.body.instagram) profileValues.social.instagram = req.body.instagram

        Profile.findOne({user: req.user.id})
        .then(profile => {
            if(profile){
                Profile.findOneAndUpdate(
                    {user: req.user.id},
                    {$set: profileValues},
                    {new:true})
                .then(profile => {res.json({profile: profile})})
                .catch(err => {res.json({error:err})})
            }
            else{
                Profile.findOne({username: profileValues.username})
                .then(profile => {
                    if(profile){
                        res.json({username: "Username already exists"})
                    }
                    new Profile(profileValues).save()
                        .then(profile => {
                            res.json({profile: profile})
                        })
                        .catch(err => res.json({err:err}))
                })
                .catch()
            }
        })
        .catch()

})

router.get('/:username',(req,res) =>{
    Profile.findOne({username: req.params.username})
    .populate('user',['name','email'])
    .then(profile =>{
        if(profile){
            res.json({profile: profile})
        }
        else{
            res.json({error: "profile not found"})
        }
    })
    .catch(err => {
        console.log(err);
    })
})

router.delete('/',passport.authenticate('jwt',{session: false}),(req,res) =>{
    Profile.findOneAndRemove({user: req.user.id})
    .then(() => {
        Person.findOneAndRemove({_id:req.user._id})
        .then(() => {
            res.json({delete: "Delete success"})
        })
        .catch(err => {
            res.json({error: err})
        })
    })
    .catch(err => {
        res.json({error: err})
    })
})

router.post(
    '/workrole',
    passport.authenticate('jwt',{session:false}),
    (req,res)=>{
        Profile.findOne({user: req.user.id})
        .then(profile =>{
            if(profile){
                const newwork = {
                    role: req.body.role,
                    company: req.body.company,
                    country:  req.body.country,
                    from: req.body.from,
                    to: req.body.to,
                    details: req.body.details
                };
                profile.workrole.unshift(newwork)
                profile.save()
                .then(profile => {
                    res.json({profile: profile})
                })
                .catch(err => {
                    res.json({error1: err})
                })

            }
            else{
                res.json({error2:"profile not found"})
            }
        })
        .catch()

    })
 
router.delete('/:workrole',passport.authenticate('jwt',{session: false}),
(req,res) =>{
    Profile.findOne({user: req.user.id})
    .then(profile =>{
        const remove = profile.workrole.map(item => item.id).indexOf(req.params.w_id)
        profile.workrole.splice(remove,1)
        profile.save()
        .then(profile => {
            res.json({workrole: "workrole deleted suceefully"})
        })
        .catch(error =>{
            res.json({error: "Not deleted work role"})
        })
    })
    .catch()
}
)    
module.exports = router