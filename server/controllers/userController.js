import User from "../models/User.js";
import brcypt from "bcryptjs"
//Sign Up user

export const signup = async (req , res) => {
    const {fullName , email , password , bio} = req.body;

    try {
        if(!fullName || !email || !password || !bio){
            return res.json({success: false , message: "Missing Details"})
        }

        const user = await User.find({email});

        if(user){
            return res.json({success: false , message: "Already Account Exists"})
        }

        const salt = await brcypt.genSalt()
    } catch (error) {
        
    }
}