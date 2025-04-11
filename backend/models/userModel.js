const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    phone: {
        type: String,
        trim: true
    },
    location: {
        pinCode: String,
        country: String,
        state: String,
        city: String
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, { 
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;
