const mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "can't be blank"],
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        index: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true
    },
    password: { type: String },
    phonenumber: { type: Number},
    address: { type: String },
    savedLocations: {
        type: [String],
        default: []
    }
    }, { timestamps: true });

const user = mongoose.model('USERS', userSchema)
module.exports = user