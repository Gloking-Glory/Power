const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const saltRound = 10;

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
})

userSchema.pre('save', function (next) {
    const document = this;
    bcrypt.hash(document.password, saltRound, (err, hashedPassword)=> {
        if (!err) {
            document.password = hashedPassword;
            next();
        } else {
            throw (err);
        }
    })
})

userSchema.methods.validatePassword = function (password, callback) {
    const document = this;
    bcrypt.compare(password, document.password, (err, same) => {
        if (!err) {
            callback(err, same);
        } else {
            next();
        }
    })
}

const userModel = mongoose.model('powerUsers', userSchema);

module.exports = userModel;