const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
    name:{
        type:String,
        remove: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    profilepic:{
        type: String
    },
    age: {
        type: Number,
    },
    date:{
        type:Date,
        default:Date.now
    }
})

 module.exports = PersonSchema
// module.exports = Person = mongoose.model("myPerson", PersonSchema);
