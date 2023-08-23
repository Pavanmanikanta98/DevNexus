const { string, date } = require('joi');
const mongoose = require('mongoose');
const { schema } = mongoose;

const UserScheme = new schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('user', UserScheme);
