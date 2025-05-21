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
        return res.json({success: false, message: "All fields are required!"});
    }
    try {
        const user = await User.findOne({email});
        if (user) {
            return res.json({success: false, message: "User already exists!"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });
        await newUser.save();
        res.json({success: true, message: "Sign Up success!", user: newUser});
    } catch(error) {
        console.log(error);
    }
}

export const signIn = async(req, res) => {
    const {
        email, password
    } = req.body;
    if (!email || !password) {
        return res.json({success: false, message: "All fields are required!"});
    }
    try {
        const user = await User.findOne({email});
        // console.log("db_user :",user)
        if (!user) {
            return res.json({success: false, message: "User not found!"});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.json({success: false, message: "Invalid email or password!"});
        }
        
        //Exclude password
        const {password:_, ...rest } = user._doc;
        // console.log(rest);

        const token = jwt.sign({id: rest._id, isAdmin: rest.isAdmin || false}, process.env.JWT_SECRET);

        res.cookie("access_token", token).json({success: true, message: "Sign In success!", user: rest});
    }
    catch(error) {
        console.log(error);
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