import userModel from "../models/usermodel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"



const createToken = (id) => {
    return jwt.sign(
        {id},
        process.env.JWT_SECERT_KEY
    )
}



/* Route for user login */


export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email})
        if (!user){
            return res.status(401).json({
                success:false,
                message: "user does not exist"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch){
            return res.status(401).json({
                success:false,
                message: "invalid credentials"
            })
        }

        const token = createToken(user._id)
        return res.status(200).json({
            success: true,
            message: "successfully logged in",
            token
        })

    }catch (err){
        return res.status(401).json({
            success:false,
            message: "invalid credentials"
        })
    }
}


/* route for user registration */

export const registerUser = async (req, res)=> {
    try{
        const {name , email, password} = req.body

        /* checking the user exist or not*/
        const userExists = await userModel.findOne({
            email
        })
        if (userExists){
             return res.json({
                success:false,
                message : "user already exists"
            })
        }

        /* email format and strong password*/
        if (!validator.isEmail(email)){
             return res.json({
                success:false,
                message : "please provide a valid email"
            })
        }

        if (password.length < 8){
            return res.json({
                success:false,
                message : "please enter the strong password"
            })
        }

        /* if every thing is right means email and password then we have hash
        *  the user password for safety */
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await userModel.create({
            name,
            email,
            password: hashedPassword
        })
        /* after creation of newUser , save it*/
        const user = await newUser.save()

        const token = createToken(user._id)
        return res.json({
            success:true,
            token
        })
    }catch (err){
        console.log(err)
        res.json({
            success: false,
            message: err.message
        })
    }
}


/* route for admin login */

export const adminLogin = async (req, res) => {

}