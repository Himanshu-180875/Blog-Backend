const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

const register = async(req, res) => {
    const { email, password} = req.body;
    const user = await User.findOne({email})
    if(user){
        return res.status(400).send({error: "user with this email already exists"})
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({email, password: hashedPassword})
    await newUser.save();
    return res.status(200).send({message: "user registered successfully, Please Login!"})
};

const login = async(req,res) => {
    const {email, password} = req.body;
    const exists = await User.findOne({email});
    if(!exists){
        return res.status(401).send({error: "User with the email doesn't exists"})
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(401).send({error: "password doesn't match"})
    }
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET);
    return res.status(200).send({token})
}

module.exports = {
    register,
    login
}