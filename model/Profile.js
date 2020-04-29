const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "myPerson"
    },
    username: {
        type: String,
        max: 50
    },
    website: {
        type: String
    },
    country:{
        type: String
    },
    languages:{
        type:[String]
    },
    portfolio:{
        type: String
    },
    workrole:[{
        role: {
            type: String
        },
        country:{
            type: String
        },
        company:{
            type: String
        },
        from: {
            type: String
        },
        to: {
            type: String
        },
        current:{
            type: Boolean,
            default: false
        },
        details: {
            type: String
        }

    }
    ],
    social:{
        youtube: {
            type: String
        },
        facebook: {
            type: String
        },
        instagram: {
            type: String
        }
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = Profile = mongoose.model('Profile',ProfileSchema)