var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;


const mongoose = require('mongoose')
const PersonSchema = require("../model/Person");
const Person = mongoose.model("myPerson",PersonSchema);

const url = require('../config/mongoose').url
const secret = require('../config/mongoose').secretkey    

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret;

module.exports = passport123 => { 
        passport123.use(new JwtStrategy(opts, function(jwt_payload, done) {
        Person.findById(jwt_payload.id)
            .then(person =>{
                if(person){
                    return done(null,person)

                }
                return done(null,false)
            })
            .catch(err => console.log(err))
        }));
}


