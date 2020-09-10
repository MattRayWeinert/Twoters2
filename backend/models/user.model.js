const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: 
    {
        type: String,
        unique: true,
        match: [/^[a-zA-Z0-9]+$/],
        trim: true
    },
    password:  
    {
        type: String,
        trim: true
    },
    firstName: String,
    lastName: String,
    email: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;