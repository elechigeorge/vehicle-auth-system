const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp')


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String
    }
});

UserSchema.plugin(timestamp);

const User = mongoose.model("User", UserSchema);

module.exports = User;