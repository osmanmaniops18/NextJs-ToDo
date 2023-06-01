import mongoose from "mongoose";


const userScheme=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true

    },
    password:{
        type:String,
        required:true,
        select:false,
        minLength:[6,"Password must be at least 6 characters"]
    }
})


mongoose.models={}
export const User=mongoose.model("User",userScheme)