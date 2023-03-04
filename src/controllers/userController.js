const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const signup = async (req, res) =>{
    //existing user
    //hashed password 
    //USer CREATION
    //token geneRATE

    const {username, email, password} = req.body;
    console.log(username, email, password);
    try {

        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            res.status(400).json({ message: "User Already Exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(`hii this is user`);
        const user = new userModel({
            email,
            password,
            username
        }); 
        
        await user.save();
        
        const token = jwt.sign({ email: user.email, id: user._id }, SECRET_KEY);
        
        res.status(200).json({ user: user, token: token });

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something Went Wrong"});
    }
};

const signin = async (req, res) =>{
    const {email, password} = req.body;
    try {
        const existingUser = await userModel.findOne({ email: email });
        if(!existingUser){
            return res.status(400).json({ message: "User Not Found" });
        }
        console.log(password);
        console.log(existingUser.password);
        const matchpassword = ( password === existingUser.password );
        
        if (!matchpassword) {
            res.status(400).json({ message: "Invalid Credentials" });
        }
        
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET_KEY);
        res.status(201).json({user: existingUser, token: token});

    } catch (error){
        console.log(error);
        res.status(500).json({message: "Something Went Wrong"});
    }

};

module.exports = { signup, signin };


