import mongoose from "mongoose";


const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    cartData:{
        type:Object,
        default:{}
    }
},{minimize:false})    /* we have use minimize : false because when we will create a usermodel mongoDB will ignore the empty
                                    object but we want that cartData so we have set minimize : false */


const userModel = mongoose.models.user || mongoose.model("user", userSchema)

export default userModel;