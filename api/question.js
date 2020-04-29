const express = require('express');
const passport = require('passport');
const router = express.Router();
const Profile = require("../model/Profile");
const Question = require("../model/Question");
router.get('/',(req,res) =>{res.json({test: "question is success"})})



router.post('/',
    passport.authenticate('jwt',{session:false}),
    (req,res) =>{

        const newQuestion = new Question({
            textone: req.body.textone,
            texttwo: req.body.textwo,
            user: req.user.id,
            name: req.user.name
        }) 

        newQuestion.save()
        .then(question =>{
            res.json({question:"question created suceesfully"})
        })
        .catch(error =>{
            res.json({error: error})
        })

})

router.post(
    '/answer/:id',
    passport.authenticate('jwt',{session: false}),
    (req,res) =>{
        Question.findById(req.params.id)
            .then( question => {
                const answer = {
                    user: req.user.id,
                    name: req.body.name,
                    text: req.body.text
                }
                question.answers.push(answer)
                question.save()
                .then(question => {
                    res.json({question})
                })
                .catch(error =>{
                    res.json({error})
                })
            }


            )
            .catch(error => {
                res.json({error})
            })
    }

)


router.post('/upvote/:id',
 passport.authenticate('jwt',{session:false}),
 (req,res) =>{
     Question.findById(req.params.id)
     .then(question =>{
         if(
             question.upvote.filter(
                upvote => upvote.user.toString() == req.user.id.toString()
             ).length > 0
             )
             {
         res.json({upvote: "user already upvoted"})
        }
         else{
             question.upvote.push({user:req.user.id})
             question.save()
             .then(question => {
                 res.json({questoin: "upvoted succcessfully"})
             })
             .catch(error => {
                 res.json({error:error})
             })
         }
     })
     .catch()
 })
module.exports = router