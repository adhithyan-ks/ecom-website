import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async(req, res) => {
    const {
        firstName,
        lastName,
        email,
        password
    } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({success: false, message: "All fields are required!"});
    }
    try {
        const user = await User.findOne({email});
        if (user) {
            return res.status(409).json({success: false, message: "User already exists!"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).json({success: true, message: "Sign Up success!", user: newUser});
    } catch(error) {
        console.log(error);
        res.status(500).json({message: "Server Error"});
    }
}

export const signIn = async(req, res) => {
    const {
        email, password
    } = req.body;
    if (!email || !password) {
        return res.status(400).json({success: false, message: "All fields are required!"});
    }
    try {
        const user = await User.findOne({email});
        // console.log("db_user :",user)
        if (!user) {
            return res.status(404).json({success: false, message: "User not found!"});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({success: false, message: "Invalid email or password!"});
        }
        
        //Exclude password
        const {password:_, ...rest } = user._doc;
        // console.log(rest);

        const token = jwt.sign({id: rest._id, isAdmin: rest.isAdmin || false}, process.env.JWT_SECRET);

        res.status(200).cookie("access_token", token).json({success: true, message: "Sign In success!", user: rest});
    }
    catch(error) {
        console.log(error);
        res.status().json({ message: "Server error"});
    }
}

export const signOut = async(req, res) => {
    try {
        res.clearCookie("access_token").status(200).json("signOut success");
    }
    catch (error) {
        console.log(error);
    }
}