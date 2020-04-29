const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuestionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "myPerson"
    },
    textone:{
        type: String
    },
    textwo:{
        type: String
    },
    name:{
        type: String
    },
    upvote:[{
        user: {
            type: Schema.Types.ObjectId,
            ref:"myPerson"
        }
    }
    ],
    answers:[{
        user:{
            type:Schema.Types.ObjectId,
            ref: "myPerson"
        },
        text:{
            type:String
        },
        name:{
            type: String
        }
       
    }

    ],
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = Question = mongoose.model("myQuestion",QuestionSchema)