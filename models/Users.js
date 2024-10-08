const { string, date } = require('joi');
const mongoose = require('mongoose');
const { Schema} = mongoose;

const UserScheme = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    date: { type: Date, default: Date.now }
});

module.exports  = mongoose.model('Users', UserScheme);
