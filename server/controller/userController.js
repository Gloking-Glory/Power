const userModel = require('../model/userModel');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

// register user
const register =(req, res)=> {
    let {email} = req.body;
    userModel.findOne({email}, (err, result)=> {
        if (result) {
            res.send({message: "Email Already Exist"});
            return;
        }
        let form = new userModel(req.body);
        form.save();
        res.send({success: true, message: "Registered Successfully"});
    })
}

// login and authenticate user
const login =(req, res)=> {
    let {email, password} = req.body;
    userModel.findOne({email}, (err, user)=> {
        if (!err) {
            if (user) {
                user.validatePassword(password, (err, same)=> {
                    if (err) {
                        res.status(500).send({message: "Internal Server Error"});
                    } else if (!same) {
                        res.status(401).send({message: "Incorrect Credentials"});
                    } else {
                        let userData = {email};
                        let token = jwt.sign(userData, secret, {expiresIn: '1h'});
                        res.status(200).send({success: true, message: "Login Successfull", token});
                    }
                })
            }
        }
    })
}

module.exports = {register, login}