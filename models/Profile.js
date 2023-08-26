const mongoose = require('mongoose');
const { Schema , model } = mongoose;
const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    handle: {
        type: String,
        //required: true,
        max: 50
    },
    company: {
        type: String
        
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    skills: {
        type: [String]
    },
    bio: {
        type: String
        
    },
    githubusername: {
        type: String
    },
    experience: [
        {
            title: { type: String, required: true },
            company: { type: String, required: true },
            location: { type: String },
            from: { type: Date, required: true },
            to: { type: Date },
            current: { type: Boolean, default: false },
            description: { type: String }
        }
    ],
    education: [
        {
            School: { type: String, required: true },
            degree: { type: String, required: true },
            fieldofstudy: { type: String, required: true },
            from: { type: Date, required: true },
            to: { type: Date },
            current: { type: String },
            description: { type: String }
        }
    ],
    social: {
        youtube: { type: String },
        linkedIn: { type: String },
        instagram: { type: String },
        facebook: { type: String },
        x: { type: String },
        
        
    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = profile = model('profile', ProfileSchema);